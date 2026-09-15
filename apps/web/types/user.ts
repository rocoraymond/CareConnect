export type UserRole = 'caregiver' | 'business_owner' | 'volunteer' | 'student' | 'admin';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  headline: string;
  location: string;
  bio: string;
  skills: string[];
  certifications: string[];
  yearsExperience?: number;
  isVerified: boolean;
  phone?: string;
  preferredCommitment?: ('full-time' | 'part-time' | 'flexible' | 'shift-based')[];
  facilityId?: string; // For business owners managing a specific facility
}

export interface DemoSession {
  currentUser: UserProfile;
  activeRole: UserRole;
}
