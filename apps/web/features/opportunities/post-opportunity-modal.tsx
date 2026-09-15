"use client";

import React, { useState } from "react";
import { useDemo } from "@/lib/context/demo-context";
import { createOpportunity } from "@/lib/api/opportunities-api";
import { OpportunityCategory, CommitmentType } from "@/types/opportunity";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { CheckCircle2, Loader2 } from "lucide-react";

interface PostOpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpportunityCreated?: () => void;
}

export function PostOpportunityModal({
  isOpen,
  onClose,
  onOpportunityCreated,
}: PostOpportunityModalProps) {
  const { currentUser } = useDemo();
  const [title, setTitle] = useState("Weekend CNA Night Support Shift");
  const [category, setCategory] = useState<OpportunityCategory>("Memory Care");
  const [commitment, setCommitment] = useState<CommitmentType>("Per Diem");
  const [shiftHours, setShiftHours] = useState("11:00 PM - 7:30 AM");
  const [schedule, setSchedule] = useState("Friday & Saturday Nights");
  const [compensation, setCompensation] = useState("$28.00 - $31.00 / hr");
  const [spotsAvailable, setSpotsAvailable] = useState("2");
  const [description, setDescription] = useState(
    "Provide overnight personal comfort, vitals monitoring, and gentle redirection for memory care residents."
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createOpportunity({
        title,
        type: "caregiving",
        category,
        facilityId: currentUser.facilityId || "facility-01",
        facilityName: "BrightCare Senior Living & Memory Center",
        facilityLocation: currentUser.location || "Oakland, CA",
        description,
        responsibilities: [
          "Conduct peaceful hourly comfort checks and night hydration rounds.",
          "Provide gentle redirection for wandering or unsettled residents.",
          "Assist with early morning hygiene and breakfast prep escort.",
        ],
        requirements: [
          "Active California CNA certification.",
          "Minimum 6 months residential memory care experience.",
          "Clear background check and CPR/BLS certification.",
        ],
        schedule,
        shiftHours,
        commitment,
        compensation,
        spotsAvailable: parseInt(spotsAvailable) || 1,
      });

      setIsSubmitting(false);
      setSuccess(true);
      if (onOpportunityCreated) onOpportunityCreated();
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Post New Community Shift"
      description="Create an open shift listing for BrightCare Senior Living."
      maxWidth="lg"
    >
      {success ? (
        <div className="p-6 text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-base text-text-main">Shift Posted Successfully!</h3>
          <p className="text-xs text-text-muted">
            The shift is now live and visible to qualified caregivers in the discovery portal.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <Input
            label="Position / Shift Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g. Evening Memory Care CNA"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label="Care Category"
              value={category}
              onChange={(e) => setCategory(e.target.value as OpportunityCategory)}
              options={[
                { label: "Memory Care", value: "Memory Care" },
                { label: "Elderly Care", value: "Elderly Care" },
                { label: "Companion Care", value: "Companion Care" },
                { label: "Rehabilitation Support", value: "Rehabilitation Support" },
              ]}
            />

            <Select
              label="Commitment Type"
              value={commitment}
              onChange={(e) => setCommitment(e.target.value as CommitmentType)}
              options={[
                { label: "Per Diem / Shifts", value: "Per Diem" },
                { label: "Full-time", value: "Full-time" },
                { label: "Part-time", value: "Part-time" },
                { label: "Flexible Hours", value: "Flexible Hours" },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Shift Hours"
              value={shiftHours}
              onChange={(e) => setShiftHours(e.target.value)}
              required
              placeholder="e.g. 7:00 AM - 3:30 PM"
            />
            <Input
              label="Days / Rotation"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              required
              placeholder="e.g. Tuesday - Saturday"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Hourly Compensation"
              value={compensation}
              onChange={(e) => setCompensation(e.target.value)}
              required
              placeholder="e.g. $28.00 - $32.00 / hr"
            />
            <Input
              label="Open Spots"
              type="number"
              value={spotsAvailable}
              onChange={(e) => setSpotsAvailable(e.target.value)}
              required
            />
          </div>

          <Textarea
            label="Shift Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
          />

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                "Publish Shift Listing"
              )}
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  );
}
