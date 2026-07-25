'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { ILead, LeadStatus } from '@/types/lead';
import { formatDate } from '@/lib/utils';
import { Mail, Calendar, DollarSign, MessageSquare, Trash2 } from 'lucide-react';

interface LeadDetailModalProps {
  lead: ILead | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (leadId: string, newStatus: LeadStatus) => void;
  onDelete: (leadId: string) => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  lead,
  isOpen,
  onClose,
  onStatusChange,
  onDelete,
}) => {
  if (!lead) return null;

  const statusOptions = [
    { value: 'New', label: 'Status: New' },
    { value: 'Contacted', label: 'Status: Contacted' },
    { value: 'Closed', label: 'Status: Closed' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Lead Intelligence Record"
      description={`ID: ${lead._id}`}
      maxWidth="lg"
    >
      <div className="flex flex-col gap-6 animate-fade-in my-2">
        {/* Header Info Banner */}
        <div className="p-4 rounded-xl glass-card border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col">
            <h3 className="text-xl font-extrabold text-slate-100">{lead.name}</h3>
            <span className="text-xs font-mono text-indigo-400 flex items-center gap-1.5 mt-0.5">
              <Mail className="w-3.5 h-3.5" />
              {lead.email}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Select
              options={statusOptions}
              value={lead.status}
              onChange={(e) => onStatusChange(lead._id, e.target.value as LeadStatus)}
              className="py-1 text-xs"
            />
          </div>
        </div>

        {/* Metadata Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex flex-col">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-indigo-400" />
              Budget Allocation
            </span>
            <span className="text-base font-extrabold font-mono text-slate-100 mt-1">
              {lead.budget}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex flex-col">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              Intake Date
            </span>
            <span className="text-xs font-medium text-slate-200 mt-1">
              {formatDate(lead.createdAt)}
            </span>
          </div>
        </div>

        {/* Full Inquiry Message */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-slate-400" />
            Project Requirements Message
          </label>
          <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
            {lead.message}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              onDelete(lead._id);
              onClose();
            }}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            Archive Lead
          </Button>

          <Button variant="secondary" size="sm" onClick={onClose}>
            Close Window
          </Button>
        </div>
      </div>
    </Modal>
  );
};
