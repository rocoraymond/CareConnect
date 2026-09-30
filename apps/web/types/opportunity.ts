export type OpportunityType = 'caregiving' | 'volunteer' | 'internship';
export type OpportunityCategory = 
  | 'Elderly Care' 
  | 'Memory Care' 
  | 'Companion Care' 
  | 'Rehabilitation Support' 
  | 'Community Meals' 
  | 'Activities & Recreation';

export type CommitmentType = 'Full-time' | 'Part-time' | 'Per Diem' | 'Flexible Hours';

export type OpportunitySortOption = 'default' | 'newest' | 'compensation' | 'spots';

export interface Opportunity {
  id: string;
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
  compensation: string; // e.g. "$25 - $28/hr" or "Volunteer Credit & Certificate"
  isUrgent: boolean;
  postedDate: string;
  spotsAvailable: number;
  applicantsCount: number;
  status: 'active' | 'filled' | 'paused';
}
