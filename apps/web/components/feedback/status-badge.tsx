import React from "react";
import { Badge } from "@/components/ui/badge";
import { ApplicationStatus } from "@/types/application";

interface StatusBadgeProps {
  status: ApplicationStatus | "urgent" | "active" | "filled";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  switch (status) {
    case "submitted":
      return <Badge variant="default" className={className}>Submitted</Badge>;
    case "under_review":
      return <Badge variant="warning" className={className}>Under Review</Badge>;
    case "interview_scheduled":
      return <Badge variant="primary" className={className}>Interview Scheduled</Badge>;
    case "accepted":
      return <Badge variant="success" className={className}>Accepted</Badge>;
    case "declined":
      return <Badge variant="danger" className={className}>Declined</Badge>;
    case "urgent":
      return <Badge variant="danger" className={className}>Urgent Need</Badge>;
    case "active":
      return <Badge variant="success" className={className}>Open</Badge>;
    case "filled":
      return <Badge variant="default" className={className}>Position Filled</Badge>;
    default:
      return <Badge variant="default" className={className}>{status}</Badge>;
  }
}
