"use client";

import { FolderKanban, Layers, ClipboardList, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProjectsPage = () => {
  return (
    <div className="min-h-[60vh] px-4 py-16 md:px-8 lg:px-12">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
          <FolderKanban className="h-3.5 w-3.5" />
          Projects
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px]">
            Coming Soon
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center justify-center gap-2">
          Manage Projects with Ease
          <Layers className="h-7 w-7" />
        </h1>

        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Our project management section is on the way. Soon you’ll be able to
          track, organize, and collaborate on projects all in one place.
        </p>
      </div>

      {/* Preview Grid */}
      <div className="mx-auto mt-10 max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Card key={idx} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
                Project {idx + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="h-3 w-28 rounded bg-muted animate-pulse" />
              <div className="h-3 w-40 rounded bg-muted animate-pulse" />
              <div className="h-3 w-20 rounded bg-muted animate-pulse" />
            </CardContent>
          </Card>
        ))}
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

export default ProjectsPage;
