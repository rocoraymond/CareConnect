"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDemo } from "@/lib/context/demo-context";
import { getApplications } from "@/lib/api/applications-api";
import { Application } from "@/types/application";
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
} from "lucide-react";

export default function DashboardPage() {
  const { currentUser, activeRole, setIsSwitcherOpen } = useDemo();
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    getApplications().then(setApplications);
  }, []);

  const pendingApps = applications.filter(
    (a) => a.status === "submitted" || a.status === "under_review"
  );
  const acceptedApps = applications.filter((a) => a.status === "accepted");

  return (
    <div className="py-8 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-xl border border-surface-border bg-white p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200 capitalize">
              {activeRole.replace("_", " ")} Dashboard
            </span>
            {currentUser.isVerified && (
              <Badge variant="success" className="text-[11px] gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Verified
              </Badge>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-main">
            Welcome back, {currentUser.fullName.split(" ")[0]}
          </h1>

          <p className="text-sm text-text-muted max-w-xl leading-relaxed">
            {activeRole === "business_owner"
              ? "Overseeing facility staffing, active shift postings, and credentialed care applications."
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
            Switch Role Demo
          </Button>

          <Link href="/opportunities">
            <Button size="sm" variant="primary" className="text-xs">
              Find Shifts
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {activeRole === "business_owner" ? (
          <>
            <MetricCard
              title="Active Shift Postings"
              value="3"
              subtitle="2 urgent needs open"
              icon={Briefcase}
            />
            <MetricCard
              title="Applicants Under Review"
              value={applications.length.toString()}
              subtitle="2 CNA licenses verified"
              icon={Users}
            />
            <MetricCard
              title="Licensed Capacity"
              value="84 Beds"
              subtitle="Memory care & assisted"
              icon={Building2}
            />
            <MetricCard
              title="Shift Coverage"
              value="94%"
              subtitle="Next 7 days scheduled"
              icon={CheckCircle2}
            />
          </>
        ) : activeRole === "volunteer" ? (
          <>
            <MetricCard
              title="Volunteer Hours"
              value="24.5 hrs"
              subtitle="Logged this semester"
              icon={Heart}
            />
            <MetricCard
              title="Active Commitments"
              value="1"
              subtitle="Golden Gate Adult Day"
              icon={Building2}
            />
            <MetricCard
              title="Upcoming Sessions"
              value="2 Shifts"
              subtitle="Saturday morning games"
              icon={Calendar}
            />
            <MetricCard
              title="Community Impact"
              value="52 Elders"
              subtitle="Storytelling & companion"
              icon={Sparkles}
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
              subtitle="Pinecrest Rehabilitation"
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
              title="Submitted Applications"
              value={applications.length.toString()}
              subtitle={`${pendingApps.length} currently in review`}
              icon={FileCheck}
            />
            <MetricCard
              title="Confirmed Placements"
              value={acceptedApps.length.toString()}
              subtitle="Ready for orientation"
              icon={CheckCircle2}
            />
            <MetricCard
              title="Next Scheduled Shift"
              value="Tomorrow"
              subtitle="7:00 AM - Oakridge Living"
              icon={Clock}
            />
            <MetricCard
              title="Profile Completeness"
              value="100%"
              subtitle="CNA & BLS verified"
              icon={Sparkles}
            />
          </>
        )}
      </div>

      {/* Main Split Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Applications / Activity Stream */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle>Recent Application Activity</CardTitle>
                <p className="text-xs text-text-muted mt-0.5">
                  Simulated session tracking for active applications
                </p>
              </div>
              <Link href="/applications">
                <Button variant="ghost" size="sm" className="text-xs">
                  View Tracker <ArrowRight className="h-3 w-3" />
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
                    </div>
                  </div>

                  <Link href={`/opportunities/${app.opportunityId}`}>
                    <Button variant="outline" size="sm" className="text-xs shrink-0">
                      Details
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recommended Quick Actions & Facility Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Quick Demo Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              <Link href="/opportunities" className="block">
                <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs">
                  <Briefcase className="h-4 w-4 text-brand-600" />
                  Browse Certified CNA Shifts
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

          {/* Demonstration Notice */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 text-xs text-text-muted space-y-2">
            <h4 className="font-bold text-text-main flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-brand-600" />
              Presentation Guidance
            </h4>
            <p className="leading-relaxed">
              Use the top banner to toggle instantly between Caregiver, Business Owner, Volunteer, and Student roles to see how metrics and priorities shift in real time.
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
