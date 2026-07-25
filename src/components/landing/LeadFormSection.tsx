'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { submitLeadAction } from '@/actions/lead.actions';
import { LeadSubmissionSchema, budgetOptions } from '@/schemas/lead.schema';
import { BudgetRange } from '@/types/lead';
import { CheckCircle2, Send, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';

export const LeadFormSection: React.FC = () => {
  const { success, error: toastError } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '$10k-$25k' as BudgetRange,
    message: '',
    website: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const budgetSelectOptions = budgetOptions.map((opt) => ({
    value: opt,
    label: `Project Budget Tier: ${opt}`,
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
        toastError('Submission Error', result.error || 'Please check form entries.');
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
      budget: '$10k-$25k',
      message: '',
      website: '',
    });
    setFieldErrors({});
    setServerError(null);
    setIsSuccess(false);
  };

  return (
    <section id="contact" className="py-24 relative border-b border-white/10 bg-[#0a0b0d]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="tactile-card border border-white/10 shadow-2xl p-6 sm:p-10 bg-[#121418]">
          <CardHeader className="text-center mb-8">
            <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Lead Intake
            </div>
            <CardTitle className="text-3xl sm:text-4xl font-display">Ready To Scale Your Lead Pipeline?</CardTitle>
            <CardDescription className="text-sm text-slate-300 mt-2 font-sans">
              Fill out the intake form below to start qualifying leads and routing high-value accounts directly to your team.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {isSuccess ? (
              <div className="flex flex-col items-center text-center py-8 animate-scale-up">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400">
                  <CheckCircle2 className="w-9 h-9 animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-[#f4f3ef] font-display">Inquiry Registered</h3>
                <p className="text-slate-300 text-sm mt-2 max-w-md font-sans">
                  We have received your submission. Check your admin dashboard at <span className="font-mono text-amber-400 font-bold">/admin</span> to view live synced records.
                </p>
                <Button variant="secondary" className="mt-6" onClick={resetForm}>
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 font-sans" noValidate>
                {serverError && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 animate-fade-in-up">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Honeypot anti-spam hidden field */}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Full Name"
                    name="name"
                    placeholder="e.g. Jordan Lee"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={fieldErrors.name}
                    required
                  />

                  <Input
                    label="Work Email Address"
                    type="email"
                    name="email"
                    placeholder="jordan@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={fieldErrors.email}
                    required
                  />
                </div>

                <Select
                  label="Estimated Budget Range"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  options={budgetSelectOptions}
                  error={fieldErrors.budget}
                  required
                />

                <Textarea
                  label="Project Requirements &amp; Objectives"
                  name="message"
                  placeholder="Describe your current CRM workflow, monthly intake volume, and target ROI..."
                  value={formData.message}
                  onChange={handleInputChange}
                  error={fieldErrors.message}
                  required
                />

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Zod server validation &amp; honeypot active</span>
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    rightIcon={<Send className="w-4 h-4" />}
                    className="w-full sm:w-auto"
                  >
                    Submit Intake Form
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
