'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { ILead, LeadStatus } from '@/types/lead';
import { formatRelativeTime } from '@/lib/utils';
import {
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Sparkles,
  ArrowUpDown,
  MoreVertical,
} from 'lucide-react';

interface LeadTableProps {
  leads: ILead[];
  isLoading: boolean;
  onViewLead: (lead: ILead) => void;
  onStatusChange: (leadId: string, newStatus: LeadStatus) => void;
  onDeleteLead: (leadId: string) => void;
  page: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
  onSeedData: () => void;
}

export const LeadTable: React.FC<LeadTableProps> = ({
  leads,
  isLoading,
  onViewLead,
  onStatusChange,
  onDeleteLead,
  page,
  totalPages,
  totalItems,
  onPageChange,
  onSeedData,
}) => {
  if (isLoading) {
    return (
      <div className="w-full glass-panel rounded-2xl p-6 border border-slate-800 flex flex-col gap-4">
        <div className="flex justify-between items-center mb-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-8 w-32" />
        </div>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="w-full glass-panel rounded-2xl p-12 border border-slate-800 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400">
          <Inbox className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-100">No Leads Found</h3>
        <p className="text-sm text-slate-400 mt-2 max-w-sm">
          No active lead records match your search criteria or the database is currently empty.
        </p>
        <div className="flex gap-3 mt-6">
          <Button variant="primary" onClick={onSeedData} leftIcon={<Sparkles className="w-4 h-4" />}>
            Seed Sample Data
          </Button>
        </div>
      </div>
    );
  }

  const nextStatusMap: Record<LeadStatus, LeadStatus> = {
    New: 'Contacted',
    Contacted: 'Closed',
    Closed: 'New',
  };

  return (
    <div className="w-full glass-panel rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/80 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4 font-semibold">Applicant / Contact</th>
              <th className="px-6 py-4 font-semibold">Budget Tier</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold hidden md:table-cell">Message Snippet</th>
              <th className="px-6 py-4 font-semibold">Received</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="hover:bg-slate-800/40 transition-colors duration-150 group"
              >
                {/* Contact Name & Email */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                      {lead.name}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{lead.email}</span>
                  </div>
                </td>

                {/* Budget */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded font-mono text-xs font-bold bg-slate-900 border border-slate-800 text-indigo-400">
                    {lead.budget}
                  </span>
                </td>

                {/* Status Badge with Quick Toggle */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => onStatusChange(lead._id, nextStatusMap[lead.status])}
                    className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full group/badge"
                    title="Click to toggle to next status"
                  >
                    <Badge variant="status" status={lead.status} showDot />
                  </button>
                </td>

                {/* Message Snippet */}
                <td className="px-6 py-4 hidden md:table-cell max-w-xs">
                  <p className="text-xs text-slate-400 truncate">{lead.message}</p>
                </td>

                {/* Received Date */}
                <td className="px-6 py-4 text-xs text-slate-400 whitespace-nowrap">
                  {formatRelativeTime(lead.createdAt)}
                </td>

                {/* Action Buttons */}
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewLead(lead)}
                      leftIcon={<Eye className="w-3.5 h-3.5" />}
                    >
                      <span className="hidden sm:inline">Details</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeleteLead(lead._id)}
                      className="px-2"
                      title="Archive lead"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div>
          Showing <span className="font-bold text-white">{leads.length}</span> of{' '}
          <span className="font-bold text-white">{totalItems}</span> records
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            leftIcon={<ChevronLeft className="w-4 h-4" />}
          >
            Prev
          </Button>
          <span className="px-3 py-1 font-mono text-slate-300">
            Page {page} of {totalPages || 1}
          </span>
          <Button
            variant="secondary"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            rightIcon={<ChevronRight className="w-4 h-4" />}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
