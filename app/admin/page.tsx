import { SectionCards } from "@/components/sidebar/section-cards";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function AdminIndexPage() {
  return (
    <>
      <SectionCards />

      {/* <ChartAreaInteractive data={enrollmentData} /> */}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Courses</h2>
          <Link
            className={buttonVariants({
              variant: "outline",
            })}
            href="/admin/courses"
          >
            View All Courses
          </Link>
        </div>

        {/* <Suspense fallback={<RenderRecentCoursesSkeletonLayout />}>
          <RenderRecentCourses />
        </Suspense> */}
      </div>
    </>
  );
}
