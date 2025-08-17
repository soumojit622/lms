"use client";

import { Settings, Sliders, Lock, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SettingsPage = () => {
  return (
    <div className="min-h-[60vh] px-4 py-16 md:px-8 lg:px-12">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
          <Settings className="h-3.5 w-3.5" />
          Settings
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px]">
            Coming Soon
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center justify-center gap-2">
          Personalize Your Experience
          <Sliders className="h-7 w-7" />
        </h1>

        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Powerful customization tools are on the way. Soon you’ll be able to
          manage preferences, security, and notifications all in one place.
        </p>
      </div>

      {/* Preview card */}
      <div className="mx-auto mt-10 max-w-2xl">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-muted-foreground" />
              Settings Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-10 w-3/4 animate-pulse rounded-md bg-muted" />
            <div className="h-10 w-1/2 animate-pulse rounded-md bg-muted" />
            <div className="h-10 w-2/3 animate-pulse rounded-md bg-muted" />
            <div className="mt-6 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Customization features are being crafted.
              </p>
              <Button variant="outline" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
