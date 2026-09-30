"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Opportunity } from "@/types/opportunity";
import { useDemo } from "@/lib/context/demo-context";
import { submitApplication } from "@/lib/api/applications-api";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

interface ApplicationModalProps {
  opportunity: Opportunity | null;
  isOpen: boolean;
  onClose: () => void;
  onApplicationSuccess?: () => void;
}

export function ApplicationModal({
  opportunity,
  isOpen,
  onClose,
  onApplicationSuccess,
}: ApplicationModalProps) {
  const router = useRouter();
  const { currentUser } = useDemo();
  const [availability, setAvailability] = useState("Available immediately (Day Shift)");
  const [coverNote, setCoverNote] = useState(
    `Hello! I would love to apply for this ${opportunity?.title || "role"} at ${
      opportunity?.facilityName || "your community"
    }. My certified caregiving background and references are ready for verification.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!opportunity) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitApplication({
        opportunityId: opportunity.id,
        opportunityTitle: opportunity.title,
        opportunityType: opportunity.type,
        facilityId: opportunity.facilityId,
        facilityName: opportunity.facilityName,
        facilityLocation: opportunity.facilityLocation,
        applicantId: currentUser.id,
        applicantName: currentUser.fullName,
        applicantRole: currentUser.headline.split("•")[0]?.trim() || currentUser.role,
        applicantEmail: currentUser.email,
        availability,
        coverNote,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      if (onApplicationSuccess) onApplicationSuccess();
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title={isSubmitted ? "Application Received!" : `Apply: ${opportunity.title}`}
      description={
        isSubmitted
          ? `Your application has been logged for ${opportunity.facilityName}.`
          : `${opportunity.facilityName} • ${opportunity.facilityLocation}`
      }
      maxWidth="lg"
    >
      {isSubmitted ? (
        <div className="py-4 space-y-4">
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-emerald-900 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-semibold">Application Logged in Demo State</p>
              <p className="mt-1 text-emerald-800 text-xs leading-relaxed">
                The hiring coordinator has been notified. You can track this position’s status and timeline in the <strong>My Applications</strong> dashboard.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col-reverse sm:flex-row gap-3 justify-end">
            <Link href="/applications">
              <Button variant="outline" size="sm" onClick={handleClose} className="w-full sm:w-auto text-xs">
                View in My Applications
              </Button>
            </Link>
            <Button size="sm" variant="primary" onClick={handleClose} className="w-full sm:w-auto text-xs font-semibold">
              Continue Browsing Opportunities
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* Summary Box */}
          <div className="rounded-lg bg-surface-subtle p-3 text-xs space-y-1.5 border border-slate-200">
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Schedule & Shift:</span>
              <span className="font-medium text-text-main">{opportunity.shiftHours} ({opportunity.schedule})</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Compensation / Credit:</span>
              <span className="font-semibold text-brand-700">{opportunity.compensation}</span>
            </div>
          </div>

          {/* Applicant Credentials Snapshot */}
          <div className="rounded-lg border border-brand-100 bg-brand-50/60 p-3 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold text-brand-900">Applying as {currentUser.fullName}</span>
              <div className="text-brand-700 mt-0.5">{currentUser.headline}</div>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {currentUser.certifications.map((c) => (
                  <Badge key={c} variant="outline" className="text-[10px] bg-white py-0">
                    {c}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Availability Input */}
          <Input
            label="Your Shift Availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            required
            placeholder="e.g. Immediate start, Day shifts Tuesday-Saturday"
          />

          {/* Cover Note */}
          <Textarea
            label="Brief Message to Facility Director"
            value={coverNote}
            onChange={(e) => setCoverNote(e.target.value)}
            rows={3}
            required
            placeholder="Share why you're interested and any relevant shift experience..."
          />

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <p className="text-[11px] text-text-caption">
              Simulated demonstration submission.
            </p>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Confirm & Submit Application"
                )}
              </Button>
            </div>
          </div>
        </form>
      )}
    </Dialog>
  );
}
