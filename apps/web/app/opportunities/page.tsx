"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  getOpportunities,
  OpportunityFilters,
} from "@/lib/api/opportunities-api";
import { getApplications } from "@/lib/api/applications-api";
import { Opportunity } from "@/types/opportunity";
import { OpportunityListItem } from "@/features/opportunities/opportunity-list-item";
import { OpportunityDetailPane } from "@/features/opportunities/opportunity-detail-pane";
import { OpportunityFiltersPanel } from "@/features/opportunities/opportunity-filters";
import { ApplicationModal } from "@/features/opportunities/application-modal";
import { EmptyState } from "@/components/feedback/empty-state";
import { Skeleton } from "@/components/feedback/loading-state";
import {
  SearchX,
  Bookmark,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  X,
} from "lucide-react";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [filters, setFilters] = useState<OpportunityFilters>({
    type: "all",
    category: "all",
    location: "all",
    commitment: "all",
    sortBy: "default",
    search: "",
  });

  // Selected Opportunity
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Mobile Drill-Down View State
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  // Saved Opportunities (Session + localStorage fallback for demo presentation)
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [isSavedOnly, setIsSavedOnly] = useState(false);

  // Dismissed / Not Interested Opportunities (Session State)
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  const [undoDismissNotice, setUndoDismissNotice] = useState<{
    id: string;
    title: string;
  } | null>(null);

  // Applied Opportunities tracker for in-context feedback
  const [appliedIds, setAppliedIds] = useState<Set<string>>(new Set());

  // Application Modal state
  const [applyModalOpp, setApplyModalOpp] = useState<Opportunity | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // 1. Initialize saved & applied state on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("careconnect_saved_opps");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedIds(new Set(parsed));
        }
      }
    } catch {
      // ignore storage access errors in demo mode
    }

    // Load existing demo applications to mark applied cards
    getApplications().then((apps) => {
      const ids = new Set(apps.map((a) => a.opportunityId));
      setAppliedIds(ids);
    });
  }, []);

  // 2. Fetch opportunities whenever filters change (with cancellation to prevent race conditions)
  useEffect(() => {
    let isCancelled = false;
    getOpportunities(filters)
      .then((data) => {
        if (!isCancelled) {
          setOpportunities(data);
          setInitialLoading(false);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setInitialLoading(false);
        }
      });
    return () => {
      isCancelled = true;
    };
  }, [filters]);

  // 3. Compute visible opportunities (excluding dismissed, applying saved tab if active)
  const visibleOpportunities = useMemo(() => {
    let list = opportunities.filter((opp) => !dismissedIds.has(opp.id));
    if (isSavedOnly) {
      list = list.filter((opp) => savedIds.has(opp.id));
    }
    return list;
  }, [opportunities, dismissedIds, isSavedOnly, savedIds]);

  // 4. Clear selection if the currently selected opportunity is filtered out or if results drop to 0
  useEffect(() => {
    if (selectedId && !visibleOpportunities.some((opp) => opp.id === selectedId)) {
      setSelectedId(null);
    }
  }, [visibleOpportunities, selectedId]);

  const selectedOpportunity = useMemo(() => {
    if (!selectedId) return null;
    return (
      visibleOpportunities.find((opp) => opp.id === selectedId) ||
      opportunities.find((opp) => opp.id === selectedId) ||
      null
    );
  }, [selectedId, visibleOpportunities, opportunities]);

  // 5. Actions: Toggle Save
  const handleToggleSave = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem(
          "careconnect_saved_opps",
          JSON.stringify(Array.from(next))
        );
      } catch {
        // demo fallback
      }
      return next;
    });
  };

  // 6. Actions: Dismiss / Not Interested
  const handleDismiss = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const opp = opportunities.find((o) => o.id === id);
    setDismissedIds((prev) => new Set(prev).add(id));
    if (opp) {
      setUndoDismissNotice({ id: opp.id, title: opp.title });
    }
  };

  const handleUndoDismiss = () => {
    if (!undoDismissNotice) return;
    setDismissedIds((prev) => {
      const next = new Set(prev);
      next.delete(undoDismissNotice.id);
      return next;
    });
    setSelectedId(undoDismissNotice.id);
    setUndoDismissNotice(null);
  };

  // 7. Actions: Apply
  const handleOpenApply = (opp: Opportunity) => {
    setApplyModalOpp(opp);
    setIsApplyModalOpen(true);
  };

  const handleApplicationSuccess = () => {
    if (applyModalOpp) {
      setAppliedIds((prev) => new Set(prev).add(applyModalOpp.id));
    }
  };

  // 8. Actions: Select Card
  const handleSelect = (opp: Opportunity) => {
    setSelectedId(opp.id);
    setMobileDetailOpen(true);
  };

  // 9. Active filters detection
  const hasActiveFilters = useMemo(() => {
    return (
      Boolean(filters.search) ||
      (filters.type && filters.type !== "all") ||
      (filters.category && filters.category !== "all") ||
      (filters.location && filters.location !== "all") ||
      (filters.commitment && filters.commitment !== "all") ||
      (filters.sortBy && filters.sortBy !== "default") ||
      isSavedOnly
    );
  }, [filters, isSavedOnly]);

  // 10. Actions: Clear Search Only
  const handleClearSearch = () => {
    setFilters((prev) => ({ ...prev, search: "" }));
  };

  // 11. Actions: Reset Filters & Search
  const handleResetFilters = () => {
    setIsSavedOnly(false);
    setFilters({
      type: "all",
      category: "all",
      location: "all",
      commitment: "all",
      sortBy: "default",
      search: "",
    });
  };

  return (
    <div className="py-6 sm:py-8 lg:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Application Modal (Preserves Browsing Context) */}
      <ApplicationModal
        opportunity={applyModalOpp}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        onApplicationSuccess={handleApplicationSuccess}
      />

      {/* Top Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-surface-border pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-2">
            <Sparkles className="h-3 w-3" />
            <span>Interactive Opportunity Browser</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-main">
            Find Care & Community Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed max-w-2xl">
            Browse verified community care shifts, volunteer positions, and student clinical internships with instant split-pane preview.
          </p>
        </div>

        {/* Demo Mode Notice Badge */}
        <div className="text-xs text-text-caption flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-md self-start sm:self-auto shrink-0">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Fictional Demo Dataset</span>
        </div>
      </div>

      {/* Floating Undo Dismiss Notice Banner (Fixed to eliminate layout displacement) */}
      {undoDismissNotice && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md rounded-lg border border-slate-700 bg-slate-900 text-white px-4 py-3 flex items-center justify-between gap-3 shadow-2xl text-xs animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center gap-2 truncate">
            <span className="text-slate-300">Opportunity hidden:</span>
            <strong className="truncate text-white font-medium">
              {undoDismissNotice.title}
            </strong>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleUndoDismiss}
              className="font-semibold text-brand-300 hover:text-white underline"
            >
              Undo
            </button>
            <button
              type="button"
              onClick={() => setUndoDismissNotice(null)}
              className="p-1 rounded text-slate-400 hover:text-white"
              aria-label="Dismiss notice"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Filter Toolbar */}
      <OpportunityFiltersPanel
        filters={filters}
        onChange={setFilters}
        onReset={handleResetFilters}
        totalResults={visibleOpportunities.length}
        savedCount={savedIds.size}
        isSavedOnly={isSavedOnly}
        onToggleSavedOnly={setIsSavedOnly}
      />

      {/* TWO-CONTEXT LAYOUT */}
      {/* Mobile Mode: Drill-Down View (Switches between List and Detail Pane) */}
      <div className="lg:hidden">
        {mobileDetailOpen && selectedOpportunity ? (
          <OpportunityDetailPane
            opportunity={selectedOpportunity}
            totalResultsCount={visibleOpportunities.length}
            hasActiveFilters={hasActiveFilters}
            isSavedOnly={isSavedOnly}
            searchQuery={filters.search || ""}
            onResetFilters={handleResetFilters}
            onClearSearch={handleClearSearch}
            isSaved={savedIds.has(selectedOpportunity.id)}
            isApplied={appliedIds.has(selectedOpportunity.id)}
            onApply={() => handleOpenApply(selectedOpportunity)}
            onToggleSave={() => handleToggleSave(selectedOpportunity.id)}
            onDismiss={() => {
              handleDismiss(selectedOpportunity.id);
              setMobileDetailOpen(false);
            }}
            onBackToList={() => setMobileDetailOpen(false)}
            isMobile
          />
        ) : (
          /* Mobile List View */
          <div className="space-y-3">
            {initialLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-surface-border bg-white p-4 space-y-2.5 animate-pulse"
                >
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))
            ) : visibleOpportunities.length === 0 ? (
              <EmptyState
                icon={isSavedOnly ? Bookmark : SearchX}
                title={
                  isSavedOnly
                    ? "No Saved Opportunities Yet"
                    : "No Matching Opportunities Found"
                }
                description={
                  isSavedOnly
                    ? "Tap the bookmark icon on any opportunity card to save it here for convenient comparison."
                    : "Try expanding your search query or clearing active category and location filters."
                }
                actionLabel={
                  isSavedOnly ? "Browse All Opportunities" : "Clear All Filters"
                }
                onAction={
                  isSavedOnly
                    ? () => setIsSavedOnly(false)
                    : handleResetFilters
                }
              />
            ) : (
              visibleOpportunities.map((opp) => (
                <OpportunityListItem
                  key={opp.id}
                  opportunity={opp}
                  isSelected={opp.id === selectedId}
                  isSaved={savedIds.has(opp.id)}
                  isApplied={appliedIds.has(opp.id)}
                  onSelect={handleSelect}
                  onToggleSave={handleToggleSave}
                  onDismiss={handleDismiss}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* Desktop Mode: True Split-Pane (Left 42% List, Right 58% Detail Pane with Consistent Stable Heights) */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6 items-stretch">
        {/* Left Column: Scannable Opportunity List */}
        <div
          className="lg:col-span-5 h-[calc(100vh-14rem)] min-h-[580px] flex flex-col"
          role="listbox"
          aria-label="Available care opportunities"
        >
          {initialLoading ? (
            <div className="flex-1 overflow-y-auto space-y-3 pr-1.5 [scrollbar-gutter:stable]">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-surface-border bg-white p-4 space-y-2.5 animate-pulse"
                >
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : visibleOpportunities.length === 0 ? (
            <div className="h-full flex flex-col justify-center">
              <EmptyState
                icon={isSavedOnly ? Bookmark : SearchX}
                title={
                  isSavedOnly
                    ? "No Saved Opportunities"
                    : "No Matching Opportunities"
                }
                description={
                  isSavedOnly
                    ? "Click the bookmark icon on any position card to save it here for fast review."
                    : "Try broadening your keyword or resetting category and location filters."
                }
                actionLabel={
                  isSavedOnly ? "View All Opportunities" : "Reset Filters"
                }
                onAction={
                  isSavedOnly ? () => setIsSavedOnly(false) : handleResetFilters
                }
              />
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-3 pr-1.5 [scrollbar-gutter:stable]">
              {visibleOpportunities.map((opp) => (
                <OpportunityListItem
                  key={opp.id}
                  opportunity={opp}
                  isSelected={opp.id === selectedId}
                  isSaved={savedIds.has(opp.id)}
                  isApplied={appliedIds.has(opp.id)}
                  onSelect={handleSelect}
                  onToggleSave={handleToggleSave}
                  onDismiss={handleDismiss}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Sticky Detail Evaluation Pane */}
        <div className="lg:col-span-7 h-[calc(100vh-14rem)] min-h-[580px]">
          <OpportunityDetailPane
            opportunity={selectedOpportunity}
            totalResultsCount={visibleOpportunities.length}
            hasActiveFilters={hasActiveFilters}
            isSavedOnly={isSavedOnly}
            searchQuery={filters.search || ""}
            onResetFilters={handleResetFilters}
            onClearSearch={handleClearSearch}
            isSaved={selectedOpportunity ? savedIds.has(selectedOpportunity.id) : false}
            isApplied={selectedOpportunity ? appliedIds.has(selectedOpportunity.id) : false}
            onApply={() => {
              if (selectedOpportunity) handleOpenApply(selectedOpportunity);
            }}
            onToggleSave={() => {
              if (selectedOpportunity) handleToggleSave(selectedOpportunity.id);
            }}
            onDismiss={() => {
              if (selectedOpportunity) handleDismiss(selectedOpportunity.id);
            }}
          />
        </div>
      </div>
    </div>
  );
}
