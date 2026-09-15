/**
 * Auth & Session API Service Boundary
 * 
 * [CURRENT]: MOCK / DEMO IMPLEMENTATION
 * Allows instantaneous switching between demo roles (caregiver, business owner, volunteer, student).
 * 
 * [FUTURE]: COGNITO / JWT IMPLEMENTATION
 * Will manage real OAuth2 / JWT refresh tokens and server-side RBAC session cookies.
 */

import { UserProfile, UserRole } from "@/types/user";
import { MOCK_USERS } from "@/lib/mock/users";

// Default active persona: Elena Rostova (Caregiver)
let currentActiveRole: UserRole = "caregiver";

export async function getCurrentUser(): Promise<UserProfile> {
  await new Promise((resolve) => setTimeout(resolve, 20));
  return MOCK_USERS[currentActiveRole] || MOCK_USERS.caregiver;
}

export async function getMockUserByRole(role: UserRole): Promise<UserProfile> {
  await new Promise((resolve) => setTimeout(resolve, 20));
  return MOCK_USERS[role] || MOCK_USERS.caregiver;
}

export async function setDemoActiveRole(role: UserRole): Promise<UserProfile> {
  currentActiveRole = role;
  return MOCK_USERS[role] || MOCK_USERS.caregiver;
}

export function getAllDemoRoles(): { role: UserRole; name: string; title: string }[] {
  return [
    {
      role: "caregiver",
      name: MOCK_USERS.caregiver.fullName,
      title: "Certified Nursing Assistant (CNA)",
    },
    {
      role: "business_owner",
      name: MOCK_USERS.business_owner.fullName,
      title: "Executive Director (Facility Owner)",
    },
    {
      role: "volunteer",
      name: MOCK_USERS.volunteer.fullName,
      title: "Community Volunteer",
    },
    {
      role: "student",
      name: MOCK_USERS.student.fullName,
      title: "Nursing Student Intern",
    },
  ];
}
