"use client";

import React, { useState } from "react";
import { useDemo } from "@/lib/context/demo-context";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog } from "@/components/ui/dialog";
import {
  User,
  ShieldCheck,
  Award,
  Clock,
  MapPin,
  Mail,
  Phone,
  Edit3,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function ProfilePage() {
  const { currentUser, switchRole, setIsSwitcherOpen } = useDemo();
  const [isEditing, setIsEditing] = useState(false);
  const [headline, setHeadline] = useState(currentUser.headline);
  const [bio, setBio] = useState(currentUser.bio);
  const [phone, setPhone] = useState(currentUser.phone || "");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    currentUser.headline = headline;
    currentUser.bio = bio;
    currentUser.phone = phone;
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="py-8 sm:py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Edit Profile Dialog */}
      <Dialog
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Profile Information"
        description="Update your public caregiver credentials and contact information."
      >
        <form onSubmit={handleSave} className="space-y-4 pt-2">
          <Input
            label="Professional Headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            required
          />
          <Textarea
            label="Personal Bio & Care Philosophy"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            required
          />
          <Input
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Changes
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Success Alert */}
      {savedSuccess && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Profile details updated successfully for this session.</span>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="rounded-xl border border-surface-border bg-white p-6 sm:p-8 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-full bg-brand-100 border-2 border-brand-300 flex items-center justify-center text-brand-700 font-bold text-xl shrink-0">
              {currentUser.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-text-main">
                  {currentUser.fullName}
                </h1>
                {currentUser.isVerified && (
                  <Badge variant="success" className="gap-1 text-[11px]">
                    <ShieldCheck className="h-3 w-3" />
                    Verified Provider
                  </Badge>
                )}
              </div>
              <p className="text-sm font-medium text-brand-700">
                {currentUser.headline}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted pt-1">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  <span>{currentUser.location}</span>
                </div>
                {currentUser.yearsExperience && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{currentUser.yearsExperience} Years Experience</span>
                  </div>
                )}
                <div className="flex items-center gap-1 capitalize">
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  <span>Role: {currentUser.role.replace("_", " ")}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="gap-1.5 text-xs"
            >
              <Edit3 className="h-3.5 w-3.5" />
              Edit Profile
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsSwitcherOpen(true)}
              className="text-xs"
            >
              Switch Persona
            </Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 text-xs">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-surface-subtle border border-slate-200">
            <Mail className="h-4 w-4 text-slate-400 shrink-0" />
            <div>
              <span className="text-text-caption block font-medium">Email</span>
              <span className="font-semibold text-text-main">{currentUser.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-surface-subtle border border-slate-200">
            <Phone className="h-4 w-4 text-slate-400 shrink-0" />
            <div>
              <span className="text-text-caption block font-medium">Phone</span>
              <span className="font-semibold text-text-main">{currentUser.phone || "Not set"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Bio */}
          <Card>
            <CardHeader className="pb-3">
              <h3 className="font-bold text-base text-text-main">
                About & Care Philosophy
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-text-muted leading-relaxed">
                {currentUser.bio}
              </p>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader className="pb-3">
              <h3 className="font-bold text-base text-text-main flex items-center gap-2">
                <Award className="h-4 w-4 text-brand-600" />
                Verified Licenses & Certifications
              </h3>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {currentUser.certifications.map((cert, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 text-xs"
                >
                  <div className="flex items-center gap-2 font-medium text-text-main">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{cert}</span>
                  </div>
                  <span className="text-emerald-700 font-semibold text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                    Active
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Skills & Preferences Sidebar */}
        <div className="space-y-6">
          {/* Skills */}
          <Card>
            <CardHeader className="pb-3">
              <h3 className="font-bold text-base text-text-main flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brand-600" />
                Clinical & Care Skills
              </h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {currentUser.skills.map((skill, i) => (
                  <Badge key={i} variant="primary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preferred Commitment */}
          <Card>
            <CardHeader className="pb-3">
              <h3 className="font-bold text-base text-text-main">
                Shift Preferences
              </h3>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-text-muted">Commitment:</span>
                <span className="font-semibold text-text-main capitalize">
                  {currentUser.preferredCommitment?.join(", ") || "Flexible"}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-text-muted">Facility Vetting:</span>
                <span className="font-semibold text-emerald-700">Level 2 Cleared</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-text-muted">Status:</span>
                <span className="font-semibold text-emerald-700">Available for Shifts</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
