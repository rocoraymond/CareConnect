// ==============================================================================
// DEMO DATA - 100% Fictional Data for Client Presentation Prototype
// Contains strictly fictional application records and progress events.
// ==============================================================================

import { Application } from "@/types/application";

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: "app-101",
    opportunityId: "opp-01",
    opportunityTitle: "Certified Nursing Assistant (CNA) - Memory Care Shift",
    opportunityType: "caregiving",
    facilityId: "facility-01",
    facilityName: "BrightCare Senior Living & Memory Center",
    facilityLocation: "Oakland, CA",
    applicantId: "demo-caregiver-01",
    applicantName: "Sarah Mitchell",
    applicantRole: "Certified Nursing Assistant (CNA)",
    applicantEmail: "sarah.mitchell@demo-careconnect.org",
    status: "under_review",
    submittedAt: "2026-09-12T09:30:00Z",
    availability: "Available immediately for Day Shift (Tuesday - Saturday)",
    coverNote: "I have 5 years of dedicated senior and memory care experience with certified Alzheimer's care credentials. I look forward to supporting BrightCare residents with respectful and patient care.",
    timeline: [
      {
        status: "submitted",
        label: "Application Submitted",
        timestamp: "Sep 12, 2026 • 9:30 AM",
        description: "Application received and credentials logged."
      },
      {
        status: "under_review",
        label: "Clinical Review in Progress",
        timestamp: "Sep 13, 2026 • 2:15 PM",
        description: "Director of Nursing is reviewing CNA license verification and shift references."
      }
    ]
  },
  {
    id: "app-102",
    opportunityId: "opp-06",
    opportunityTitle: "Overnight Respite Caregiver - Palliative Residence",
    opportunityType: "caregiving",
    facilityId: "facility-04",
    facilityName: "Serenity Palliative Care Residence",
    facilityLocation: "Berkeley, CA",
    applicantId: "demo-caregiver-01",
    applicantName: "Sarah Mitchell",
    applicantRole: "Certified Nursing Assistant (CNA)",
    applicantEmail: "sarah.mitchell@demo-careconnect.org",
    status: "interview_scheduled",
    submittedAt: "2026-09-11T14:20:00Z",
    availability: "Friday & Saturday nights (9:00 PM - 7:00 AM)",
    coverNote: "Experienced with nocturnal comfort checks, hospice bedside vigil, and peaceful family communication.",
    timeline: [
      {
        status: "submitted",
        label: "Application Submitted",
        timestamp: "Sep 11, 2026 • 2:20 PM",
        description: "Application received."
      },
      {
        status: "under_review",
        label: "Profile Reviewed",
        timestamp: "Sep 12, 2026 • 11:00 AM",
        description: "Credentials verified by hospice intake coordinator."
      },
      {
        status: "interview_scheduled",
        label: "Video Orientation Scheduled",
        timestamp: "Sep 14, 2026 • 4:00 PM",
        description: "Scheduled with Clinical Coordinator for Thursday at 10:00 AM."
      }
    ]
  },
  {
    id: "app-103",
    opportunityId: "opp-03",
    opportunityTitle: "Weekend Senior Companion & Recreational Volunteer",
    opportunityType: "volunteer",
    facilityId: "facility-02",
    facilityName: "Riverside Community Health Center",
    facilityLocation: "San Francisco, CA",
    applicantId: "demo-volunteer-03",
    applicantName: "Daniel Carter",
    applicantRole: "Community Volunteer",
    applicantEmail: "daniel.carter@demo-careconnect.org",
    status: "accepted",
    submittedAt: "2026-09-09T10:00:00Z",
    availability: "Saturday mornings (10:00 AM - 2:00 PM)",
    coverNote: "Looking forward to hosting weekend storytelling, trivia, and chess sessions with the participants.",
    timeline: [
      {
        status: "submitted",
        label: "Application Submitted",
        timestamp: "Sep 9, 2026 • 10:00 AM",
        description: "Volunteer registration completed."
      },
      {
        status: "under_review",
        label: "Background Check Completed",
        timestamp: "Sep 10, 2026 • 1:30 PM",
        description: "Volunteer safety clearance confirmed."
      },
      {
        status: "accepted",
        label: "Welcome to the Volunteer Team",
        timestamp: "Sep 11, 2026 • 3:00 PM",
        description: "Orientation completed. Assigned to Saturday morning recreation."
      }
    ]
  }
];
