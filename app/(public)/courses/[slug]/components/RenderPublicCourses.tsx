// components/RenderPublicCourses.tsx
import { PublicCourseCard } from "@/app/(public)/components/PublicCourseCard";
import { getAllCourses } from "@/app/data/course/get-all-courses";

export const RenderPublicCourses = async () => {
  const courses = await getAllCourses();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <PublicCourseCard key={course.id} data={course} />
      ))}
    </div>
  );
};
