import { adminGetRecentCourses } from "@/app/data/admin/admin-get-recent-courses";
import { EmptyState } from "@/components/general/EmptyState";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import {
    AdminCourseCard,
    AdminCourseCardSkeleton,
} from "../courses/components/AdminCourseCard";

export const RenderRecentCourses = async () => {
  const data = await adminGetRecentCourses();
  if (data.length === 0) {
    return (
      <EmptyState
        buttonText="Create a new Course"
        description="You haven't created any courses yet. Create some to see them here."
        title="You dont have any Courses yet!"
        href="/admin/courses/create"
      />
    );
  }

  return (
    <div className="relative px-12">
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent>
          {data.map((course) => (
            <CarouselItem key={course.id} className="md:basis-1/2">
              <AdminCourseCard data={course} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export const RenderRecentCoursesSkeletonLayout = () => {
  return (
    <div className="relative px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <AdminCourseCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
