import React from "react";
import Link from "next/link";
import { HeartHandshake, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <HeartHandshake className="h-4 w-4" />
              </div>
              <span className="font-bold text-base text-text-main">
                Care<span className="text-brand-600">Connect</span>
              </span>
            </div>
            <p className="text-sm text-text-muted max-w-sm leading-relaxed">
              Connecting licensed senior living communities, hospices, and care facilities with compassionate certified caregivers, student interns, and community volunteers.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Verified Care Providers & Certified Facilities</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/opportunities" className="text-text-muted hover:text-brand-600">
                  Find Opportunities
                </Link>
              </li>
              <li>
                <Link href="/applications" className="text-text-muted hover:text-brand-600">
                  Track Applications
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-text-muted hover:text-brand-600">
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-text-muted hover:text-brand-600">
                  Provider Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
              Prototype Notice
            </h4>
            <p className="text-xs text-text-caption leading-relaxed">
              This presentation prototype is running in demonstration mode with fictional sample data. Backend integration and live database synchronization are planned for subsequent phases.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-caption">
          <p>© 2026 Care Connect Platform. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Built with care for community health</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
