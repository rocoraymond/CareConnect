import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeartHandshake, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto space-y-4">
      <div className="h-12 w-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center">
        <HeartHandshake className="h-6 w-6" />
      </div>
      <h2 className="text-2xl font-bold text-text-main">Page Not Found</h2>
      <p className="text-sm text-text-muted leading-relaxed">
        The page you are looking for is not part of this presentation prototype or has moved.
      </p>
      <div className="pt-2">
        <Link href="/">
          <Button variant="primary" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
