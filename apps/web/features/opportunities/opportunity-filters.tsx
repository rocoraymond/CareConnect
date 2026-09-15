"use client";

import React from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { OpportunityFilters } from "@/lib/api/opportunities-api";

interface OpportunityFiltersProps {
  filters: OpportunityFilters;
  onChange: (newFilters: OpportunityFilters) => void;
  onReset: () => void;
  totalResults: number;
}

export function OpportunityFiltersPanel({
  filters,
  onChange,
  onReset,
  totalResults,
}: OpportunityFiltersProps) {
  const hasActiveFilters =
    Boolean(filters.search) ||
    (filters.type && filters.type !== "all") ||
    (filters.category && filters.category !== "all") ||
    (filters.commitment && filters.commitment !== "all");

  return (
    <div className="bg-white rounded-lg border border-surface-border p-4 sm:p-5 shadow-card space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by role, keyword, or facility name..."
            value={filters.search || ""}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="h-10 w-full rounded-md border border-surface-border bg-white pl-9 pr-3 text-sm text-text-main shadow-subtle placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          />
        </div>

        {/* Opportunity Type Select */}
        <div className="w-full sm:w-48">
          <select
            value={filters.type || "all"}
            onChange={(e) =>
              onChange({
                ...filters,
                type: e.target.value as OpportunityFilters["type"],
              })
            }
            className="h-10 w-full rounded-md border border-surface-border bg-white px-3 text-sm text-text-main shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <option value="all">All Opportunities</option>
            <option value="caregiving">Caregiving (Paid)</option>
            <option value="volunteer">Volunteer Service</option>
            <option value="internship">Student Internship</option>
          </select>
        </div>

        {/* Category Select */}
        <div className="w-full sm:w-52">
          <select
            value={filters.category || "all"}
            onChange={(e) =>
              onChange({ ...filters, category: e.target.value })
            }
            className="h-10 w-full rounded-md border border-surface-border bg-white px-3 text-sm text-text-main shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <option value="all">All Care Categories</option>
            <option value="Memory Care">Memory Care</option>
            <option value="Elderly Care">Elderly Care</option>
            <option value="Companion Care">Companion Care</option>
            <option value="Rehabilitation Support">Rehabilitation Support</option>
            <option value="Community Meals">Community Meals</option>
            <option value="Activities & Recreation">Activities & Recreation</option>
          </select>
        </div>

        {/* Commitment Select */}
        <div className="w-full sm:w-44">
          <select
            value={filters.commitment || "all"}
            onChange={(e) =>
              onChange({ ...filters, commitment: e.target.value })
            }
            className="h-10 w-full rounded-md border border-surface-border bg-white px-3 text-sm text-text-main shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <option value="all">Any Commitment</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Per Diem">Per Diem / Shifts</option>
            <option value="Flexible Hours">Flexible Hours</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-text-muted">
        <div>
          Showing <span className="font-semibold text-text-main">{totalResults}</span> available position{totalResults !== 1 ? "s" : ""}
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-medium text-brand-700 hover:text-brand-900 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
