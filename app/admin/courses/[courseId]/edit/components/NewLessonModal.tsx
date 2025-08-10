import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { tryCatch } from "@/hooks/try-catch";
import { lessonSchema, LessonSchemaType } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen, Loader2, Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createLesson } from "../action";

export const NewLessonModal = ({
  courseId,
  chapterId,
}: {
  courseId: string;
  chapterId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<LessonSchemaType>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: "",
      courseId,
      chapterId,
    },
  });

  const onSubmit = async (values: LessonSchemaType) => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(createLesson(values));
      if (error) {
        toast.error("An unexpected error occurred. Please try again later.");
        return;
      }

      if (result.status === "success") {
        toast.success("Lesson created successfully");
        form.reset();
        setIsOpen(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) form.reset();
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-center gap-2 font-medium transition-all duration-300 hover:shadow-md"
        >
          <Plus className="size-4" /> New Lesson
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] rounded-xl shadow-lg border border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <BookOpen className="size-5 text-primary" />
            Create a New Lesson
          </DialogTitle>
          <DialogDescription>
            Give your lesson a name so it can be easily identified.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter lesson title"
                      {...field}
                      className="focus-visible:ring-2 focus-visible:ring-primary/60"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                disabled={pending}
                className="gap-2"
              >
                {pending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Plus className="size-4" /> Save Lesson
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
