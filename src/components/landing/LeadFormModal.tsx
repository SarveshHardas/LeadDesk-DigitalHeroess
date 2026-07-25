'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { submitLeadAction } from '@/actions/lead.actions';
import { LeadSubmissionSchema, budgetOptions } from '@/schemas/lead.schema';
import { BudgetRange } from '@/types/lead';
import { CheckCircle2, Send, AlertCircle } from 'lucide-react';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadFormModal: React.FC<LeadFormModalProps> = ({ isOpen, onClose }) => {
  const { success, error: toastError } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '$5k-$10k' as BudgetRange,
    message: '',
    website: '', // Honeypot field
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const budgetSelectOptions = budgetOptions.map((opt) => ({
    value: opt,
    label: `Project Budget: ${opt}`,
  }));

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setFieldErrors({});

    // Client-side Zod validation
    const clientValidation = LeadSubmissionSchema.safeParse(formData);
    if (!clientValidation.success) {
      const errors: Record<string, string> = {};
      clientValidation.error.issues.forEach((issue) => {
        const fieldName = issue.path[0]?.toString() || 'form';
        errors[fieldName] = issue.message;
      });
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitLeadAction(clientValidation.data);

      if (result.success) {
        setIsSuccess(true);
        success('Inquiry Submitted!', result.message);
      } else {
        if (result.errors) {
          const formatted: Record<string, string> = {};
          Object.entries(result.errors).forEach(([key, val]) => {
            formatted[key] = val[0] || 'Invalid field';
          });
          setFieldErrors(formatted);
        }
        setServerError(result.error || 'Failed to submit inquiry');
        toastError('Submission Error', result.error || 'Please review your entries.');
      }
    } catch {
      setServerError('An unexpected network error occurred. Please try again.');
      toastError('Network Error', 'Connection failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      budget: '$5k-$10k',
      message: '',
      website: '',
    });
    setFieldErrors({});
    setServerError(null);
    setIsSuccess(false);
  };

  const handleModalClose = () => {
    onClose();
    setTimeout(resetForm, 200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      title={isSuccess ? undefined : 'Request Strategic Consult'}
      description={
        isSuccess
          ? undefined
          : 'Tell us about your project requirements and lead volume goals.'
      }
      maxWidth="lg"
    >
      {isSuccess ? (
        <div className="flex flex-col items-center text-center py-6 animate-scale-in">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400">
            <CheckCircle2 className="w-10 h-10 animate-pulse" />
          </div>
          <h3 className="text-2xl font-bold text-slate-100">Inquiry Received!</h3>
          <p className="text-slate-300 text-sm mt-2 max-w-md leading-relaxed">
            Thank you for reaching out. A senior lead strategist from our team will review your application and respond within 2 business hours.
          </p>

          <div className="w-full p-4 rounded-xl glass-card border border-slate-800 mt-6 text-left flex flex-col gap-2 text-xs text-slate-300">
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-500">Applicant:</span>
              <span className="font-semibold text-white">{formData.name} ({formData.email})</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-500">Budget Tier:</span>
              <span className="font-mono text-indigo-400 font-bold">{formData.budget}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Status:</span>
              <span className="text-emerald-400 font-semibold">Queued in LeadDesk Engine</span>
            </div>
          </div>

          <div className="flex gap-3 mt-6 w-full">
            <Button variant="secondary" fullWidth onClick={resetForm}>
              Submit Another Inquiry
            </Button>
            <Button variant="primary" fullWidth onClick={handleModalClose}>
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2" noValidate>
          {serverError && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Honeypot hidden input field */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <Input
            label="Full Name"
            name="name"
            placeholder="e.g. Alex Vance"
            value={formData.name}
            onChange={handleInputChange}
            error={fieldErrors.name}
            required
          />

          <Input
            label="Work Email Address"
            type="email"
            name="email"
            placeholder="alex@company.com"
            value={formData.email}
            onChange={handleInputChange}
            error={fieldErrors.email}
            required
          />

          <Select
            label="Estimated Project Budget"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            options={budgetSelectOptions}
            error={fieldErrors.budget}
            required
          />

          <Textarea
            label="Project Context / Goals"
            name="message"
            placeholder="Share details about your current lead pipeline, targets, or custom CRM integration needs..."
            value={formData.message}
            onChange={handleInputChange}
            error={fieldErrors.message}
            required
          />

          <div className="pt-2 flex items-center justify-end gap-3">
            <Button type="button" variant="ghost" onClick={handleModalClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              rightIcon={<Send className="w-4 h-4" />}
            >
              Submit Inquiry
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
