"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDemo } from "@/lib/context/demo-context";
import { UserRole } from "@/types/user";
import { MOCK_USERS } from "@/lib/mock/users";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  HeartHandshake,
  ShieldCheck,
  ArrowRight,
  User,
  Building2,
  Heart,
  GraduationCap,
  Sparkles,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function SignInPage() {
  const router = useRouter();
  const { switchRole } = useDemo();
  const [selectedRole, setSelectedRole] = useState<UserRole>("caregiver");
  const [email, setEmail] = useState("sarah.mitchell@demo-careconnect.org");
  const [password, setPassword] = useState("••••••••••••");
  const [isLoading, setIsLoading] = useState(false);

  const demoAccounts = [
    {
      role: "caregiver" as UserRole,
      name: "Sarah Mitchell",
      title: "Certified Nursing Assistant (CNA)",
      email: "sarah.mitchell@demo-careconnect.org",
      icon: User,
      badge: "Caregiver Journey",
    },
    {
      role: "business_owner" as UserRole,
      name: "Michael Vance",
      title: "Executive Director • BrightCare Senior Living",
      email: "michael.vance@brightcare-demo.org",
      icon: Building2,
      badge: "Business Owner Journey",
    },
    {
      role: "volunteer" as UserRole,
      name: "Daniel Carter",
      title: "Community Volunteer Companion",
      email: "daniel.carter@demo-careconnect.org",
      icon: Heart,
      badge: "Volunteer Journey",
    },
    {
      role: "student" as UserRole,
      name: "Emily Johnson",
      title: "BSN Nursing Student Intern",
      email: "emily.johnson@demo-bayarea-nursing.edu",
      icon: GraduationCap,
      badge: "Student Intern Journey",
    },
  ];

  const handleRoleSelect = (account: typeof demoAccounts[0]) => {
    setSelectedRole(account.role);
    setEmail(account.email);
    setPassword("demo-presentation-pass");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate instant demo sign-in
    setTimeout(() => {
      switchRole(selectedRole);
      router.push("/dashboard");
    }, 200);
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
          Sign In to Care Connect
        </h1>
        <p className="text-xs text-text-muted">
          Select a demonstration persona below for instant 1-click access.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg space-y-6">
        {/* Notice Banner */}
        <div className="rounded-lg bg-amber-50/80 border border-amber-200 p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
          <Info className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <strong className="font-semibold block">Presentation Demonstration Notice</strong>
            <span>
              This is a prototype authentication experience with mock roles. No real credentials are required or stored.
            </span>
          </div>
        </div>

        <div className="bg-white py-8 px-6 sm:px-8 shadow-card rounded-xl border border-surface-border space-y-6">
          {/* Quick Demo Account Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2.5">
              1. Choose Demonstration Persona
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {demoAccounts.map((acc) => {
                const isSelected = selectedRole === acc.role;
                const Icon = acc.icon;
                return (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => handleRoleSelect(acc)}
                    className={cn(
                      "flex items-start text-left gap-2.5 p-3 rounded-lg border text-xs transition-all",
                      isSelected
                        ? "border-brand-600 bg-brand-50/50 ring-1 ring-brand-600"
                        : "border-surface-border hover:bg-surface-subtle"
                    )}
                  >
                    <div
                      className={cn(
                        "p-1.5 rounded shrink-0 mt-0.5",
                        isSelected ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-text-main truncate">
                        {acc.name}
                      </div>
                      <div className="text-[11px] text-text-muted truncate">
                        {acc.badge}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-text-caption font-medium">
                2. Confirm Credentials
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Demo Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              helperText="Any password works in this presentation prototype"
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-text-muted flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Demo verified credentials attached
              </span>
              <Link href="/sign-up" className="text-brand-700 hover:underline font-medium">
                Need to create an account?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center text-sm font-semibold shadow-subtle"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : `Sign In as ${MOCK_USERS[selectedRole].fullName}`}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="text-center text-xs text-text-muted">
          <span>New to Care Connect? </span>
          <Link href="/sign-up" className="font-semibold text-brand-700 hover:underline">
            Experience the Role Onboarding Flow
          </Link>
        </div>
      </div>
    </div>
  );
}
