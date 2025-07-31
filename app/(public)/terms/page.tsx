import {
  Ban,
  Copyright,
  ScrollText,
  ShieldCheck,
  User,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const termsContent = [
  {
    title: " Introduction",
    text: "Welcome to ThinkLab. These Terms of Service govern your use of our platform. By using ThinkLab, you agree to these terms. Please read them carefully.",
    icon: <ScrollText className="h-5 w-5 text-primary" />,
  },
  {
    title: " Use of the Platform",
    text: "You agree to use ThinkLab only for lawful and respectful purposes. Misuse of any kind may result in access restriction or account suspension.",
    icon: <ShieldCheck className="h-5 w-5 text-primary" />,
  },
  {
    title: " User Accounts",
    text: "Account holders are responsible for maintaining confidentiality and agree to notify us immediately of any unauthorized access or suspicious activity.",
    icon: <User className="h-5 w-5 text-primary" />,
  },
  {
    title: " Intellectual Property",
    text: "All platform content, including branding, visuals, and code, is the intellectual property of ThinkLab or its licensors and may not be used without permission.",
    icon: <Copyright className="h-5 w-5 text-primary" />,
  },
  {
    title: " Termination",
    text: "We reserve the right to suspend or terminate accounts that breach our terms or violate applicable laws, without prior notice.",
    icon: <Ban className="h-5 w-5 text-primary" />,
  },
];

export const TermsPage = () => {
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
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated: July 30, 2025
        </p>
      </div>

      {/* Card Container */}
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-background/80 shadow-xl backdrop-blur-md p-8 sm:p-10 space-y-10">
        {termsContent.map((section, index) => (
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
            Questions or concerns?{" "}
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

export default TermsPage;
