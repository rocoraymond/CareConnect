"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDemo } from "@/lib/context/demo-context";
import { getApplications } from "@/lib/api/applications-api";
import { Application, ApplicationStatus } from "@/types/application";
import { StatusBadge } from "@/components/feedback/status-badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/feedback/empty-state";
import {
  FileText,
  Building2,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function ApplicationsPage() {
  const { currentUser } = useDemo();
  const [applications, setApplications] = useState<Application[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | ApplicationStatus>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApplications().then((data) => {
      setApplications(data);
      setLoading(false);
    });
  }, []);

  const filteredApps = applications.filter((app) => {
    if (activeTab === "all") return true;
    return app.status === activeTab;
  });

  return (
    <div className="py-8 sm:py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-main">
            My Application Status Tracker
          </h1>
          <p className="text-sm text-text-muted mt-1 leading-relaxed">
            Simulated application status tracking using typed mock data for active persona:{" "}
            <strong>{currentUser.fullName}</strong>.
          </p>
        </div>

        <Link href="/opportunities">
          <Button variant="primary" size="sm">
            Browse More Shifts
          </Button>
        </Link>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex border-b border-surface-border gap-2 overflow-x-auto pb-px">
        {[
          { key: "all", label: "All Applications" },
          { key: "submitted", label: "Submitted" },
          { key: "under_review", label: "Under Review" },
          { key: "interview_scheduled", label: "Interview Scheduled" },
          { key: "accepted", label: "Accepted" },
        ].map((tab) => {
          const count =
            tab.key === "all"
              ? applications.length
              : applications.filter((a) => a.status === tab.key).length;

          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              className={cn(
                "px-3.5 py-2 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5",
                isActive
                  ? "border-brand-600 text-brand-700 font-semibold"
                  : "border-transparent text-text-muted hover:text-text-main hover:border-slate-300"
              )}
            >
              <span>{tab.label}</span>
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded-full text-[11px]",
                  isActive ? "bg-brand-100 text-brand-800" : "bg-slate-100 text-slate-600"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Applications List */}
      {loading ? (
        <div className="space-y-4">
          <div className="h-32 rounded-xl bg-slate-200 animate-pulse" />
          <div className="h-32 rounded-xl bg-slate-200 animate-pulse" />
        </div>
      ) : filteredApps.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No Applications in this Category"
          description="You don't have any submitted applications matching this status filter right now."
          actionLabel="Explore Available Positions"
          onAction={() => (window.location.href = "/opportunities")}
        />
      ) : (
        <div className="space-y-6">
          {filteredApps.map((app) => (
            <Card key={app.id} className="overflow-hidden border border-surface-border">
              <CardHeader className="bg-slate-50/60 pb-4 border-b border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={app.status} />
                      <Badge variant="outline" className="capitalize text-xs">
                        {app.opportunityType}
                      </Badge>
                      <span className="text-xs text-text-caption">
                        ID: {app.id}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-text-main">
                      {app.opportunityTitle}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <Building2 className="h-3.5 w-3.5 text-slate-400" />
                      <span className="font-medium">{app.facilityName}</span>
                      <span>•</span>
                      <span>{app.facilityLocation}</span>
                    </div>
                  </div>

                  <Link href={`/opportunities/${app.opportunityId}`}>
                    <Button variant="outline" size="sm" className="text-xs">
                      View Position
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>

              <CardContent className="pt-5 space-y-5">
                {/* Timeline Progress */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-text-caption mb-3">
                    Progress Timeline
                  </h4>
                  <div className="relative border-l-2 border-brand-200 ml-3 space-y-4 pl-4 pb-1">
                    {app.timeline.map((event, idx) => (
                      <div key={idx} className="relative">
                        {/* Dot */}
                        <div className="absolute -left-[23px] top-1 h-3.5 w-3.5 rounded-full bg-brand-600 ring-4 ring-white" />
                        <div className="text-xs">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-text-main">
                              {event.label}
                            </span>
                            <span className="text-text-caption">
                              {event.timestamp}
                            </span>
                          </div>
                          <p className="mt-0.5 text-text-muted leading-relaxed">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submitted Availability & Message */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                  <div className="rounded-lg bg-surface-subtle p-3 space-y-1">
                    <span className="font-semibold text-text-caption uppercase tracking-wider">
                      Stated Availability
                    </span>
                    <p className="text-text-main font-medium">{app.availability}</p>
                  </div>
                  <div className="rounded-lg bg-surface-subtle p-3 space-y-1">
                    <span className="font-semibold text-text-caption uppercase tracking-wider">
                      Submitted Note
                    </span>
                    <p className="text-text-muted italic line-clamp-2">
                      &ldquo;{app.coverNote}&rdquo;
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
