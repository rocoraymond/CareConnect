export type ApplicationStatus = 
  | 'submitted' 
  | 'under_review' 
  | 'interview_scheduled' 
  | 'accepted' 
  | 'declined';

export interface ApplicationTimelineEvent {
  status: ApplicationStatus;
  label: string;
  timestamp: string;
  description: string;
}

export interface Application {
  id: string;
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
  status: ApplicationStatus;
  submittedAt: string;
  availability: string;
  coverNote: string;
  timeline: ApplicationTimelineEvent[];
}
