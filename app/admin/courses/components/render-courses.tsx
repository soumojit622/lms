import { EmptyState } from "@/components/general/EmptyState";

import { adminGetCourses } from "@/app/data/admin/admin-get-courses";
import { AdminCourseCard, AdminCourseCardSkeleton } from "./AdminCourseCard";

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

export const AdminCourseCardSkeletonLayout = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
      {Array.from({ length: 4 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  );
};
