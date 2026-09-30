"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  X,
  SlidersHorizontal,
  Bookmark,
  BookmarkCheck,
  RotateCcw,
} from "lucide-react";
import { OpportunityFilters } from "@/lib/api/opportunities-api";
import { OpportunityType, OpportunitySortOption } from "@/types/opportunity";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

interface OpportunityFiltersProps {
  filters: OpportunityFilters;
  onChange: (newFilters: OpportunityFilters) => void;
  onReset: () => void;
  totalResults: number;
  savedCount: number;
  isSavedOnly: boolean;
  onToggleSavedOnly: (active: boolean) => void;
}

export function OpportunityFiltersPanel({
  filters,
  onChange,
  onReset,
  totalResults,
  savedCount,
  isSavedOnly,
  onToggleSavedOnly,
}: OpportunityFiltersProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Local input state for Job and Location (prevents live re-rendering on keystrokes)
  const [localSearch, setLocalSearch] = useState(filters.search || "");
  const [localLocation, setLocalLocation] = useState(
    filters.location && filters.location !== "all" ? filters.location : ""
  );

  // Synchronize local inputs whenever external filter changes occur (e.g. Reset or external Clear)
  useEffect(() => {
    setLocalSearch(filters.search || "");
  }, [filters.search]);

  useEffect(() => {
    setLocalLocation(
      filters.location && filters.location !== "all" ? filters.location : ""
    );
  }, [filters.location]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onChange({
      ...filters,
      search: localSearch.trim(),
      location: localLocation.trim() || "all",
    });
  };

  const handleResetAll = () => {
    setLocalSearch("");
    setLocalLocation("");
    onReset();
  };

  const activeFiltersCount =
    (filters.type && filters.type !== "all" ? 1 : 0) +
    (filters.category && filters.category !== "all" ? 1 : 0) +
    (filters.location && filters.location !== "all" ? 1 : 0) +
    (filters.commitment && filters.commitment !== "all" ? 1 : 0) +
    (filters.sortBy && filters.sortBy !== "default" ? 1 : 0) +
    (isSavedOnly ? 1 : 0);

  const hasActiveFilters = Boolean(filters.search) || activeFiltersCount > 0;

  const typePills: { label: string; value: OpportunityType | "all" }[] = [
    { label: "All Types", value: "all" },
    { label: "Caregiving (Paid)", value: "caregiving" },
    { label: "Volunteer", value: "volunteer" },
    { label: "Internships", value: "internship" },
  ];

  return (
    <div className="bg-white rounded-xl border border-surface-border p-4 sm:p-5 shadow-card space-y-4">
      {/* Top Search Controls Bar (Traditional Job Board: Role + Location -> Find Jobs) */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col sm:flex-row items-stretch gap-2.5 sm:gap-3"
      >
        {/* Job / Role / Keyword Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Job title, role, or keywords..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="h-10 w-full rounded-md border border-surface-border bg-white pl-9 pr-9 text-sm text-text-main shadow-subtle placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          />
          {localSearch && (
            <button
              type="button"
              onClick={() => {
                setLocalSearch("");
                if (filters.search) {
                  onChange({ ...filters, search: "" });
                }
              }}
              className="absolute right-2.5 top-2.5 p-0.5 rounded text-slate-400 hover:text-slate-600"
              aria-label="Clear job search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Searchable Location Input */}
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder='City, state, zip, or "remote"...'
            value={localLocation}
            onChange={(e) => setLocalLocation(e.target.value)}
            className="h-10 w-full rounded-md border border-surface-border bg-white pl-9 pr-9 text-sm text-text-main shadow-subtle placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          />
          {localLocation && (
            <button
              type="button"
              onClick={() => {
                setLocalLocation("");
                if (filters.location && filters.location !== "all") {
                  onChange({ ...filters, location: "all" });
                }
              }}
              className="absolute right-2.5 top-2.5 p-0.5 rounded text-slate-400 hover:text-slate-600"
              aria-label="Clear location search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Action: Find Jobs Button */}
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="h-10 px-6 font-semibold shrink-0 gap-2 shadow-subtle text-sm"
        >
          <Search className="h-4 w-4" />
          <span>Find Jobs</span>
        </Button>

        {/* Mobile Filter Sheet Trigger */}
        <div className="sm:hidden shrink-0">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => setMobileDrawerOpen(true)}
            className={cn(
              "h-10 px-3 text-xs gap-1.5 w-full",
              activeFiltersCount > 0 && "border-brand-500 text-brand-700 bg-brand-50"
            )}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="h-4 w-4 rounded-full bg-brand-600 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>
      </form>

      {/* Type Pills + Saved Opportunities Quick Tab */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
        <div className="flex flex-wrap items-center gap-1.5">
          {typePills.map((pill) => {
            const isSelected = !isSavedOnly && (filters.type || "all") === pill.value;
            return (
              <button
                key={pill.value}
                type="button"
                onClick={() => {
                  if (isSavedOnly) onToggleSavedOnly(false);
                  onChange({ ...filters, type: pill.value });
                }}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                  isSelected
                    ? "bg-brand-600 text-white shadow-subtle font-semibold"
                    : "bg-slate-100 text-text-muted hover:bg-slate-200 hover:text-text-main"
                )}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Saved Toggle Pill */}
        <button
          type="button"
          onClick={() => onToggleSavedOnly(!isSavedOnly)}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors border",
            isSavedOnly
              ? "bg-brand-50 text-brand-800 border-brand-300 ring-1 ring-brand-400"
              : "bg-white text-slate-600 border-slate-200 hover:border-brand-200 hover:text-brand-700"
          )}
        >
          {isSavedOnly ? (
            <BookmarkCheck className="h-3.5 w-3.5 fill-brand-600 text-white" />
          ) : (
            <Bookmark className="h-3.5 w-3.5 text-slate-400" />
          )}
          <span>Saved Opportunities</span>
          <span
            className={cn(
              "text-[10px] px-1.5 py-0.2 rounded-full font-bold",
              isSavedOnly
                ? "bg-brand-600 text-white"
                : "bg-slate-100 text-slate-600"
            )}
          >
            {savedCount}
          </span>
        </button>
      </div>

      {/* Desktop Secondary Filters (Category, Commitment, Sort) */}
      <div className="hidden sm:grid sm:grid-cols-3 gap-2.5 pt-1">

        {/* Category Select */}
        <div>
          <label className="sr-only" htmlFor="filter-category">Care Category</label>
          <select
            id="filter-category"
            value={filters.category || "all"}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            className="h-9 w-full rounded-md border border-surface-border bg-white px-2.5 text-xs text-text-main shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
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
        <div>
          <label className="sr-only" htmlFor="filter-commitment">Commitment</label>
          <select
            id="filter-commitment"
            value={filters.commitment || "all"}
            onChange={(e) => onChange({ ...filters, commitment: e.target.value })}
            className="h-9 w-full rounded-md border border-surface-border bg-white px-2.5 text-xs text-text-main shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <option value="all">Any Commitment</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Per Diem">Per Diem / Shifts</option>
            <option value="Flexible Hours">Flexible Hours</option>
          </select>
        </div>

        {/* Sort Select */}
        <div>
          <label className="sr-only" htmlFor="filter-sort">Sort</label>
          <select
            id="filter-sort"
            value={filters.sortBy || "default"}
            onChange={(e) =>
              onChange({
                ...filters,
                sortBy: e.target.value as OpportunitySortOption,
              })
            }
            className="h-9 w-full rounded-md border border-surface-border bg-white px-2.5 text-xs text-text-main shadow-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
          >
            <option value="default">Sort: Default (Demo Order)</option>
            <option value="newest">Sort: Newest First</option>
            <option value="compensation">Sort: Highest Compensation</option>
            <option value="spots">Sort: Most Open Spots</option>
          </select>
        </div>
      </div>

      {/* Results summary & Clear trigger */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-text-muted">
        <div>
          Showing <span className="font-semibold text-text-main">{totalResults}</span>{" "}
          {isSavedOnly ? "saved" : "available"} position{totalResults !== 1 ? "s" : ""}
          {isSavedOnly && " (bookmark filter active)"}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleResetAll}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-900 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset all filters
          </button>
        )}
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 sm:hidden flex flex-col justify-end bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-t-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-brand-600" />
                <h3 className="text-base font-bold text-text-main">
                  Filter & Sort Opportunities
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1.5 rounded-md text-slate-400 hover:text-text-main hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* Location Input */}
              <div className="space-y-1">
                <label className="font-semibold text-text-caption uppercase text-[10px]">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder='City, state, zip, or "remote"...'
                    value={localLocation}
                    onChange={(e) => setLocalLocation(e.target.value)}
                    className="h-10 w-full rounded-md border border-surface-border bg-white pl-9 pr-9 text-sm text-text-main placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                  />
                  {localLocation && (
                    <button
                      type="button"
                      onClick={() => setLocalLocation("")}
                      className="absolute right-2.5 top-2.5 p-0.5 rounded text-slate-400 hover:text-slate-600"
                      aria-label="Clear location search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="font-semibold text-text-caption uppercase text-[10px]">
                  Care Category
                </label>
                <select
                  value={filters.category || "all"}
                  onChange={(e) => onChange({ ...filters, category: e.target.value })}
                  className="h-10 w-full rounded-md border border-surface-border bg-white px-3 text-sm text-text-main"
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

              {/* Commitment */}
              <div className="space-y-1">
                <label className="font-semibold text-text-caption uppercase text-[10px]">
                  Commitment
                </label>
                <select
                  value={filters.commitment || "all"}
                  onChange={(e) => onChange({ ...filters, commitment: e.target.value })}
                  className="h-10 w-full rounded-md border border-surface-border bg-white px-3 text-sm text-text-main"
                >
                  <option value="all">Any Commitment</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Per Diem">Per Diem / Shifts</option>
                  <option value="Flexible Hours">Flexible Hours</option>
                </select>
              </div>

              {/* Sort */}
              <div className="space-y-1">
                <label className="font-semibold text-text-caption uppercase text-[10px]">
                  Sort Order (Demo)
                </label>
                <select
                  value={filters.sortBy || "default"}
                  onChange={(e) =>
                    onChange({
                      ...filters,
                      sortBy: e.target.value as OpportunitySortOption,
                    })
                  }
                  className="h-10 w-full rounded-md border border-surface-border bg-white px-3 text-sm text-text-main"
                >
                  <option value="default">Default Order (Demo)</option>
                  <option value="newest">Newest First</option>
                  <option value="compensation">Highest Compensation</option>
                  <option value="spots">Most Open Spots</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <Button
                variant="outline"
                size="md"
                className="flex-1 text-xs"
                onClick={() => {
                  handleResetAll();
                  setMobileDrawerOpen(false);
                }}
              >
                Reset All
              </Button>
              <Button
                variant="primary"
                size="md"
                className="flex-1 text-xs"
                onClick={() => {
                  handleSearchSubmit();
                  setMobileDrawerOpen(false);
                }}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
