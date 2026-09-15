/**
 * Opportunities API Service Boundary
 * 
 * [CURRENT]: MOCK IMPLEMENTATION
 * Simulates async REST API calls with typed mock data.
 * Maintains session-level created opportunities.
 * 
 * [FUTURE]: REST API IMPLEMENTATION
 * Will execute fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/opportunities`)
 */

import { Opportunity, OpportunityType, OpportunityCategory, CommitmentType } from "@/types/opportunity";
import { MOCK_OPPORTUNITIES } from "@/lib/mock/opportunities";

// In-memory store for session
let sessionOpportunities: Opportunity[] = [...MOCK_OPPORTUNITIES];

export interface OpportunityFilters {
  search?: string;
  type?: OpportunityType | "all";
  category?: string;
  location?: string;
  commitment?: string;
  facilityId?: string;
}

export async function getOpportunities(filters?: OpportunityFilters): Promise<Opportunity[]> {
  // Simulate network latency (50ms)
  await new Promise((resolve) => setTimeout(resolve, 50));

  let results = [...sessionOpportunities];

  if (!filters) return results;

  if (filters.facilityId) {
    results = results.filter((opp) => opp.facilityId === filters.facilityId);
  }

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
  const opp = sessionOpportunities.find((item) => item.id === id);
  return opp || null;
}

export async function getFeaturedOpportunities(): Promise<Opportunity[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return sessionOpportunities.slice(0, 3);
}

export interface CreateOpportunityInput {
  title: string;
  type: OpportunityType;
  category: OpportunityCategory;
  facilityId: string;
  facilityName: string;
  facilityLocation: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  schedule: string;
  shiftHours: string;
  commitment: CommitmentType;
  compensation: string;
  spotsAvailable: number;
}

export async function createOpportunity(input: CreateOpportunityInput): Promise<Opportunity> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const newOpp: Opportunity = {
    id: `opp-${Date.now()}`,
    ...input,
    isUrgent: false,
    postedDate: new Date().toISOString().split("T")[0],
    applicantsCount: 0,
    status: "active",
  };

  sessionOpportunities = [newOpp, ...sessionOpportunities];
  return newOpp;
}
