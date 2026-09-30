"use client";

import React from "react";
import { Opportunity } from "@/types/opportunity";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/feedback/status-badge";
import {
  Building2,
  MapPin,
  Clock,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  EyeOff,
  ArrowLeft,
  Users,
  AlertCircle,
  SearchX,
  RotateCcw,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface OpportunityDetailPaneProps {
  opportunity: Opportunity | null;
  isSaved: boolean;
  isApplied: boolean;
  totalResultsCount?: number;
  hasActiveFilters?: boolean;
  isSavedOnly?: boolean;
  searchQuery?: string;
  onResetFilters?: () => void;
  onClearSearch?: () => void;
  onApply: () => void;
  onToggleSave: () => void;
  onDismiss?: () => void;
  onBackToList?: () => void; // for mobile
  isMobile?: boolean;
}

export function OpportunityDetailPane({
  opportunity,
  isSaved,
  isApplied,
  totalResultsCount = 1,
  hasActiveFilters = false,
  isSavedOnly = false,
  searchQuery = "",
  onResetFilters,
  onClearSearch,
  onApply,
  onToggleSave,
  onDismiss,
  onBackToList,
  isMobile = false,
}: OpportunityDetailPaneProps) {
  // State C: Zero results across the workspace
  if (totalResultsCount === 0) {
    return (
      <div className="flex h-full min-h-[580px] flex-col items-center justify-center rounded-xl border border-dashed border-surface-border bg-white p-8 text-center shadow-card">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 mb-3.5">
          {isSavedOnly ? (
            <Bookmark className="h-6 w-6 text-slate-400" />
          ) : (
            <SearchX className="h-6 w-6 text-slate-400" />
          )}
        </div>
        <h3 className="text-base font-semibold text-text-main">
          {isSavedOnly
            ? "No Saved Opportunities Found"
            : searchQuery
            ? `No Opportunities Found for "${searchQuery}"`
            : "No Opportunities Found"}
        </h3>
        <p className="mt-1.5 max-w-sm text-xs text-text-muted leading-relaxed">
          {isSavedOnly
            ? "No saved opportunities match your current filters. Clear your filters or explore all opportunities to bookmark positions."
            : searchQuery
            ? `We couldn't find any opportunities matching "${searchQuery}". Try clearing search keywords or resetting filters to browse open shifts.`
            : "No opportunities match your current filter criteria. Clear or broaden your filters to browse available positions."}
        </p>

        {/* Contextual Action Buttons */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {searchQuery && onClearSearch && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearSearch}
              className="gap-1.5 text-xs font-medium"
            >
              <X className="h-3.5 w-3.5" />
              Clear Search
            </Button>
          )}
          {onResetFilters && (
            <Button
              variant={searchQuery ? "primary" : "outline"}
              size="sm"
              onClick={onResetFilters}
              className="gap-1.5 text-xs font-medium"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {isSavedOnly ? "Browse All Opportunities" : "Reset All Filters"}
            </Button>
          )}
        </div>

        {/* Search tips guidance to avoid empty dead space */}
        <div className="mt-6 pt-5 border-t border-slate-100 max-w-xs text-left w-full">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-text-caption block mb-1.5 text-center">
            Search Tips
          </span>
          <ul className="text-xs text-text-muted space-y-1">
            <li className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-slate-400 shrink-0" />
              <span>Check for typos in your search keywords</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-slate-400 shrink-0" />
              <span>Try broader terms like &ldquo;care&rdquo;, &ldquo;nurse&rdquo;, or &ldquo;shift&rdquo;</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-slate-400 shrink-0" />
              <span>Expand location or care category options</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  // State A & State E: Opportunities exist, but none currently selected
  if (!opportunity) {
    return (
      <div className="flex h-full min-h-[580px] flex-col items-center justify-center rounded-xl border border-dashed border-surface-border bg-white p-8 text-center shadow-card">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600 mb-3.5">
          <Building2 className="h-6 w-6" />
        </div>
        <h3 className="text-base font-semibold text-text-main">
          Select an Opportunity
        </h3>
        <p className="mt-1.5 max-w-sm text-xs text-text-muted leading-relaxed">
          Choose any opportunity from the list on the left to view complete shift schedules, qualifications, facility details, and submit an application.
        </p>
      </div>
    );
  }

  const typeBadgeVariant = {
    caregiving: "primary",
    volunteer: "success",
    internship: "default",
  }[opportunity.type] as "primary" | "success" | "default";

  return (
    <div className="rounded-xl border border-surface-border bg-white shadow-card overflow-hidden flex flex-col h-full min-h-[580px]">
      {/* Mobile Back Header Bar */}
      {isMobile && onBackToList && (
        <div className="p-3 border-b border-surface-border bg-slate-50 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToList}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Opportunity List
          </button>
          <span className="text-xs text-text-caption font-medium">
            Evaluation View
          </span>
        </div>
      )}

      {/* Action Header Banner */}
      <div className="p-6 sm:p-7 border-b border-slate-100 bg-white space-y-4">
        {/* Top bar: Badges + Secondary Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant={typeBadgeVariant} className="capitalize">
              {opportunity.type}
            </Badge>
            <Badge variant="outline">{opportunity.category}</Badge>
            {opportunity.isUrgent && <StatusBadge status="urgent" />}
            {isApplied && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Application Submitted (Demo)
              </span>
            )}
          </div>

          {/* Save & Dismiss actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleSave}
              className={cn(
                "gap-1.5 text-xs font-medium",
                isSaved && "text-brand-700 border-brand-300 bg-brand-50"
              )}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="h-4 w-4 fill-brand-600 text-white" />
                  Saved
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4 text-slate-500" />
                  Save
                </>
              )}
            </Button>

            {onDismiss && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className="gap-1.5 text-xs text-slate-500 hover:text-slate-700"
                title="Hide from this session"
              >
                <EyeOff className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Not Interested</span>
              </Button>
            )}
          </div>
        </div>

        {/* Title and Facility Info */}
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-main leading-snug">
            {opportunity.title}
          </h2>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-text-muted">
            <div className="flex items-center gap-1.5 font-medium text-text-main">
              <Building2 className="h-4 w-4 text-slate-400 shrink-0" />
              <span>{opportunity.facilityName}</span>
            </div>
            <div className="flex items-center gap-1 text-xs sm:text-sm">
              <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
              <span>{opportunity.facilityLocation}</span>
            </div>
          </div>
        </div>

        {/* Primary CTA & Compensation Header */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-subtle/70 rounded-lg p-4 border border-surface-border">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-text-caption">
              Compensation / Offering
            </span>
            <div className="text-lg sm:text-xl font-bold text-brand-700">
              {opportunity.compensation}
            </div>
          </div>

          <Button
            size="md"
            variant="primary"
            onClick={onApply}
            className="w-full sm:w-auto shadow-subtle text-sm px-6 font-semibold"
          >
            {isApplied ? "Submit Another Application" : "Apply for this Position"}
          </Button>
        </div>

        {/* Quick Spec Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="rounded-md bg-slate-50 p-2.5 border border-slate-100 space-y-0.5">
            <span className="text-text-caption uppercase text-[10px] tracking-wider font-semibold">
              Schedule
            </span>
            <p className="font-semibold text-text-main flex items-center gap-1 truncate">
              <Calendar className="h-3 w-3 text-slate-400 shrink-0" />
              {opportunity.schedule}
            </p>
          </div>
          <div className="rounded-md bg-slate-50 p-2.5 border border-slate-100 space-y-0.5">
            <span className="text-text-caption uppercase text-[10px] tracking-wider font-semibold">
              Shift Hours
            </span>
            <p className="font-semibold text-text-main flex items-center gap-1 truncate">
              <Clock className="h-3 w-3 text-slate-400 shrink-0" />
              {opportunity.shiftHours}
            </p>
          </div>
          <div className="rounded-md bg-slate-50 p-2.5 border border-slate-100 space-y-0.5">
            <span className="text-text-caption uppercase text-[10px] tracking-wider font-semibold">
              Commitment
            </span>
            <p className="font-semibold text-text-main truncate">
              {opportunity.commitment}
            </p>
          </div>
          <div className="rounded-md bg-slate-50 p-2.5 border border-slate-100 space-y-0.5">
            <span className="text-text-caption uppercase text-[10px] tracking-wider font-semibold">
              Availability
            </span>
            <p className="font-semibold text-emerald-700 truncate">
              {opportunity.spotsAvailable} open position{opportunity.spotsAvailable !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Detail Body */}
      <div className="p-6 sm:p-7 space-y-6 overflow-y-auto flex-1 text-sm [scrollbar-gutter:stable]">
        {/* Role Overview */}
        <section className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-caption">
            Role Overview
          </h4>
          <p className="text-text-muted leading-relaxed text-sm">
            {opportunity.description}
          </p>
        </section>

        {/* Core Responsibilities */}
        <section className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-caption">
            Core Responsibilities
          </h4>
          <ul className="space-y-2">
            {opportunity.responsibilities.map((resp, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-text-muted">
                <CheckCircle2 className="h-4 w-4 text-brand-600 mt-0.5 shrink-0" />
                <span className="leading-relaxed">{resp}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Requirements */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-caption">
              Qualifications & Requirements
            </h4>
            <span className="text-[10px] text-slate-400 italic">
              Demo Requirements
            </span>
          </div>
          <ul className="space-y-2">
            {opportunity.requirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                <span className="leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Facility Information (Demo) */}
        <section className="rounded-lg border border-surface-border bg-slate-50/70 p-4 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-text-main flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-brand-600" />
              {opportunity.facilityName}
            </span>
            <span className="text-[10px] font-medium text-slate-500">
              Demo Facility Profile
            </span>
          </div>
          <p className="text-text-muted leading-relaxed">
            Community residential care partner operating in {opportunity.facilityLocation}. Shifts and credentials presented here are simulated demonstration data for client workflow review.
          </p>
        </section>

        {/* Bottom CTA Bar */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="text-xs text-text-muted">
            Ready to submit your interest?
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={onApply}
            className="font-semibold px-5"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
}
