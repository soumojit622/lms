import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { BookOpenCheck, PlusCircle } from "lucide-react";
import { AdminCourseCardSkeletonLayout, RenderCourses } from "./components/render-courses";

const CoursesPage = () => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <BookOpenCheck className="text-primary" size={28} />
          <h1 className="text-2xl font-bold tracking-tight">Your Courses</h1>
        </div>

        <Link
          href="/admin/courses/create"
          className={buttonVariants({ variant: "default" })}
        >
          <PlusCircle className=" h-4 w-4" />
          Create Course
        </Link>
      </div>

      {/* Courses Section */}
      <Suspense fallback={<AdminCourseCardSkeletonLayout />}>
        <RenderCourses />
      </Suspense>
    </div>
  );
};

export default CoursesPage;
