import React from "react";
import {
  Lock,
  EyeOff,
  Database,
  UserCheck,
  FileWarning,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const privacyContent = [
  {
    title: " Data Collection",
    text: "We collect personal information such as your name, email, and usage data to provide a better learning experience on ThinkLab.",
    icon: <Database className="h-5 w-5 text-primary" />,
  },
  {
    title: " Data Usage",
    text: "Your information is used strictly to improve our services, personalize content, and ensure platform security. We do not sell your data.",
    icon: <UserCheck className="h-5 w-5 text-primary" />,
  },
  {
    title: " Cookies",
    text: "ThinkLab uses cookies to track sessions, manage user preferences, and enhance platform usability.",
    icon: <EyeOff className="h-5 w-5 text-primary" />,
  },
  {
    title: " Data Protection",
    text: "We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, or destruction.",
    icon: <Lock className="h-5 w-5 text-primary" />,
  },
  {
    title: " User Rights",
    text: "You have the right to access, update, or delete your personal data at any time. Please contact support for data requests.",
    icon: <FileWarning className="h-5 w-5 text-primary" />,
  },
];

export const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 via-background to-muted/20 py-24 px-6 sm:px-10 relative">
      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground hover:bg-muted transition-shadow shadow-sm"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      {/* Page Header */}
      <div className="mx-auto max-w-4xl text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: July 30, 2025
        </p>
      </div>

      {/* Card Container */}
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-background/80 shadow-xl backdrop-blur-md p-8 sm:p-10 space-y-10">
        {privacyContent.map((section, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2 text-xl font-semibold text-foreground">
              {section.icon}
              <h2>{section.title}</h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {section.text}
            </p>
          </div>
        ))}

        {/* Footer */}
        <div className="pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Questions about privacy?{" "}
            <a
              href="mailto:support@thinklab.com"
              className="text-primary underline hover:text-primary/80 transition-colors"
            >
              Contact support
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
