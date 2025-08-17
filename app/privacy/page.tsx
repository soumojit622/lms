"use client";

import React from "react";
import { ShieldCheck, User, Lock, Cpu, Mail, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const privacySections = [
  {
    icon: <User className="h-5 w-5 text-primary" />,
    title: "Information We Collect",
    content:
      "We may collect information such as your name, email address, contact details, and usage data when you use our services. This helps us improve your experience and provide personalized features.",
  },
  {
    icon: <Cpu className="h-5 w-5 text-primary" />,
    title: "How We Use Your Information",
    content:
      "Your data is used to deliver and enhance our services, communicate with you, send important updates, and ensure security. We never sell your personal data to third parties.",
  },
  {
    icon: <Lock className="h-5 w-5 text-primary" />,
    title: "Data Protection",
    content:
      "We implement strict security measures to safeguard your data. However, no method of transmission over the Internet or storage system is completely secure, and we cannot guarantee absolute protection.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-primary" />,
    title: "Cookies & Tracking",
    content:
      "We may use cookies and similar technologies to improve our website, analyze traffic, and provide a personalized experience. You can adjust your browser settings to disable cookies if you prefer.",
  },
  {
    icon: <Mail className="h-5 w-5 text-primary" />,
    title: "Your Rights",
    content:
      "You have the right to access, update, or delete your personal information. Please contact us if you wish to exercise any of these rights.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-primary" />,
    title: "Contact Us",
    content:
      "If you have any questions about this Privacy Policy or how we handle your data, please contact us at ",
    email: "mailto:soumojitbanerjee22@gmail.com",
  },
];

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/40 to-background py-16 px-6">
      <div className="max-w-4xl mx-auto">
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
            Privacy & Policy
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your personal information.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {privacySections.map((section, idx) => (
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
                {section.email && (
                  <a
                    href={section.email}
                    className="text-primary hover:underline ml-1"
                  >
                    soumojitbanerjee22@gmail.com
                  </a>
                )}
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

export default PrivacyPage;
