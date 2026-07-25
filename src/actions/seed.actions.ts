'use server';

import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '@/lib/db';
import { Lead } from '@/models/Lead';
import { ApiResponse } from '@/types/api';

const sampleLeads = [
  {
    name: 'Alexandra Wright',
    email: 'alex.wright@horizontech.io',
    budget: '$25k+',
    message: 'We are expanding our B2B SaaS sales team and require an enterprise CRM integration with custom MongoDB indexing and webhook alerts.',
    status: 'New',
    createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
  },
  {
    name: 'Marcus Vance',
    email: 'marcus@vancestudio.com',
    budget: '$10k-$25k',
    message: 'Looking for automated client intake and honeypot spam protection for our digital design agency. High priority rollout.',
    status: 'New',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hrs ago
  },
  {
    name: 'David Chen',
    email: 'd.chen@nexuscloud.org',
    budget: '$5k-$10k',
    message: 'Evaluating LeadDesk Mini for our inbound growth campaigns. Need status tracking and fast search capabilities.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hrs ago
  },
  {
    name: 'Elena Rostova',
    email: 'elena.r@cloudflow.app',
    budget: '$25k+',
    message: 'Contract discussion in progress. Requires multi-user admin session security and sub-second lead lookup speeds.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    name: 'James Sterling',
    email: 'sterling@apexventures.co',
    budget: '$10k-$25k',
    message: 'Signed initial enterprise retainer! Onboarding scheduled for next Monday with dev team.',
    status: 'Closed',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
  },
  {
    name: 'Sophia Patel',
    email: 'sophia@lumina-health.com',
    budget: '$1k-$5k',
    message: 'Interested in basic lead intake form integration for healthcare portal inquiries.',
    status: 'New',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
  },
  {
    name: 'Oliver Thorne',
    email: 'oliver@thorne-legal.co.uk',
    budget: '$10k-$25k',
    message: 'Legal firm client intake automation. Need guaranteed zero data loss and soft-delete audit history.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
  },
  {
    name: 'Chloe Bennett',
    email: 'chloe@velocitygrowth.io',
    budget: '$25k+',
    message: 'Closed annual software license! LeadDesk Mini eliminated 40% of our manual lead triage time.',
    status: 'Closed',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
  },
];

export async function seedLeadsAction(): Promise<ApiResponse<number>> {
  try {
    await connectToDatabase();

    // Insert sample leads without wiping existing user submissions
    const inserted = await Lead.insertMany(
      sampleLeads.map((item) => ({
        ...item,
        isDeleted: false,
      }))
    );

    revalidatePath('/admin');

    return {
      success: true,
      message: `Successfully populated ${inserted.length} sample leads!`,
      data: inserted.length,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to seed sample leads',
    };
  }
}
