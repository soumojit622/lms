import { EmptyState } from "@/components/general/EmptyState";
import { PublicCourseCard } from "../(public)/components/PublicCourseCard";
import { getAllCourses } from "../data/course/get-all-courses";
import { getEnrolledCourses } from "../data/user/get-enrolled-courses";
import { CourseProgressCard } from "./components/CourseProgressCard";

const DashboardPage = async () => {
  const [courses, enrolledCourses] = await Promise.all([
    getAllCourses(),
    getEnrolledCourses(),
  ]);

  const availableCourses = courses.filter(
    (course) =>
      !enrolledCourses.some(({ Course: enrolled }) => enrolled.id === course.id)
  );

  return (
    <div className="space-y-16">
      {/* Enrolled Section */}
      <section>
        <div className="mb-14 space-y-6 text-left">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Enrolled Courses
            </h1>
          </div>

          <div className="flex items-start gap-3">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Access and track your purchased courses.
            </p>
          </div>
        </div>

        {enrolledCourses.length === 0 ? (
          <EmptyState
            title="No Courses Purchased"
            description="You haven’t enrolled in any courses yet. Start learning by browsing available courses."
            buttonText="Browse Courses"
            href="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <CourseProgressCard key={course.Course.id} data={course} />
            ))}
          </div>
        )}
      </section>

      {/* Divider */}
      <div className="border-t border-muted" />

      {/* Available Section */}
      <section>
        <div className="mb-14 space-y-6 text-left">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Available Courses
            </h1>
          </div>

          <div className="flex items-start gap-3">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Browse new courses and expand your skills.
            </p>
          </div>
        </div>

        {availableCourses.length === 0 ? (
          <EmptyState
            title="No Courses Available"
            description="Looks like you’ve purchased all the available courses. Check back later for more!"
            buttonText="Browse Courses"
            href="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map((course) => (
              <PublicCourseCard key={course.id} data={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;
