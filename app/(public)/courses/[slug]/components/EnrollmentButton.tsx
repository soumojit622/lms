"use client";

import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { Loader2, CheckCircle2, GraduationCap } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { enrollInCourseAction } from "../actions";

export const EnrollmentButton = ({ courseId }: { courseId: string }) => {
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        enrollInCourseAction(courseId)
      );
      if (error) {
        toast.error("An unexpected error occurred");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message, {
          icon: <CheckCircle2 className="text-green-500" />,
        });
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button
      className="w-full flex items-center justify-center gap-2 font-medium text-base rounded-xl transition-all duration-200"
      onClick={onSubmit}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="animate-spin size-5" />
          Enrolling...
        </>
      ) : (
        <>
          <GraduationCap className="size-5" />
          Enroll Now
        </>
      )}
    </Button>
  );
};
