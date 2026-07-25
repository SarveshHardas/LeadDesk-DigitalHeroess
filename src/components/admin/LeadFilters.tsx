'use client';

import React from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LeadStatus } from '@/types/lead';
import { Search, X, Database } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeadFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: LeadStatus | 'All';
  onStatusFilterChange: (status: LeadStatus | 'All') => void;
  onSeedData: () => void;
  isSeeding?: boolean;
}

export const LeadFilters: React.FC<LeadFiltersProps> = ({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onSeedData,
  isSeeding,
}) => {
  const statuses: Array<LeadStatus | 'All'> = ['All', 'New', 'Contacted', 'Closed'];

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6 font-sans">
      {/* Status Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#121418] border border-white/10 overflow-x-auto">
        {statuses.map((st) => {
          const isActive = statusFilter === st;
          return (
            <button
              key={st}
              onClick={() => onStatusFilterChange(st)}
              className={cn(
                'px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-150 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-amber-500',
                isActive
                  ? 'bg-[#d97706] text-white shadow-md shadow-amber-950/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              )}
            >
              {st}
            </button>
          );
        })}
      </div>

      {/* Right Controls: Search + Seed */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 sm:w-72">
          <Input
            placeholder="Search leads by name, email, notes..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            rightIcon={
              search ? (
                <button
                  onClick={() => onSearchChange('')}
                  className="text-slate-400 hover:text-white p-1"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : undefined
            }
          />
        </div>

        <Button
          variant="outline"
          size="md"
          onClick={onSeedData}
          isLoading={isSeeding}
          leftIcon={<Database className="w-4 h-4 text-amber-400" />}
          className="shrink-0 text-xs font-mono font-bold rounded-lg"
        >
          <span className="hidden sm:inline">Seed Sample Leads</span>
          <span className="sm:hidden">Seed</span>
        </Button>
      </div>
    </div>
  );
};
