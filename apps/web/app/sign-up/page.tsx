"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemo } from "@/lib/context/demo-context";
import { UserRole } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  HeartHandshake,
  User,
  Building2,
  Heart,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function SignUpPage() {
  const router = useRouter();
  const { switchRole, currentUser } = useDemo();
  const [selectedRole, setSelectedRole] = useState<UserRole>("caregiver");
  const [step, setStep] = useState<1 | 2>(1);

  // Common Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("San Francisco Bay Area, CA");

  // Caregiver Specific
  const [cnaLicense, setCnaLicense] = useState("CNA-Pending");
  const [yearsExperience, setYearsExperience] = useState("3");
  const [careSkills, setCareSkills] = useState("Memory Care, Hoyer Lift, Vitals");

  // Business Owner Specific
  const [orgName, setOrgName] = useState("");
  const [orgType, setOrgType] = useState("Memory Care Community");
  const [bedCapacity, setBedCapacity] = useState("64");

  // Volunteer Specific
  const [interests, setInterests] = useState("Storytelling, Board Games, Dining Companion");
  const [availability, setAvailability] = useState("Saturday mornings (9am - 1pm)");

  // Student Specific
  const [schoolName, setSchoolName] = useState("Bay Area School of Nursing");
  const [programYear, setProgramYear] = useState("3rd Year BSN");

  const roles = [
    {
      role: "caregiver" as UserRole,
      title: "Caregiver / CNA",
      subtitle: "Find verified residential shifts with transparent compensation.",
      icon: User,
    },
    {
      role: "business_owner" as UserRole,
      title: "Facility / Community",
      subtitle: "Post shifts and review verified caregiver credentials.",
      icon: Building2,
    },
    {
      role: "volunteer" as UserRole,
      title: "Community Volunteer",
      subtitle: "Support senior residents through social recreation and dining programs.",
      icon: Heart,
    },
    {
      role: "student" as UserRole,
      title: "Nursing Student",
      subtitle: "Gain supervised clinical hours in gerontology and post-acute care.",
      icon: GraduationCap,
    },
  ];

  const handleRoleSelection = (role: UserRole) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleCompleteOnboarding = (e: React.FormEvent) => {
    e.preventDefault();

    // Dynamically update active demo user details
    switchRole(selectedRole);
    if (fullName) currentUser.fullName = fullName;
    if (email) currentUser.email = email;
    if (location) currentUser.location = location;

    if (selectedRole === "business_owner" && orgName) {
      currentUser.headline = `Director • ${orgName}`;
    }

    router.push("/dashboard");
  };

  return (
    <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface-canvas">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 text-text-main hover:opacity-90 transition-opacity"
        >
          <div className="h-10 w-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-subtle">
            <HeartHandshake className="h-6 w-6" />
          </div>
          <span className="font-bold text-2xl tracking-tight">
            Care<span className="text-brand-600">Connect</span>
          </span>
        </Link>

        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-main pt-2">
          {step === 1 ? "Choose Your Account Pathway" : `Onboarding as ${roles.find(r => r.role === selectedRole)?.title}`}
        </h1>
        <p className="text-xs text-text-muted">
          {step === 1
            ? "Select your role in the healthcare and community care ecosystem."
            : "Complete your basic presentation profile to access your tailored workspace."}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl space-y-6">
        {step === 1 ? (
          /* Step 1: Role Selection */
          <div className="bg-white py-8 px-6 sm:px-8 shadow-card rounded-xl border border-surface-border space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {roles.map((item) => {
                const Icon = item.icon;
                const isSelected = selectedRole === item.role;
                return (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => handleRoleSelection(item.role)}
                    className={cn(
                      "flex flex-col text-left p-4 rounded-xl border transition-all hover:border-brand-300 hover:shadow-subtle group",
                      isSelected
                        ? "border-brand-600 bg-brand-50/50 ring-1 ring-brand-600"
                        : "border-surface-border bg-white"
                    )}
                  >
                    <div className="h-9 w-9 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center mb-3 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="font-bold text-sm text-text-main group-hover:text-brand-700 transition-colors">
                      {item.title}
                    </div>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-text-muted">
              <span>Already have an account?</span>
              <Link href="/sign-in" className="font-semibold text-brand-700 hover:underline">
                Sign In to Demo
              </Link>
            </div>
          </div>
        ) : (
          /* Step 2: Role-Specific Onboarding Form */
          <div className="bg-white py-8 px-6 sm:px-8 shadow-card rounded-xl border border-surface-border space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Step 2 of 2: Profile Setup
              </span>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-brand-700 hover:underline"
              >
                Change Role ({roles.find(r => r.role === selectedRole)?.title})
              </button>
            </div>

            <form onSubmit={handleCompleteOnboarding} className="space-y-4">
              {/* Common Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="e.g. Eleanor Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <Input
                  label="Work Email"
                  type="email"
                  placeholder="e.g. e.vance@example.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Input
                label="City / Metro Area"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />

              {/* Role-Specific Fields */}
              {selectedRole === "caregiver" && (
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="CNA License / Certification #"
                      value={cnaLicense}
                      onChange={(e) => setCnaLicense(e.target.value)}
                      placeholder="e.g. CNA-98214"
                    />
                    <Input
                      label="Years in Senior / Memory Care"
                      type="number"
                      value={yearsExperience}
                      onChange={(e) => setYearsExperience(e.target.value)}
                    />
                  </div>
                  <Input
                    label="Primary Care Skills"
                    value={careSkills}
                    onChange={(e) => setCareSkills(e.target.value)}
                    placeholder="e.g. Hoyer Lift, Vitals, Alzheimer's Support"
                  />
                </div>
              )}

              {selectedRole === "business_owner" && (
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Facility / Community Name"
                      placeholder="e.g. Magnolia Heights Senior Living"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      required
                    />
                    <Input
                      label="Licensed Bed Capacity"
                      value={bedCapacity}
                      onChange={(e) => setBedCapacity(e.target.value)}
                      placeholder="e.g. 84 Beds"
                    />
                  </div>
                  <Select
                    label="Facility Category"
                    value={orgType}
                    onChange={(e) => setOrgType(e.target.value)}
                    options={[
                      { label: "Memory Care Community", value: "Memory Care Community" },
                      { label: "Assisted Living Residence", value: "Assisted Living Residence" },
                      { label: "Adult Day Wellness Center", value: "Adult Day Wellness Center" },
                      { label: "Hospice & Palliative Care", value: "Hospice & Palliative Care" },
                    ]}
                  />
                </div>
              )}

              {selectedRole === "volunteer" && (
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <Input
                    label="Volunteer Areas of Interest"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    placeholder="e.g. Reading, Chess, Meal Companion, Bingo"
                  />
                  <Input
                    label="General Availability"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    placeholder="e.g. Weekends, Alternate Friday afternoons"
                  />
                </div>
              )}

              {selectedRole === "student" && (
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Nursing School / University"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="e.g. State Nursing Academy"
                    />
                    <Input
                      label="Degree & Academic Term"
                      value={programYear}
                      onChange={(e) => setProgramYear(e.target.value)}
                      placeholder="e.g. BSN - 3rd Year"
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Button type="button" variant="outline" size="md" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="submit" variant="primary" size="md" className="gap-2 font-semibold">
                  Complete Onboarding & Enter Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
