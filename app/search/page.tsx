"use client";

import { Search, Filter, Sparkles, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SearchPage = () => {
  return (
    <div className="min-h-[60vh] px-4 py-16 md:px-8 lg:px-12">
      {/* Hero */}
      <div className="mx-auto max-w-3xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
          <Search className="h-3.5 w-3.5" />
          Smart Search
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px]">
            Coming soon
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center justify-center gap-2">
          Advanced Search
          <Filter className="h-7 w-7" />
        </h1>

        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          A powerful and intuitive search experience is on the way — with smart
          filters, suggestions, and lightning-fast results.
        </p>
      </div>

      {/* Preview Card */}
      <div className="mx-auto mt-10 max-w-3xl">
        <Card className="overflow-hidden">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Preview
            </CardTitle>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-4 w-4" />
              Under development
            </div>
          </CardHeader>
          <CardContent>
            {/* Faux search bar + results */}
            <div className="mb-4 h-10 w-full animate-pulse rounded-md bg-muted" />
            <div className="space-y-3">
              <div className="h-8 w-full animate-pulse rounded-md bg-muted" />
              <div className="h-8 w-5/6 animate-pulse rounded-md bg-muted" />
              <div className="h-8 w-4/6 animate-pulse rounded-md bg-muted" />
            </div>

            {/* CTA row */}
            <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                Stay tuned for smarter, faster search.
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" asChild>
                  <Link href="/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                  </Link>
                </Button>
                <Button>
                  <Search className="mr-2 h-4 w-4" />
                  Try Basic Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SearchPage;
