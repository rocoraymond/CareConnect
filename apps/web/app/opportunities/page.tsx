"use client";

import React, { useState, useEffect } from "react";
import { getOpportunities, OpportunityFilters } from "@/lib/api/opportunities-api";
import { Opportunity } from "@/types/opportunity";
import { OpportunityCard } from "@/features/opportunities/opportunity-card";
import { OpportunityFiltersPanel } from "@/features/opportunities/opportunity-filters";
import { ApplicationModal } from "@/features/opportunities/application-modal";
import { OpportunityCardSkeleton } from "@/components/feedback/loading-state";
import { EmptyState } from "@/components/feedback/empty-state";
import { Briefcase, SearchX } from "lucide-react";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<OpportunityFilters>({
    type: "all",
    category: "all",
    commitment: "all",
    search: "",
  });
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchOpps = async (currentFilters: OpportunityFilters) => {
    setLoading(true);
    try {
      const data = await getOpportunities(currentFilters);
      setOpportunities(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpps(filters);
  }, [filters]);

  const handleApplyClick = (opp: Opportunity) => {
    setSelectedOpp(opp);
    setModalOpen(true);
  };

  const handleResetFilters = () => {
    const reset = {
      type: "all" as const,
      category: "all",
      commitment: "all",
      search: "",
    };
    setFilters(reset);
  };

  return (
    <div className="py-8 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <ApplicationModal
        opportunity={selectedOpp}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-main">
          Find Care & Community Opportunities
        </h1>
        <p className="text-sm text-text-muted mt-1 leading-relaxed">
          Browse verified residential care shifts, volunteer positions, and student clinical internships.
        </p>
      </div>

      {/* Filters */}
      <OpportunityFiltersPanel
        filters={filters}
        onChange={setFilters}
        onReset={handleResetFilters}
        totalResults={opportunities.length}
      />

      {/* Grid or Empty/Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <OpportunityCardSkeleton key={i} />
          ))}
        </div>
      ) : opportunities.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No Matching Opportunities Found"
          description="Try broadening your search term or adjusting filters such as care category or commitment type."
          actionLabel="Clear All Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {opportunities.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onApplyClick={handleApplyClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
