"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDemo } from "@/lib/context/demo-context";
import { getFeaturedOpportunities } from "@/lib/api/opportunities-api";
import { Opportunity } from "@/types/opportunity";
import { OpportunityCard } from "@/features/opportunities/opportunity-card";
import { ApplicationModal } from "@/features/opportunities/application-modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  HeartHandshake,
  Users,
  Building2,
  GraduationCap,
  Heart,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function LandingPage() {
  const { setIsSwitcherOpen, activeRole } = useDemo();
  const [featured, setFeatured] = useState<Opportunity[]>([]);
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getFeaturedOpportunities().then(setFeatured);
  }, []);

  const handleApplyClick = (opp: Opportunity) => {
    setSelectedOpp(opp);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ApplicationModal
        opportunity={selectedOpp}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-surface-border py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Healthcare & Community Care Connecting Platform</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-main leading-tight">
              Where Compassionate Caregivers Meet Trusted Communities
            </h1>

            <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl">
              Care Connect bridges licensed residential care facilities and community centers with certified CNAs, dedicated volunteers, and aspiring nursing students. Safe, verified, and community-centered.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link href="/opportunities">
                <Button size="lg" variant="primary" className="shadow-subtle">
                  Explore Open Shifts
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsSwitcherOpen(true)}
              >
                Launch Demo Role Switcher
              </Button>
            </div>

            {/* Credential highlights */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-100 text-xs text-text-muted">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Verified Facility Licensing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Background-Cleared Providers</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Flexible & Scheduled Shifts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Persona Pathways Grid */}
      <section className="py-14 sm:py-16 bg-surface-canvas border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl font-bold text-text-main tracking-tight">
              Designed for the Whole Care Ecosystem
            </h2>
            <p className="mt-1.5 text-sm text-text-muted leading-relaxed">
              Whether you are an experienced caregiver seeking fair shifts, a facility administrator staffing memory care units, or a student logging clinical hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Caregivers */}
            <div className="rounded-xl border border-surface-border bg-white p-6 shadow-card flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center mb-4">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-base text-text-main">
                  Certified Caregivers & CNAs
                </h3>
                <p className="mt-2 text-xs text-text-muted leading-relaxed">
                  Browse verified shifts with transparent pay rates, choose day or night rotations, and apply with your verified CNA credentials in seconds.
                </p>
              </div>
              <Link href="/opportunities?type=caregiving" className="mt-6 pt-4 border-t border-slate-100 block">
                <span className="text-xs font-semibold text-brand-700 hover:text-brand-900 flex items-center gap-1">
                  View Caregiver Shifts <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </div>

            {/* Business Owners / Facilities */}
            <div className="rounded-xl border border-surface-border bg-white p-6 shadow-card flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-base text-text-main">
                  Facilities & Administrators
                </h3>
                <p className="mt-2 text-xs text-text-muted leading-relaxed">
                  Post open residential shifts, review verified applicant licenses, and coordinate coverage without high agency recruiter overhead.
                </p>
              </div>
              <Link href="/dashboard" className="mt-6 pt-4 border-t border-slate-100 block">
                <span className="text-xs font-semibold text-brand-700 hover:text-brand-900 flex items-center gap-1">
                  Owner Dashboard <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </div>

            {/* Volunteers */}
            <div className="rounded-xl border border-surface-border bg-white p-6 shadow-card flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                  <Heart className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-base text-text-main">
                  Community Volunteers
                </h3>
                <p className="mt-2 text-xs text-text-muted leading-relaxed">
                  Bring joy through weekend storytelling, recreational games, and dining companions for neighborhood senior residents.
                </p>
              </div>
              <Link href="/opportunities?type=volunteer" className="mt-6 pt-4 border-t border-slate-100 block">
                <span className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1">
                  Find Volunteer Roles <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </div>

            {/* Students */}
            <div className="rounded-xl border border-surface-border bg-white p-6 shadow-card flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-base text-text-main">
                  Nursing & Health Students
                </h3>
                <p className="mt-2 text-xs text-text-muted leading-relaxed">
                  Gain hands-on clinical exposure in supervised gerontology and rehabilitation settings while fulfilling graduation requirements.
                </p>
              </div>
              <Link href="/opportunities?type=internship" className="mt-6 pt-4 border-t border-slate-100 block">
                <span className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1">
                  Student Internships <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Opportunities Preview */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-brand-700 mb-1">
                Immediate Openings
              </div>
              <h2 className="text-2xl font-bold text-text-main tracking-tight">
                Featured Care Opportunities
              </h2>
            </div>
            <Link href="/opportunities">
              <Button variant="outline" size="sm">
                View All Opportunities
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                onApplyClick={handleApplyClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Presentation Callout */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold tracking-tight text-white">
              Client Demonstration Prototype
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Explore the 4 complete demonstration journeys: Caregiver onboarding & shift booking, Business Owner shift management, Volunteer discovery, and simulated messaging.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setIsSwitcherOpen(true)}
              className="whitespace-nowrap"
            >
              Open Role Switcher
            </Button>
            <Link href="/dashboard">
              <Button
                variant="primary"
                size="md"
                className="bg-brand-500 hover:bg-brand-600 whitespace-nowrap"
              >
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
