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

import { Opportunity, OpportunityType, OpportunityCategory, CommitmentType, OpportunitySortOption } from "@/types/opportunity";
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
  sortBy?: OpportunitySortOption;
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
        opp.facilityLocation.toLowerCase().includes(q) ||
        opp.category.toLowerCase().includes(q) ||
        opp.requirements.some((req) => req.toLowerCase().includes(q))
    );
  }

  if (filters.type && filters.type !== "all") {
    results = results.filter((opp) => opp.type === filters.type);
  }

  if (filters.category && filters.category !== "all") {
    results = results.filter((opp) => opp.category === filters.category);
  }

  if (filters.location && filters.location.trim() && filters.location !== "all") {
    const loc = filters.location.toLowerCase().trim();
    results = results.filter((opp) => {
      const facilityLoc = opp.facilityLocation.toLowerCase();
      // Match remote
      if (loc === "remote") {
        return (
          facilityLoc.includes("remote") ||
          opp.title.toLowerCase().includes("remote") ||
          opp.description.toLowerCase().includes("remote")
        );
      }
      // Match California / CA
      if (loc === "ca" || loc === "california") {
        return facilityLoc.includes("ca") || facilityLoc.includes("california");
      }
      // Demo Bay Area ZIP code mapping for local facilities
      const zipToCity: Record<string, string> = {
        "94609": "oakland",
        "94611": "oakland",
        "94612": "oakland",
        "94102": "san francisco",
        "94103": "san francisco",
        "94110": "san francisco",
        "94401": "san mateo",
        "94402": "san mateo",
        "94704": "berkeley",
        "94705": "berkeley",
      };
      if (zipToCity[loc] && facilityLoc.includes(zipToCity[loc])) {
        return true;
      }
      // Match city names, partial locations, or zip codes
      return (
        facilityLoc.includes(loc) ||
        opp.facilityName.toLowerCase().includes(loc)
      );
    });
  }

  if (filters.commitment && filters.commitment !== "all") {
    results = results.filter((opp) => opp.commitment === filters.commitment);
  }

  // Deterministic demo sorting (no AI / ML ranking)
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "newest":
        results.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        break;
      case "compensation":
        // Extract highest dollar number if present
        const extractMaxRate = (comp: string) => {
          const matches = comp.match(/\$?(\d+(?:\.\d+)?)/g);
          if (!matches) return 0;
          return Math.max(...matches.map((m) => parseFloat(m.replace("$", ""))));
        };
        results.sort((a, b) => extractMaxRate(b.compensation) - extractMaxRate(a.compensation));
        break;
      case "spots":
        results.sort((a, b) => b.spotsAvailable - a.spotsAvailable);
        break;
      case "default":
      default:
        // Default deterministic presentation order
        break;
    }
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
