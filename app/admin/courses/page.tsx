import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { EmptyState } from "@/components/general/EmptyState";
import {
  AdminCourseCard,
  AdminCourseCardSkeleton,
} from "./components/AdminCourseCard";
import { adminGetCourses } from "@/app/data/admin/admin-get-courses";
import { BookOpenCheck, PlusCircle } from "lucide-react";

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

export const RenderCourses = async () => {
  const data = await adminGetCourses();
  return (
    <>
      {data.length === 0 ? (
        <EmptyState
          title="No courses found"
          description="Create a new course to get started"
          buttonText="Create Course"
          href="/admin/courses/create"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
          {data.map((course) => (
            <AdminCourseCard key={course.id} data={course} />
          ))}
        </div>
      )}
    </>
  );
};

export const AdminCourseCardSkeletonLayout = async () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
      {Array.from({ length: 4 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  );
};
