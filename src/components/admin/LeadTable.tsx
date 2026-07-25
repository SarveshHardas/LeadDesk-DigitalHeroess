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
      <div className="w-full tactile-panel rounded-2xl p-6 border border-white/10 flex flex-col gap-4">
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
      <div className="w-full tactile-panel rounded-2xl p-12 border border-white/10 flex flex-col items-center justify-center text-center font-sans">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 text-amber-400">
          <Inbox className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-extrabold text-[#f4f3ef] font-display">No Active Leads Found</h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-sm">
          No records match your search criteria or the database is currently empty.
        </p>
        <div className="flex gap-3 mt-6">
          <Button variant="primary" onClick={onSeedData} leftIcon={<Sparkles className="w-4 h-4" />}>
            Seed Sample Leads
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
    <div className="w-full tactile-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-[#121418] font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0a0b0d] text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 font-bold">Applicant / Contact</th>
              <th className="px-6 py-4 font-bold">Budget Tier</th>
              <th className="px-6 py-4 font-bold">Status Triage</th>
              <th className="px-6 py-4 font-bold hidden md:table-cell">Message Context</th>
              <th className="px-6 py-4 font-bold">Intake Date</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="hover:bg-white/5 transition-colors duration-150 group"
              >
                {/* Contact Name & Email */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-[#f4f3ef] font-display group-hover:text-amber-300 transition-colors">
                      {lead.name}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{lead.email}</span>
                  </div>
                </td>

                {/* Budget */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded font-mono text-xs font-bold bg-[#191c22] border border-white/10 text-amber-400">
                    {lead.budget}
                  </span>
                </td>

                {/* Status Badge with Quick Toggle */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => onStatusChange(lead._id, nextStatusMap[lead.status])}
                    className="focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-full group/badge"
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
                <td className="px-6 py-4 text-xs font-mono text-slate-400 whitespace-nowrap">
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
                      <span className="hidden sm:inline">View Details</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeleteLead(lead._id)}
                      className="px-2.5"
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
      <div className="px-6 py-4 bg-[#0a0b0d] border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
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
          <span className="px-3 py-1 text-slate-300">
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
