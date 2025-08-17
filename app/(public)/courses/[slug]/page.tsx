import { getIndividualCourse } from "@/app/data/course/get-course";
import { checkifCourseBought } from "@/app/data/user/user-is-enrolled";
import { RenderDescription } from "@/components/rich-text-editor/RenderDescription";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import {
  IconBook,
  IconCategory,
  IconChartBar,
  IconChevronDown,
  IconClock,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { CourseThumbnail } from "./components/CourseThumbnail";
import { EnrollmentButton } from "./components/EnrollmentButton";

interface iAppProps {
  params: Promise<{
    slug: string;
  }>;
}

const SlugPage = async ({ params }: iAppProps) => {
  const { slug } = await params;

  const course = await getIndividualCourse(slug);

  // const thumbnailUrl = useConstructUrl(course.filekey);

  const isEnrolled = await checkifCourseBought(course.id);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-5">
      <div className="order-1 lg:col-span-2">
        {/* Thumbnail */}
        <CourseThumbnail
          filekey={course.filekey}
          level={course.level}
          category={course.category}
          duration={course.duration}
          title={course.title}
        />

        {/* Course Title + Description */}
        <div className="mt-10 space-y-5">
          <div className="space-y-3">
            <h1 className="text-5xl font-extrabold tracking-tight leading-snug">
              {course.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {course.smallDescription}
            </p>
          </div>

          <Separator className="my-6" />

          {/* Course Description */}
          <div className="space-y-5">
            <h2 className="text-3xl font-semibold tracking-tight">
              Course Description
            </h2>
            <RenderDescription json={JSON.parse(course.description)} />
          </div>
        </div>

        {/* Course Content */}
        <div className="mt-14 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold tracking-tight">
              Course Content
            </h2>
            <p className="text-muted-foreground text-sm">
              {course.chapter.length} chapters •{" "}
              {course.chapter.reduce(
                (total, chapter) => total + chapter.lessons.length,
                0
              ) || 0}{" "}
              lessons
            </p>
          </div>

          <div className="space-y-6">
            {course.chapter.map((chapter, index) => (
              <Collapsible key={chapter.id} defaultOpen={index === 0}>
                <Card className="p-0 overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300 rounded-xl">
                  <CollapsibleTrigger>
                    <CardContent className="p-6 hover:bg-muted/40 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold shadow-sm">
                            {index + 1}
                          </span>
                          <div>
                            <h3 className="text-xl font-semibold text-left">
                              {chapter.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {chapter.lessons.length} lesson
                              {chapter.lessons.length !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                        <IconChevronDown className="size-5 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180" />
                      </div>
                    </CardContent>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="border-t bg-muted/30">
                      <div className="p-6 pt-4 space-y-3">
                        {chapter.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-4 rounded-lg p-3 hover:bg-accent/40 transition-colors group"
                          >
                            <div className="flex size-8 items-center justify-center rounded-full bg-background border border-primary/30 group-hover:bg-primary/10 transition-colors">
                              <IconPlayerPlay className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">
                                {lesson.title}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Lesson {lessonIndex + 1}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>

      {/* Enrollment Card */}
      <div className="order-2 lg:col-span-1">
        <div className="sticky top-20">
          <Card className="shadow-md rounded-2xl overflow-hidden">
            <CardContent className="p-6 space-y-6">
              {/* Price Section */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Price</span>
                <span className="text-3xl font-bold tracking-tight text-primary">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(course.price)}
                </span>
              </div>

              {/* Benefits Overview */}
              <div className="rounded-xl bg-muted/50 p-5 space-y-4">
                <h4 className="font-semibold text-base">What you will get:</h4>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <IconClock className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Course Duration</p>
                      <p className="text-xs text-muted-foreground">
                        {course.duration} hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <IconChartBar className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Difficulty Level</p>
                      <p className="text-xs text-muted-foreground">
                        {course.level}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <IconCategory className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Category</p>
                      <p className="text-xs text-muted-foreground">
                        {course.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <IconBook className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Lessons</p>
                      <p className="text-xs text-muted-foreground">
                        {course.chapter.reduce(
                          (total, chapter) => total + chapter.lessons.length,
                          0
                        ) || 0}{" "}
                        Lessons
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h4 className="font-semibold text-base">
                  This course includes:
                </h4>
                <ul className="space-y-2">
                  {[
                    "Full lifetime access",
                    "Access on mobile and desktop",
                    "Certificate of completion",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <div className="rounded-full bg-green-500/10 text-green-600 p-1.5">
                        <CheckIcon className="size-3.5" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              {isEnrolled ? (
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    className:
                      "w-full text-center font-medium rounded-lg transition-all",
                  })}
                >
                  Watch Course
                </Link>
              ) : (
                <EnrollmentButton courseId={course.id} />
              )}

              {/* Guarantee */}
              <p className="text-center text-xs text-muted-foreground">
                30-day money-back guarantee
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SlugPage;
