"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDemo } from "@/lib/context/demo-context";
import { Button } from "@/components/ui/button";
import { RoleSwitcherModal } from "@/features/auth/role-switcher-modal";
import {
  HeartHandshake,
  Menu,
  X,
  UserCheck,
  ChevronDown,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function Navbar() {
  const pathname = usePathname();
  const { currentUser, setIsSwitcherOpen } = useDemo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Find Opportunities", href: "/opportunities" },
    { label: "My Applications", href: "/applications" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Profile", href: "/profile" },
  ];

  return (
    <>
      <RoleSwitcherModal />

      {/* Demo Banner */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-300">
              Demo Mode Active:
            </span>
            <span className="text-white font-semibold">
              {currentUser.fullName}
            </span>
            <span className="hidden sm:inline text-slate-400">
              ({currentUser.headline.split("•")[0]?.trim()})
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsSwitcherOpen(true)}
            className="flex items-center gap-1 font-semibold text-brand-300 hover:text-brand-200 underline text-xs"
          >
            <Layers className="h-3.5 w-3.5" />
            Switch Persona
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 w-full border-b border-surface-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-text-main hover:opacity-90 transition-opacity"
          >
            <div className="h-9 w-9 rounded-lg bg-brand-600 flex items-center justify-center text-white shadow-subtle">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none tracking-tight text-text-main">
                Care<span className="text-brand-600">Connect</span>
              </span>
              <span className="text-[10px] font-medium text-text-caption tracking-wide">
                HEALTHCARE & COMMUNITY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 rounded-md transition-colors",
                    isActive
                      ? "text-brand-700 bg-brand-50 font-semibold"
                      : "text-text-muted hover:text-text-main hover:bg-surface-subtle"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Role Switcher */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSwitcherOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-brand-200 bg-brand-50 text-brand-800 hover:bg-brand-100 transition-colors shadow-subtle"
            >
              <UserCheck className="h-3.5 w-3.5 text-brand-600" />
              <span>Role: <strong className="capitalize">{currentUser.role.replace('_', ' ')}</strong></span>
              <ChevronDown className="h-3 w-3 text-brand-600" />
            </button>

            <Link href="/dashboard">
              <Button size="sm" variant="primary">
                Open Dashboard
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setIsSwitcherOpen(true)}
              className="text-xs font-semibold px-2 py-1 rounded bg-brand-50 text-brand-700 border border-brand-200"
            >
              Demo Switch
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-text-muted hover:text-text-main hover:bg-surface-subtle"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-surface-border bg-white px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top duration-150">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2.5 rounded-md text-base font-medium",
                  pathname === link.href
                    ? "bg-brand-50 text-brand-700 font-semibold"
                    : "text-text-muted hover:bg-surface-subtle hover:text-text-main"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-surface-border mt-2 space-y-2">
              <Button
                variant="outline"
                size="md"
                className="w-full justify-center"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSwitcherOpen(true);
                }}
              >
                Switch Persona ({currentUser.role.replace('_', ' ')})
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
