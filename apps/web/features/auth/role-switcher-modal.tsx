"use client";

import React from "react";
import { useDemo } from "@/lib/context/demo-context";
import { Dialog } from "@/components/ui/dialog";
import { UserRole } from "@/types/user";
import { MOCK_USERS } from "@/lib/mock/users";
import { CheckCircle2, User, Building2, Heart, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function RoleSwitcherModal() {
  const { activeRole, switchRole, isSwitcherOpen, setIsSwitcherOpen } = useDemo();

  const roleOptions: {
    role: UserRole;
    icon: React.ElementType;
    badge: string;
    description: string;
  }[] = [
    {
      role: "caregiver",
      icon: User,
      badge: "Caregiver Journey (Flow 1)",
      description: "Browse certified CNA shifts, filter by schedule, apply with 1-click credentials.",
    },
    {
      role: "business_owner",
      icon: Building2,
      badge: "Business Owner Journey (Flow 2)",
      description: "Manage facility shifts, review incoming caregiver applicants, update statuses.",
    },
    {
      role: "volunteer",
      icon: Heart,
      badge: "Volunteer Journey (Flow 3)",
      description: "Find community weekend companion and dining recreation opportunities.",
    },
    {
      role: "student",
      icon: GraduationCap,
      badge: "Student Intern Journey",
      description: "Find supervised clinical hours, gerontology internships, and educational stipends.",
    },
  ];

  return (
    <Dialog
      isOpen={isSwitcherOpen}
      onClose={() => setIsSwitcherOpen(false)}
      title="Switch Demonstration Persona"
      description="Select any persona to immediately experience Care Connect from their perspective."
      maxWidth="lg"
    >
      <div className="grid gap-3 pt-2">
        {roleOptions.map((opt) => {
          const user = MOCK_USERS[opt.role];
          const isSelected = activeRole === opt.role;
          const Icon = opt.icon;

          return (
            <button
              key={opt.role}
              type="button"
              onClick={() => {
                switchRole(opt.role);
                setIsSwitcherOpen(false);
              }}
              className={cn(
                "flex items-start text-left gap-3.5 p-3.5 rounded-lg border transition-all text-sm",
                isSelected
                  ? "border-brand-600 bg-brand-50/50 ring-1 ring-brand-600"
                  : "border-surface-border bg-white hover:bg-surface-subtle"
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-md shrink-0 mt-0.5",
                  isSelected
                    ? "bg-brand-600 text-white"
                    : "bg-slate-100 text-slate-600"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-text-main flex items-center gap-1.5">
                    {user.fullName}
                    {user.isVerified && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    )}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {opt.badge}
                  </span>
                </div>
                <div className="text-xs text-brand-700 font-medium mt-0.5">
                  {user.headline}
                </div>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">
                  {opt.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </Dialog>
  );
}
