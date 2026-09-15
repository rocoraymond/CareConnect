"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDemo } from "@/lib/context/demo-context";
import { getApplications } from "@/lib/api/applications-api";
import { getFeaturedOpportunities } from "@/lib/api/opportunities-api";
import { Application } from "@/types/application";
import { Opportunity } from "@/types/opportunity";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/feedback/status-badge";
import {
  Briefcase,
  FileCheck,
  Clock,
  CheckCircle2,
  Building2,
  Users,
  ArrowRight,
  Sparkles,
  Calendar,
  Layers,
  Heart,
  GraduationCap,
  MessageSquare,
  UserCheck,
} from "lucide-react";

export default function DashboardPage() {
  const { currentUser, activeRole, setIsSwitcherOpen } = useDemo();
  const [applications, setApplications] = useState<Application[]>([]);
  const [recommendedOpps, setRecommendedOpps] = useState<Opportunity[]>([]);

  useEffect(() => {
    getApplications().then(setApplications);
    getFeaturedOpportunities().then(setRecommendedOpps);
  }, []);

  const pendingApps = applications.filter(
    (a) => a.status === "submitted" || a.status === "under_review"
  );
  const acceptedApps = applications.filter((a) => a.status === "accepted");

  // First name extraction
  const firstName = currentUser.fullName.split(" ")[0];

  return (
    <div className="py-8 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-xl border border-surface-border bg-white p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200 capitalize">
              {activeRole.replace("_", " ")} Workspace
            </span>
            {currentUser.isVerified && (
              <Badge variant="success" className="text-[11px] gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Verified
              </Badge>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-main">
            Good morning, {firstName}
          </h1>

          <p className="text-sm text-text-muted max-w-xl leading-relaxed">
            {activeRole === "business_owner"
              ? "Overseeing facility staffing, active shift postings, and credentialed care applications at BrightCare."
              : activeRole === "volunteer"
              ? "Discover weekend community companion opportunities and track your volunteer service hours."
              : activeRole === "student"
              ? "Manage your supervised clinical rotation hours and gerontology internship placements."
              : "Track your active CNA applications, upcoming shift confirmations, and recommended facility openings."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSwitcherOpen(true)}
            className="text-xs gap-1.5"
          >
            <Layers className="h-3.5 w-3.5 text-brand-600" />
            Switch Demo Role
          </Button>

          <Link href="/opportunities">
            <Button size="sm" variant="primary" className="text-xs">
              Explore Positions
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Role-Specific Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {activeRole === "business_owner" ? (
          <>
            <MetricCard
              title="Active Opportunities"
              value="3"
              subtitle="2 urgent memory care shifts"
              icon={Briefcase}
            />
            <MetricCard
              title="New Applications"
              value={applications.length.toString()}
              subtitle="2 CNA licenses verified"
              icon={Users}
            />
            <MetricCard
              title="Upcoming Shifts"
              value="12"
              subtitle="94% scheduled coverage"
              icon={Calendar}
            />
            <MetricCard
              title="Messages"
              value="4 Unread"
              subtitle="Applicant inquiries"
              icon={MessageSquare}
            />
          </>
        ) : activeRole === "volunteer" ? (
          <>
            <MetricCard
              title="Volunteer Opportunities"
              value="6 Open"
              subtitle="Community programs"
              icon={Heart}
            />
            <MetricCard
              title="Upcoming Commitments"
              value="1 Active"
              subtitle="Riverside Health Center"
              icon={Building2}
            />
            <MetricCard
              title="Applications"
              value="1 Accepted"
              subtitle="Saturday morning recreation"
              icon={FileCheck}
            />
            <MetricCard
              title="Hours Completed"
              value="24.5 hrs"
              subtitle="Logged this semester"
              icon={Clock}
            />
          </>
        ) : activeRole === "student" ? (
          <>
            <MetricCard
              title="Clinical Hours"
              value="48 / 120"
              subtitle="Gerontology rotation"
              icon={GraduationCap}
            />
            <MetricCard
              title="Supervised Shifts"
              value="6"
              subtitle="Harborview Care Services"
              icon={Clock}
            />
            <MetricCard
              title="Clinical Evaluations"
              value="100%"
              subtitle="Preceptor feedback passing"
              icon={CheckCircle2}
            />
            <MetricCard
              title="Placement Status"
              value="Active"
              subtitle="Fall 2026 Academic Term"
              icon={Building2}
            />
          </>
        ) : (
          <>
            <MetricCard
              title="Upcoming Applications"
              value={applications.length.toString()}
              subtitle={`${pendingApps.length} currently in review`}
              icon={FileCheck}
            />
            <MetricCard
              title="Recommended Opportunities"
              value={recommendedOpps.length.toString()}
              subtitle="Matching CNA credentials"
              icon={Sparkles}
            />
            <MetricCard
              title="Messages"
              value="2 Unread"
              subtitle="Direct from intake coordinators"
              icon={MessageSquare}
            />
            <MetricCard
              title="Profile Completion"
              value="100%"
              subtitle="CNA license & BLS verified"
              icon={UserCheck}
            />
          </>
        )}
      </div>

      {/* Main Split Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Applications / Primary Activity Stream */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle>
                  {activeRole === "business_owner"
                    ? "Candidate Applications to Review"
                    : "Your Active Applications"}
                </CardTitle>
                <p className="text-xs text-text-muted mt-0.5">
                  Simulated session tracking using typed mock data
                </p>
              </div>
              <Link href="/applications">
                <Button variant="ghost" size="sm" className="text-xs">
                  View Full Tracker <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              {applications.slice(0, 3).map((app) => (
                <div
                  key={app.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-lg border border-slate-100 bg-surface-subtle gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={app.status} />
                      <span className="font-semibold text-text-main text-sm">
                        {app.opportunityTitle}
                      </span>
                    </div>
                    <div className="text-text-muted flex items-center gap-2">
                      <span>{app.facilityName}</span>
                      <span>•</span>
                      <span>{app.facilityLocation}</span>
                      {activeRole === "business_owner" && (
                        <>
                          <span>•</span>
                          <span className="font-medium text-brand-700">Applicant: {app.applicantName}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <Link href={`/opportunities/${app.opportunityId}`}>
                    <Button variant="outline" size="sm" className="text-xs shrink-0">
                      Position Details
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommended Positions Section for Caregiver / Volunteer */}
          {activeRole === "caregiver" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-base">Recommended Positions for {firstName}</CardTitle>
                <Link href="/opportunities">
                  <span className="text-xs text-brand-700 hover:underline">View all</span>
                </Link>
              </CardHeader>
              <CardContent className="space-y-3 pt-1">
                {recommendedOpps.slice(0, 2).map((opp) => (
                  <div
                    key={opp.id}
                    className="p-3 rounded-lg border border-surface-border bg-white flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-text-main text-sm">{opp.title}</div>
                      <div className="text-text-muted mt-0.5">{opp.facilityName} • {opp.facilityLocation}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-semibold text-brand-700">{opp.compensation}</div>
                      <Link href={`/opportunities/${opp.id}`}>
                        <Button size="sm" variant="outline" className="text-[11px] h-7 mt-1">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Demonstration Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              <Link href="/opportunities" className="block">
                <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs">
                  <Briefcase className="h-4 w-4 text-brand-600" />
                  Browse Caregiver & Volunteer Shifts
                </Button>
              </Link>
              <Link href="/applications" className="block">
                <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs">
                  <FileCheck className="h-4 w-4 text-brand-600" />
                  Open Application Status Timeline
                </Button>
              </Link>
              <Link href="/profile" className="block">
                <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs">
                  <Users className="h-4 w-4 text-brand-600" />
                  Review Provider Credentials
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsSwitcherOpen(true)}
                className="w-full justify-start gap-2 text-xs"
              >
                <Layers className="h-4 w-4 text-brand-700" />
                Switch Persona to Business Owner
              </Button>
            </CardContent>
          </Card>

          {/* Presentation Guidance Box */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 text-xs text-text-muted space-y-2">
            <h4 className="font-bold text-text-main flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-brand-600" />
              Presentation Guide
            </h4>
            <p className="leading-relaxed">
              Click <strong>Demo Role</strong> in the navbar to switch personas anytime. The greeting, metrics, and application summaries will immediately adapt to reflect that persona's perspective.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-lg border border-surface-border bg-white p-5 shadow-card space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-caption">
          {title}
        </span>
        <div className="h-7 w-7 rounded bg-brand-50 text-brand-600 flex items-center justify-center">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="text-2xl font-bold text-text-main">{value}</div>
      <p className="text-xs text-text-muted">{subtitle}</p>
    </div>
  );
}
