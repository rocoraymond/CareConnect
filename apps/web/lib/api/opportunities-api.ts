/**
 * Opportunities API Service Boundary
 * 
 * [CURRENT]: MOCK IMPLEMENTATION
 * Simulates async REST API calls with typed mock data.
 * 
 * [FUTURE]: REST API IMPLEMENTATION
 * Will execute fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/opportunities`)
 */

import { Opportunity, OpportunityType } from "@/types/opportunity";
import { MOCK_OPPORTUNITIES } from "@/lib/mock/opportunities";

export interface OpportunityFilters {
  search?: string;
  type?: OpportunityType | "all";
  category?: string;
  location?: string;
  commitment?: string;
}

export async function getOpportunities(filters?: OpportunityFilters): Promise<Opportunity[]> {
  // Simulate network latency (50ms)
  await new Promise((resolve) => setTimeout(resolve, 50));

  let results = [...MOCK_OPPORTUNITIES];

  if (!filters) return results;

  if (filters.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    results = results.filter(
      (opp) =>
        opp.title.toLowerCase().includes(q) ||
        opp.description.toLowerCase().includes(q) ||
        opp.facilityName.toLowerCase().includes(q) ||
        opp.facilityLocation.toLowerCase().includes(q)
    );
  }

  if (filters.type && filters.type !== "all") {
    results = results.filter((opp) => opp.type === filters.type);
  }

  if (filters.category && filters.category !== "all") {
    results = results.filter((opp) => opp.category === filters.category);
  }

  if (filters.commitment && filters.commitment !== "all") {
    results = results.filter((opp) => opp.commitment === filters.commitment);
  }

  return results;
}

export async function getOpportunityById(id: string): Promise<Opportunity | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const opp = MOCK_OPPORTUNITIES.find((item) => item.id === id);
  return opp || null;
}

export async function getFeaturedOpportunities(): Promise<Opportunity[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return MOCK_OPPORTUNITIES.slice(0, 3);
}
