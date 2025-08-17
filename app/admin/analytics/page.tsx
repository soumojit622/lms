"use client";

import { BarChart3, PieChart, Activity, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AnalyticsPage = () => {
  return (
    <div className="min-h-[60vh] px-4 py-16 md:px-8 lg:px-12">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
          <BarChart3 className="h-3.5 w-3.5" />
          Analytics
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px]">
            Coming Soon
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center justify-center gap-2">
          Powerful Insights Await
          <PieChart className="h-7 w-7" />
        </h1>

        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Our analytics dashboard is on the way. Soon you’ll be able to view
          detailed stats, track progress, and make data-driven decisions with
          ease.
        </p>
      </div>

      {/* Preview Analytics Skeleton */}
      <div className="mx-auto mt-10 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4 text-muted-foreground" />
              Realtime Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-24 w-full rounded bg-muted animate-pulse" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <PieChart className="h-4 w-4 text-muted-foreground" />
              Traffic Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-24 w-full rounded bg-muted animate-pulse" />
          </CardContent>
        </Card>
      </div>

      {/* Back Button */}
      <div className="mt-8 flex justify-center">
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsPage;
