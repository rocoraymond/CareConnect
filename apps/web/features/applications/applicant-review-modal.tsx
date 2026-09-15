"use client";

import React, { useState } from "react";
import { Application, ApplicationStatus } from "@/types/application";
import { updateApplicationStatus } from "@/lib/api/applications-api";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/feedback/status-badge";
import {
  User,
  ShieldCheck,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Loader2,
  Mail,
} from "lucide-react";

interface ApplicantReviewModalProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdated?: () => void;
}

export function ApplicantReviewModal({
  application,
  isOpen,
  onClose,
  onStatusUpdated,
}: ApplicantReviewModalProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  if (!application) return null;

  const handleAction = async (newStatus: ApplicationStatus, note: string) => {
    setIsUpdating(true);
    try {
      await updateApplicationStatus(application.id, newStatus, note);
      setFeedbackMessage(`Candidate status successfully updated to "${newStatus.replace('_', ' ')}".`);
      if (onStatusUpdated) onStatusUpdated();
      setTimeout(() => {
        setFeedbackMessage(null);
        onClose();
      }, 1400);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Candidate Credential Review"
      description={`Reviewing application for ${application.opportunityTitle}`}
      maxWidth="lg"
    >
      <div className="space-y-5 pt-1">
        {feedbackMessage && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        {/* Applicant Profile Header */}
        <div className="rounded-lg bg-surface-subtle p-4 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-brand-100 border border-brand-300 flex items-center justify-center text-brand-700 font-bold text-base shrink-0">
              {application.applicantName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-text-main">
                  {application.applicantName}
                </h3>
                <StatusBadge status={application.status} />
              </div>
              <p className="text-xs text-brand-700 font-medium mt-0.5">
                {application.applicantRole}
              </p>
              <p className="text-xs text-text-caption flex items-center gap-1 mt-0.5">
                <Mail className="h-3 w-3" />
                {application.applicantEmail}
              </p>
            </div>
          </div>

          <div className="text-right text-xs text-text-caption">
            <span>Submitted on</span>
            <div className="font-semibold text-text-main">
              {new Date(application.submittedAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Credential Status — Demo Record */}
        <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 flex items-start gap-2.5">
          <ShieldCheck className="h-4 w-4 text-brand-600 mt-0.5 shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-text-main">
              Credential Status — Demo Record
            </span>
            <p className="text-text-muted mt-0.5 leading-relaxed">
              CNA License — Demo Record (#CNA-894102) • BLS Certification — Demo Record • Background Screening — Demo Status.
            </p>
          </div>
        </div>

        {/* Availability & Cover Note */}
        <div className="space-y-3 text-xs">
          <div>
            <span className="font-semibold uppercase tracking-wider text-text-caption block mb-1">
              Candidate Availability
            </span>
            <div className="p-2.5 rounded-md bg-white border border-surface-border text-text-main font-medium">
              {application.availability}
            </div>
          </div>

          <div>
            <span className="font-semibold uppercase tracking-wider text-text-caption block mb-1">
              Candidate Note to Director
            </span>
            <div className="p-3 rounded-md bg-white border border-surface-border text-text-muted leading-relaxed italic">
              &ldquo;{application.coverNote}&rdquo;
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-text-caption">
            Simulated session status transition.
          </p>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isUpdating}
            >
              Close
            </Button>

            {application.status !== "interview_scheduled" && application.status !== "accepted" && (
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="text-xs"
                disabled={isUpdating}
                onClick={() =>
                  handleAction(
                    "interview_scheduled",
                    "Facility Executive Director scheduled candidate for clinical orientation."
                  )
                }
              >
                {isUpdating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Schedule Interview"}
              </Button>
            )}

            {application.status !== "accepted" && (
              <Button
                type="button"
                variant="primary"
                size="sm"
                className="text-xs bg-emerald-600 hover:bg-emerald-700"
                disabled={isUpdating}
                onClick={() =>
                  handleAction(
                    "accepted",
                    "Facility accepted applicant for memory care shift placement."
                  )
                }
              >
                {isUpdating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Accept Candidate"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
