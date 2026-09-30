"use client";

import React from "react";
import { Opportunity } from "@/types/opportunity";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/feedback/status-badge";
import {
  MapPin,
  Clock,
  Building2,
  Bookmark,
  BookmarkCheck,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface OpportunityListItemProps {
  opportunity: Opportunity;
  isSelected: boolean;
  isSaved: boolean;
  isApplied: boolean;
  onSelect: (opportunity: Opportunity) => void;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onDismiss?: (id: string, e: React.MouseEvent) => void;
}

export function OpportunityListItem({
  opportunity,
  isSelected,
  isSaved,
  isApplied,
  onSelect,
  onToggleSave,
  onDismiss,
}: OpportunityListItemProps) {
  const typeBadgeVariant = {
    caregiving: "primary",
    volunteer: "success",
    internship: "default",
  }[opportunity.type] as "primary" | "success" | "default";

  return (
    <div
      role="option"
      aria-selected={isSelected}
      tabIndex={0}
      onClick={() => onSelect(opportunity)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(opportunity);
        }
      }}
      className={cn(
        "group relative text-left rounded-lg p-4 sm:p-5 transition-colors duration-150 cursor-pointer border border-l-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600",
        isSelected
          ? "border-brand-500 border-l-brand-600 bg-brand-50/35 shadow-card"
          : "border-surface-border border-l-transparent bg-white hover:border-brand-200 hover:bg-surface-subtle shadow-subtle"
      )}
    >
      {/* Top Meta Bar */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant={typeBadgeVariant} className="capitalize text-[11px] px-2 py-0.5">
            {opportunity.type}
          </Badge>
          <Badge variant="outline" className="text-[11px] px-2 py-0.5">
            {opportunity.category}
          </Badge>
          {opportunity.isUrgent && <StatusBadge status="urgent" className="text-[10px]" />}
          {isApplied && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              Applied
            </span>
          )}
        </div>

        {/* Action icons: Save Bookmark & Subtle Dismiss */}
        <div className="flex items-center gap-1 shrink-0 -mt-0.5 -mr-1">
          <button
            type="button"
            onClick={(e) => onToggleSave(opportunity.id, e)}
            aria-label={isSaved ? "Remove from saved opportunities" : "Save opportunity"}
            title={isSaved ? "Saved (click to unsave)" : "Save opportunity"}
            className={cn(
              "p-1.5 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600",
              isSaved
                ? "text-brand-700 bg-brand-100/80 hover:bg-brand-200"
                : "text-slate-400 hover:text-brand-600 hover:bg-slate-100"
            )}
          >
            {isSaved ? (
              <BookmarkCheck className="h-4 w-4 fill-brand-600 text-white" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </button>

          {onDismiss && (
            <button
              type="button"
              onClick={(e) => onDismiss(opportunity.id, e)}
              aria-label="Hide opportunity / Not interested"
              title="Not interested (hide from list)"
              className="p-1.5 rounded-md text-slate-300 hover:text-slate-500 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            >
              <EyeOff className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Role Title */}
      <h3
        className={cn(
          "font-semibold text-sm sm:text-base leading-snug line-clamp-2 transition-colors",
          isSelected ? "text-brand-900 font-bold" : "text-text-main group-hover:text-brand-700"
        )}
      >
        {opportunity.title}
      </h3>

      {/* Facility & Location */}
      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-muted">
        <div className="flex items-center gap-1 font-medium text-text-main truncate max-w-[200px] sm:max-w-xs">
          <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{opportunity.facilityName}</span>
        </div>
        <div className="flex items-center gap-1 text-text-caption">
          <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span>{opportunity.facilityLocation}</span>
        </div>
      </div>

      {/* Bottom Info Bar: Shift/Schedule & Compensation */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-1.5 text-text-muted truncate">
          <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span className="truncate">
            {opportunity.schedule} • {opportunity.shiftHours.split("(")[0].trim()}
          </span>
        </div>

        <div className="font-semibold text-brand-700 shrink-0 text-right">
          {opportunity.compensation}
        </div>
      </div>
    </div>
  );
}
