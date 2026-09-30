"use client";

import React from "react";
import Link from "next/link";
import { Opportunity } from "@/types/opportunity";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/feedback/status-badge";
import { MapPin, Clock, Building2, Calendar, ArrowRight, DollarSign } from "lucide-react";

interface OpportunityCardProps {
  opportunity: Opportunity;
  onApplyClick?: (opp: Opportunity) => void;
}

export function OpportunityCard({ opportunity, onApplyClick }: OpportunityCardProps) {
  const typeBadgeVariant = {
    caregiving: "primary",
    volunteer: "success",
    internship: "default",
  }[opportunity.type] as "primary" | "success" | "default";

  return (
    <Card className="flex flex-col h-full hover:border-brand-300 transition-all duration-150">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="flex flex-wrap gap-1.5 items-center">
            <Badge variant={typeBadgeVariant} className="capitalize">
              {opportunity.type}
            </Badge>
            <Badge variant="outline">{opportunity.category}</Badge>
            {opportunity.isUrgent && <StatusBadge status="urgent" />}
          </div>
          <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2 py-1 rounded border border-brand-100 whitespace-nowrap">
            {opportunity.compensation}
          </span>
        </div>

        <Link
          href={`/opportunities/${opportunity.id}`}
          className="group focus-visible:outline-none"
        >
          <h4 className="font-semibold text-base sm:text-lg text-text-main group-hover:text-brand-600 transition-colors line-clamp-1">
            {opportunity.title}
          </h4>
        </Link>

        <div className="flex items-center gap-1.5 text-xs text-text-muted mt-1">
          <Building2 className="h-3.5 w-3.5 shrink-0 text-slate-400" />
          <span className="font-medium text-text-main truncate">{opportunity.facilityName}</span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <p className="text-xs sm:text-sm text-text-muted line-clamp-2 leading-relaxed mb-4">
          {opportunity.description}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs text-text-caption pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{opportunity.facilityLocation}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{opportunity.shiftHours}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{opportunity.schedule}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
            <span>{opportunity.spotsAvailable} spot{opportunity.spotsAvailable > 1 ? "s" : ""} open</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-slate-100 mt-auto flex items-center justify-between gap-2">
        <Link href={`/opportunities/${opportunity.id}`} className="w-1/2">
          <Button variant="outline" size="sm" className="w-full text-xs">
            View Details
          </Button>
        </Link>
        <div className="w-1/2">
          <Button
            variant="primary"
            size="sm"
            className="w-full text-xs"
            onClick={() => onApplyClick ? onApplyClick(opportunity) : null}
          >
            Apply Now
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
