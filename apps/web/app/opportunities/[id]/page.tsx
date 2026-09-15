"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getOpportunityById } from "@/lib/api/opportunities-api";
import { Opportunity } from "@/types/opportunity";
import { ApplicationModal } from "@/features/opportunities/application-modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/feedback/status-badge";
import {
  ChevronLeft,
  Building2,
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Users,
} from "lucide-react";

export default function OpportunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      getOpportunityById(id).then((data) => {
        setOpportunity(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 animate-pulse space-y-6">
        <div className="h-6 w-32 bg-slate-200 rounded" />
        <div className="h-10 w-3/4 bg-slate-200 rounded" />
        <div className="h-40 bg-slate-200 rounded-lg" />
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="py-16 max-w-md mx-auto px-4 text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-text-main">Opportunity Not Found</h2>
        <p className="text-sm text-text-muted">
          The opportunity you are looking for may have been filled or is no longer active.
        </p>
        <Link href="/opportunities">
          <Button variant="outline" size="sm">
            Back to Opportunities
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <ApplicationModal
        opportunity={opportunity}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Back Link */}
      <div>
        <Link
          href="/opportunities"
          className="inline-flex items-center gap-1 text-xs font-medium text-text-muted hover:text-brand-600 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to all opportunities
        </Link>
      </div>

      {/* Header Card */}
      <div className="rounded-xl border border-surface-border bg-white p-6 sm:p-8 shadow-card">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary" className="capitalize">
                {opportunity.type}
              </Badge>
              <Badge variant="outline">{opportunity.category}</Badge>
              {opportunity.isUrgent && <StatusBadge status="urgent" />}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-text-main tracking-tight">
              {opportunity.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
              <div className="flex items-center gap-1.5 font-medium text-text-main">
                <Building2 className="h-4 w-4 text-slate-400" />
                <span>{opportunity.facilityName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span>{opportunity.facilityLocation}</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 font-medium text-xs">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Verified Community Facility</span>
              </div>
            </div>
          </div>

          {/* Action Box */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
            <div className="text-xl sm:text-2xl font-bold text-brand-700">
              {opportunity.compensation}
            </div>
            <Button
              size="lg"
              variant="primary"
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto shadow-subtle"
            >
              Apply for this Position
            </Button>
          </div>
        </div>

        {/* Quick Shift Spec Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs">
          <div className="space-y-1">
            <span className="text-text-caption uppercase tracking-wider font-semibold">Schedule</span>
            <p className="font-medium text-text-main flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              {opportunity.schedule}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-text-caption uppercase tracking-wider font-semibold">Shift Hours</span>
            <p className="font-medium text-text-main flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              {opportunity.shiftHours}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-text-caption uppercase tracking-wider font-semibold">Commitment</span>
            <p className="font-medium text-text-main">{opportunity.commitment}</p>
          </div>
          <div className="space-y-1">
            <span className="text-text-caption uppercase tracking-wider font-semibold">Open Spots</span>
            <p className="font-medium text-text-main text-emerald-700">
              {opportunity.spotsAvailable} spot{opportunity.spotsAvailable > 1 ? "s" : ""} remaining
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          <section className="bg-white rounded-xl border border-surface-border p-6 shadow-card space-y-3">
            <h3 className="text-lg font-bold text-text-main">Role Overview</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              {opportunity.description}
            </p>
          </section>

          {/* Responsibilities */}
          <section className="bg-white rounded-xl border border-surface-border p-6 shadow-card space-y-4">
            <h3 className="text-lg font-bold text-text-main">Core Responsibilities</h3>
            <ul className="space-y-2.5 text-sm text-text-muted">
              {opportunity.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle className="h-4 w-4 text-brand-600 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Requirements */}
          <section className="bg-white rounded-xl border border-surface-border p-6 shadow-card space-y-4">
            <h3 className="text-lg font-bold text-text-main">Qualifications & Requirements</h3>
            <ul className="space-y-2.5 text-sm text-text-muted">
              {opportunity.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Facility Card */}
          <div className="bg-white rounded-xl border border-surface-border p-6 shadow-card space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-caption">
              <Building2 className="h-4 w-4" />
              <span>About the Facility</span>
            </div>
            <h4 className="font-bold text-base text-text-main">
              {opportunity.facilityName}
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              A state-licensed senior community committed to resident dignity, memory support programs, and dedicated caregiver well-being.
            </p>
            <div className="pt-2 border-t border-slate-100 text-xs text-text-caption space-y-1">
              <div>Location: {opportunity.facilityLocation}</div>
              <div>State License: Active & Verified</div>
            </div>
          </div>

          {/* Safety & Trust */}
          <div className="bg-brand-50/50 rounded-xl border border-brand-100 p-6 space-y-3">
            <div className="flex items-center gap-2 text-brand-900 font-semibold text-sm">
              <ShieldCheck className="h-4 w-4 text-brand-600" />
              <span>Care Connect Trust Promise</span>
            </div>
            <p className="text-xs text-brand-800 leading-relaxed">
              Every position on Care Connect has been validated against active facility state licenses. Pay rates and shift schedules are guaranteed upon confirmation.
            </p>
          </div>

          {/* Apply Floating CTA */}
          <div className="bg-white rounded-xl border border-surface-border p-5 text-center space-y-3">
            <p className="text-xs text-text-muted">
              Ready to submit your credentials?
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={() => setModalOpen(true)}
              className="w-full"
            >
              Apply for this Position
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
