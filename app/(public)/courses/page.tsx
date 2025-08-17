// app/(public)/courses/page.tsx
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { RenderPublicCourses } from "./[slug]/components/RenderPublicCourses";

const PublicCoursesRoute = () => {
  return (
    <section className="mt-12 px-4 md:px-10">
      {/* Header Section */}
      <div className="mb-14 space-y-6 text-left">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Explore Courses
          </h1>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Browse our curated collection of courses designed to help you
          strengthen your skills, achieve your learning goals, and unlock new
          opportunities.
        </p>
      </div>

      {/* Courses Section */}
      <div className="relative">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          }
        >
          <RenderPublicCourses />
        </Suspense>
      </div>
    </section>
  );
};

export default PublicCoursesRoute;
