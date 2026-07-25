export type LeadStatus = 'New' | 'Contacted' | 'Closed';

export type BudgetRange = '$1k-$5k' | '$5k-$10k' | '$10k-$25k' | '$25k+';

export interface ILead {
  _id: string;
  name: string;
  email: string;
  budget: BudgetRange;
  message: string;
  status: LeadStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LeadFilterState {
  search: string;
  status: LeadStatus | 'All';
  sortBy: 'createdAt' | 'name' | 'budget';
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
}

export interface LeadMetrics {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  closedLeads: number;
  conversionRate: number;
  highValueCount: number;
}
