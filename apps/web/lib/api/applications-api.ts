/**
 * Applications API Service Boundary
 * 
 * [CURRENT]: MOCK IMPLEMENTATION
 * Simulates async REST API calls with typed mock data.
 * Maintains session-level submitted applications.
 * 
 * [FUTURE]: REST API IMPLEMENTATION
 * Will execute fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/applications`)
 */

import { Application, ApplicationStatus } from "@/types/application";
import { MOCK_APPLICATIONS } from "@/lib/mock/applications";

// In-memory store for session additions
let sessionApplications: Application[] = [...MOCK_APPLICATIONS];

export async function getApplications(): Promise<Application[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return [...sessionApplications];
}

export async function getApplicationsForUser(userId: string): Promise<Application[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return sessionApplications.filter((app) => app.applicantId === userId);
}

export async function getApplicationById(id: string): Promise<Application | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const app = sessionApplications.find((a) => a.id === id);
  return app || null;
}

export interface SubmitApplicationInput {
  opportunityId: string;
  opportunityTitle: string;
  opportunityType: 'caregiving' | 'volunteer' | 'internship';
  facilityId: string;
  facilityName: string;
  facilityLocation: string;
  applicantId: string;
  applicantName: string;
  applicantRole: string;
  applicantEmail: string;
  availability: string;
  coverNote: string;
}

export async function submitApplication(input: SubmitApplicationInput): Promise<Application> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const newApp: Application = {
    id: `app-${Date.now()}`,
    ...input,
    status: 'submitted',
    submittedAt: new Date().toISOString(),
    timeline: [
      {
        status: 'submitted',
        label: 'Application Submitted',
        timestamp: 'Just now',
        description: 'Application successfully received by the facility care team.'
      }
    ]
  };

  // Prepend to session list so it's immediately visible
  sessionApplications = [newApp, ...sessionApplications];
  return newApp;
}
