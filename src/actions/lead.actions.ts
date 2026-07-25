'use server';

import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '@/lib/db';
import { Lead } from '@/models/Lead';
import {
  LeadSubmissionSchema,
  LeadSubmissionInput,
  LeadStatusUpdateSchema,
  LeadStatusUpdateInput,
} from '@/schemas/lead.schema';
import { ApiResponse, PaginatedResponse } from '@/types/api';
import { ILead, LeadStatus, LeadMetrics } from '@/types/lead';
import { checkRateLimit } from '@/lib/rate-limit';

/**
 * Server Action: Submit a new Lead from public landing page/modal
 */
export async function submitLeadAction(
  data: LeadSubmissionInput
): Promise<ApiResponse<ILead>> {
  try {
    // 1. Zod Server-side Validation
    const parsed = LeadSubmissionSchema.safeParse(data);
    if (!parsed.success) {
      const formattedErrors: Record<string, string[]> = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0]?.toString() || 'form';
        if (!formattedErrors[field]) formattedErrors[field] = [];
        formattedErrors[field].push(issue.message);
      });

      return {
        success: false,
        error: 'Validation failed. Please check your inputs.',
        errors: formattedErrors,
      };
    }

    const { name, email, budget, message, website } = parsed.data;

    // 2. Anti-spam Honeypot Check
    if (website && website.trim() !== '') {
      // Quietly reject bot submissions without raising noisy errors
      return {
        success: false,
        error: 'Submission rejected by anti-spam security check.',
      };
    }

    // 3. Rate limiting check per email
    const rateCheck = checkRateLimit(email);
    if (!rateCheck.allowed) {
      return {
        success: false,
        error: 'You have submitted a request recently. Please wait a moment before trying again.',
      };
    }

    // 4. Connect to Mongoose DB
    await connectToDatabase();

    // 5. Duplicate Check: Recent lead with same email in 'New' status submitted in last 24 hours
    const recentDuplicate = await Lead.findOne({
      email,
      isDeleted: false,
      createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    }).lean();

    if (recentDuplicate) {
      return {
        success: false,
        error: 'An active inquiry from this email address was already submitted within the last 24 hours. Our team will contact you shortly!',
      };
    }

    // 6. Create new Lead
    const newLead = await Lead.create({
      name,
      email,
      budget,
      message,
      status: 'New',
      isDeleted: false,
    });

    revalidatePath('/admin');

    return {
      success: true,
      message: 'Thank you! Your inquiry has been received. Our team will get back to you shortly.',
      data: JSON.parse(JSON.stringify(newLead)),
    };
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : 'Failed to submit lead';
    return {
      success: false,
      error: errMessage,
    };
  }
}

/**
 * Server Action: Update Lead Status (Admin only)
 */
export async function updateLeadStatusAction(
  data: LeadStatusUpdateInput
): Promise<ApiResponse<ILead>> {
  try {
    const parsed = LeadStatusUpdateSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: 'Invalid lead status update payload' };
    }

    await connectToDatabase();

    const updatedLead = await Lead.findByIdAndUpdate(
      parsed.data.leadId,
      { status: parsed.data.status },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedLead) {
      return { success: false, error: 'Lead not found' };
    }

    revalidatePath('/admin');

    return {
      success: true,
      message: `Lead status updated to ${parsed.data.status}`,
      data: JSON.parse(JSON.stringify(updatedLead)),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update status',
    };
  }
}

/**
 * Server Action: Soft Delete Lead (Admin only)
 */
export async function deleteLeadAction(leadId: string): Promise<ApiResponse<boolean>> {
  try {
    if (!leadId) return { success: false, error: 'Lead ID required' };

    await connectToDatabase();

    const result = await Lead.findByIdAndUpdate(leadId, { isDeleted: true });
    if (!result) return { success: false, error: 'Lead not found' };

    revalidatePath('/admin');
    return { success: true, message: 'Lead archived successfully', data: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete lead',
    };
  }
}

/**
 * Server Action: Query Leads list with filtering, search, and pagination
 */
export async function getLeadsAction(params: {
  search?: string;
  status?: string;
  sortBy?: 'createdAt' | 'name' | 'budget';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}): Promise<ApiResponse<PaginatedResponse<ILead>>> {
  try {
    await connectToDatabase();

    const search = params.search?.trim() || '';
    const status = params.status || 'All';
    const sortBy = params.sortBy || 'createdAt';
    const sortOrder = params.sortOrder === 'asc' ? 1 : -1;
    const page = Math.max(1, params.page || 1);
    const limit = Math.max(1, Math.min(100, params.limit || 10));

    const query: Record<string, unknown> = { isDeleted: false };

    if (status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Lead.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(),
      Lead.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: {
        items: JSON.parse(JSON.stringify(items)),
        total,
        page,
        limit,
        totalPages,
        hasMore: page < totalPages,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch leads',
    };
  }
}

/**
 * Server Action: Get Dashboard KPI Metrics Summary
 */
export async function getLeadMetricsAction(): Promise<ApiResponse<LeadMetrics>> {
  try {
    await connectToDatabase();

    const [total, newLeads, contacted, closed, highValue] = await Promise.all([
      Lead.countDocuments({ isDeleted: false }),
      Lead.countDocuments({ isDeleted: false, status: 'New' }),
      Lead.countDocuments({ isDeleted: false, status: 'Contacted' }),
      Lead.countDocuments({ isDeleted: false, status: 'Closed' }),
      Lead.countDocuments({ isDeleted: false, budget: { $in: ['$10k-$25k', '$25k+'] } }),
    ]);

    const conversionRate = total > 0 ? Math.round((closed / total) * 100) : 0;

    return {
      success: true,
      data: {
        totalLeads: total,
        newLeads,
        contactedLeads: contacted,
        closedLeads: closed,
        conversionRate,
        highValueCount: highValue,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch metrics',
    };
  }
}
