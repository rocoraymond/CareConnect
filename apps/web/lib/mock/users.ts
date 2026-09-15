// ==============================================================================
// DEMO DATA - 100% Fictional Data for Client Presentation Prototype
// Contains strictly fictional characters, facilities, and scenarios.
// No real patient, facility, or personal data is used.
// ==============================================================================

import { UserProfile } from "@/types/user";

export const MOCK_USERS: Record<string, UserProfile> = {
  caregiver: {
    id: "demo-caregiver-01",
    fullName: "Sarah Mitchell",
    email: "sarah.mitchell@demo-careconnect.org",
    role: "caregiver",
    avatarUrl: "",
    headline: "Certified Nursing Assistant (CNA) • 5 Years Senior Care Experience",
    location: "Oakland, CA",
    bio: "Compassionate, patient-centered CNA with extensive experience in memory care, mobility support, and post-operative rehabilitation for senior residents.",
    skills: [
      "Memory Care",
      "Mobility Transfer (Hoyer Lift)",
      "Medication Reminders",
      "Vitals Monitoring",
      "Fall Prevention",
      "CPR & First Aid",
    ],
    certifications: [
      "California Certified Nursing Assistant (#CNA-894102)",
      "BLS / CPR Healthcare Provider (AHA)",
      "Alzheimer's & Dementia Care Specialist (CADCS)",
    ],
    yearsExperience: 5,
    isVerified: true,
    phone: "(510) 555-0142",
    preferredCommitment: ["full-time", "shift-based"],
  },

  business_owner: {
    id: "demo-owner-02",
    fullName: "Michael Vance",
    email: "michael.vance@brightcare-demo.org",
    role: "business_owner",
    avatarUrl: "",
    headline: "Executive Director • BrightCare Senior Living & Memory Center",
    location: "Oakland, CA",
    bio: "Overseeing residential operations, staff scheduling, and resident wellness standards at BrightCare Senior Living, licensed for 84 residential care beds.",
    skills: [
      "Facility Administration",
      "Care Staff Recruitment",
      "State Regulatory Compliance",
      "Resident Care Planning",
    ],
    certifications: [
      "Licensed Nursing Home Administrator (LNHA)",
      "RCFE Administrator Certificate",
    ],
    yearsExperience: 14,
    isVerified: true,
    phone: "(510) 555-0198",
    facilityId: "facility-01",
  },

  volunteer: {
    id: "demo-volunteer-03",
    fullName: "Daniel Carter",
    email: "daniel.carter@demo-careconnect.org",
    role: "volunteer",
    avatarUrl: "",
    headline: "Community Companion • Weekend Recreational Volunteer",
    location: "Berkeley, CA",
    bio: "Passionate about bridging generations through weekend storytelling sessions, chess club facilitation, and meal companion service for assisted living communities.",
    skills: [
      "Companion Care",
      "Reading & Storytelling",
      "Board Games & Puzzles",
      "Wheelchair Escort",
    ],
    certifications: [
      "Community Volunteer Safety Clearance",
      "Adult First Aid Certified",
    ],
    yearsExperience: 2,
    isVerified: true,
    phone: "(510) 555-0187",
    preferredCommitment: ["flexible"],
  },

  student: {
    id: "demo-student-04",
    fullName: "Emily Johnson",
    email: "emily.johnson@demo-bayarea-nursing.edu",
    role: "student",
    avatarUrl: "",
    headline: "BSN Nursing Student (3rd Year) • Seeking Clinical Hours",
    location: "San Francisco, CA",
    bio: "Third-year Bachelor of Science in Nursing student seeking supervised gerontology and rehabilitation internship opportunities to complete clinical requirements.",
    skills: [
      "Clinical Documentation",
      "Patient Engagement",
      "Vital Signs Recording",
      "Infection Control Protocols",
    ],
    certifications: [
      "Student Nurse Association Member",
      "BLS for Healthcare Providers",
    ],
    yearsExperience: 1,
    isVerified: true,
    phone: "(415) 555-0131",
    preferredCommitment: ["part-time", "shift-based"],
  },

  admin: {
    id: "demo-admin-05",
    fullName: "Rachel Adams",
    email: "admin@demo-careconnect.org",
    role: "admin",
    avatarUrl: "",
    headline: "Platform Operations Manager • Care Connect Trust & Safety",
    location: "San Francisco, CA",
    bio: "Oversees provider verification, background screening confirmations, and facility license verification across the platform.",
    skills: [
      "Provider Vetting",
      "Compliance Auditing",
      "Trust & Safety",
      "Platform Moderation",
    ],
    certifications: [
      "Healthcare Compliance Specialist (CHC)",
    ],
    yearsExperience: 10,
    isVerified: true,
    phone: "(415) 555-0100",
  },
};
