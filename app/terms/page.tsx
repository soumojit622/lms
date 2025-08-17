"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  Users,
  Lock,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const termsSections = [
  {
    icon: <FileText className="h-5 w-5 text-primary" />,
    title: "Acceptance of Terms",
    content:
      "By accessing or using our services, you agree to be bound by these Terms and Conditions. Please read them carefully.",
  },
  {
    icon: <Users className="h-5 w-5 text-primary" />,
    title: "User Responsibilities",
    content:
      "Users must provide accurate information, respect other users, and comply with all applicable laws and regulations while using our platform.",
  },
  {
    icon: <Lock className="h-5 w-5 text-primary" />,
    title: "Account Security",
    content:
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-primary" />,
    title: "Prohibited Activities",
    content:
      "Users are prohibited from engaging in fraudulent, illegal, or harmful activities, including hacking, spamming, or distributing malicious content.",
  },
  {
    icon: <BookOpen className="h-5 w-5 text-primary" />,
    title: "Content Ownership",
    content:
      "All content provided on the platform remains the property of its respective owners. Users are granted a limited license to access and use the content.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-primary" />,
    title: "Modifications",
    content:
      "We reserve the right to update or modify these Terms at any time. Continued use of the platform constitutes acceptance of any changes.",
  },
];

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/40 to-background py-16 px-6">
      <div className="max-w-4xl mx-auto relative">
        {/* Back to Home Button */}
        <div className="absolute top-0 left-0">
          <Link href="/" passHref>
            <Button variant="outline" className="flex items-center gap-2 mt-2">
              <ArrowLeft className="h-4 w-4" />
              Home
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground bg-muted/30 mb-4">
            Terms & Conditions
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Please read these terms carefully before using our platform. Your
            use of the services constitutes your agreement to these terms.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {termsSections.map((section, idx) => (
            <Card
              key={idx}
              className="bg-card border shadow-sm hover:shadow-lg transition-all"
            >
              <CardHeader className="flex items-center gap-3">
                {section.icon}
                <CardTitle className="text-lg font-semibold text-foreground">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                {section.content}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center border-t border-muted/30 pt-6 text-sm text-muted-foreground">
          <p>Last Updated: 16 August 2025</p>
          <p>© {new Date().getFullYear()} ThinkLab. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
