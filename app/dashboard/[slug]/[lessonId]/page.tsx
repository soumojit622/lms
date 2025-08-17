import { getLessonContent } from "@/app/data/course/get-lesson-content";
import { LessonSkeleton } from "./components/LessonSkeleton";
import { CourseContent } from "./components/CourseContent";
import { Suspense } from "react";

interface iAppProps {
  params: Promise<{
    lessonId: string;
  }>;
}

const LessonContentPage = async ({ params }: iAppProps) => {
  const { lessonId } = await params;

  return (
    <Suspense fallback={<LessonSkeleton />}>
      <LessonContentLoader lessonId={lessonId} />
    </Suspense>
  );
};

export default LessonContentPage;

const LessonContentLoader = async ({ lessonId }: { lessonId: string }) => {
  const data = await getLessonContent(lessonId);

  return <CourseContent data={data} />;
};
