'use client';

import React, { useState, useEffect, useCallback, useOptimistic } from 'react';
import { ToastProvider, useToast } from '@/components/ui/Toast';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { MetricsCards } from '@/components/admin/MetricsCards';
import { LeadFilters } from '@/components/admin/LeadFilters';
import { LeadTable } from '@/components/admin/LeadTable';
import { LeadDetailModal } from '@/components/admin/LeadDetailModal';
import {
  getLeadsAction,
  getLeadMetricsAction,
  updateLeadStatusAction,
  deleteLeadAction,
} from '@/actions/lead.actions';
import { seedLeadsAction } from '@/actions/seed.actions';
import { getCurrentUserAction } from '@/actions/auth.actions';
import { useDebounce } from '@/hooks/useDebounce';
import { ILead, LeadStatus, LeadMetrics } from '@/types/lead';
import { UserSession } from '@/types/auth';

function AdminDashboardContent() {
  const { success, error: toastError, info } = useToast();

  const [user, setUser] = useState<UserSession | null>(null);
  const [metrics, setMetrics] = useState<LeadMetrics | null>(null);
  const [leads, setLeads] = useState<ILead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);

  // Filters & Pagination State
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'All'>('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Detail Modal State
  const [selectedLead, setSelectedLead] = useState<ILead | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Optimistic UI state for status updates
  const [optimisticLeads, setOptimisticLeads] = useOptimistic(
    leads,
    (state, update: { id: string; status: LeadStatus }) =>
      state.map((lead) => (lead._id === update.id ? { ...lead, status: update.status } : lead))
  );

  // Load Session User
  useEffect(() => {
    getCurrentUserAction().then((res) => {
      if (res.data) setUser(res.data);
    });
  }, []);

  // Fetch KPI Metrics
  const fetchMetrics = useCallback(async () => {
    const res = await getLeadMetricsAction();
    if (res.success && res.data) {
      setMetrics(res.data);
    }
  }, []);

  // Fetch Lead Records
  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getLeadsAction({
        search: debouncedSearch,
        status: statusFilter,
        page,
        limit: 10,
      });

      if (res.success && res.data) {
        setLeads(res.data.items);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.total);
      } else {
        toastError('Error', res.error || 'Failed to fetch leads');
      }
    } catch {
      toastError('Network Error', 'Failed to connect to backend database');
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, statusFilter, page, toastError]);

  useEffect(() => {
    let isMounted = true;
    const loadDashboardData = async () => {
      if (!isMounted) return;
      await fetchLeads();
      await fetchMetrics();
    };

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, [fetchLeads, fetchMetrics]);

  // Handle Optimistic Status Toggle
  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    setOptimisticLeads({ id: leadId, status: newStatus });
    if (selectedLead && selectedLead._id === leadId) {
      setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    const res = await updateLeadStatusAction({ leadId, status: newStatus });

    if (res.success) {
      success('Status Updated', `Lead status updated to ${newStatus}`);
      fetchLeads();
      fetchMetrics();
    } else {
      toastError('Update Error', res.error || 'Failed to update status');
      fetchLeads(); // Revert back on failure
    }
  };

  // Handle Soft Delete
  const handleDeleteLead = async (leadId: string) => {
    if (!confirm('Are you sure you want to archive this lead record?')) return;

    setLeads((prev) => prev.filter((l) => l._id !== leadId));
    setTotalItems((prev) => Math.max(0, prev - 1));

    const res = await deleteLeadAction(leadId);
    if (res.success) {
      info('Lead Archived', 'Lead record moved to archive');
      fetchLeads();
      fetchMetrics();
    } else {
      toastError('Delete Error', res.error || 'Failed to delete lead');
      fetchLeads();
    }
  };

  // Handle Database Seeding
  const handleSeedData = async () => {
    setIsSeeding(true);
    try {
      const res = await seedLeadsAction();
      if (res.success) {
        success('Data Seeded', res.message);
        fetchLeads();
        fetchMetrics();
      } else {
        toastError('Seeding Failed', res.error || 'Could not insert sample data');
      }
    } catch {
      toastError('Error', 'Failed to execute seeding action');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans">
      <AdminHeader user={user} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Executive Summary Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Lead Intelligence Overview
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Real-time inbound inquiries, status triage, and pipeline analytics
            </p>
          </div>
        </div>

        {/* Metric Cards */}
        <MetricsCards metrics={metrics} isLoading={isLoading} />

        {/* Filter Controls */}
        <LeadFilters
          search={search}
          onSearchChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
          statusFilter={statusFilter}
          onStatusFilterChange={(st) => {
            setStatusFilter(st);
            setPage(1);
          }}
          onSeedData={handleSeedData}
          isSeeding={isSeeding}
        />

        {/* Lead Table */}
        <LeadTable
          leads={optimisticLeads}
          isLoading={isLoading}
          onViewLead={(lead) => {
            setSelectedLead(lead);
            setIsDetailOpen(true);
          }}
          onStatusChange={handleStatusChange}
          onDeleteLead={handleDeleteLead}
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          onPageChange={(newPage) => setPage(newPage)}
          onSeedData={handleSeedData}
        />
      </main>

      {/* Lead Detail Drawer Modal */}
      <LeadDetailModal
        lead={selectedLead}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedLead(null);
        }}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteLead}
      />
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ToastProvider>
      <AdminDashboardContent />
    </ToastProvider>
  );
}
