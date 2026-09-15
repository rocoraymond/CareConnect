import type { Metadata } from "next";
import "./globals.css";
import { DemoProvider } from "@/lib/context/demo-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Care Connect | Healthcare & Community Care Connecting Platform",
  description:
    "Bridging professional caregivers, volunteers, students, and community care facilities with trust and ease.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-surface-canvas text-text-main flex flex-col min-h-screen">
        <DemoProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </DemoProvider>
      </body>
    </html>
  );
}
