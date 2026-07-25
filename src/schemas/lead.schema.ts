import { z } from 'zod';

export const budgetOptions = ['$1k-$5k', '$5k-$10k', '$10k-$25k', '$25k+'] as const;
export const statusOptions = ['New', 'Contacted', 'Closed'] as const;

export const LeadSubmissionSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name cannot exceed 100 characters' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .transform((val) => val.toLowerCase().trim()),
  budget: z.enum(budgetOptions, {
    message: 'Please select a valid budget range',
  }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters long' })
    .max(1000, { message: 'Message cannot exceed 1000 characters' }),
  // Honeypot field for anti-spam (bots usually auto-fill hidden input fields)
  website: z.string().max(0, { message: 'Spam submission detected' }).optional().or(z.literal('')),
});

export type LeadSubmissionInput = z.infer<typeof LeadSubmissionSchema>;

export const LeadStatusUpdateSchema = z.object({
  leadId: z.string().min(1, { message: 'Lead ID is required' }),
  status: z.enum(statusOptions, { message: 'Invalid lead status' }),
});

export type LeadStatusUpdateInput = z.infer<typeof LeadStatusUpdateSchema>;

export const LeadFilterSchema = z.object({
  search: z.string().optional().default(''),
  status: z.enum(['All', ...statusOptions]).optional().default('All'),
  sortBy: z.enum(['createdAt', 'name', 'budget']).optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  page: z.number().int().min(1).optional().default(1),
  limit: z.number().int().min(1).max(100).optional().default(10),
});

export type LeadFilterInput = z.infer<typeof LeadFilterSchema>;
