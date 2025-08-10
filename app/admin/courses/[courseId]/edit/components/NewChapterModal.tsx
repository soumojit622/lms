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
import { Plus, BookOpen, Type, Save, XCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chapterSchema, ChapterSchemaType } from "@/lib/zodSchemas";
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
import { createChapter } from "../action";
import { toast } from "sonner";

export const NewChapterModal = ({ courseId }: { courseId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<ChapterSchemaType>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      name: "",
      courseId,
    },
  });

  const onSubmit = async (values: ChapterSchemaType) => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(createChapter(values));
      if (error) {
        toast.error("An unexpected error occurred. Please try again later.");
        return;
      }

      if (result.status === "success") {
        toast.success("Chapter created successfully");
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
        <Button variant="outline" size="sm" className="gap-2 font-medium">
          <Plus className="size-4" /> New Chapter
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[420px] p-6 rounded-xl">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            Create a New Chapter
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Give your chapter a meaningful name so it’s easy to recognize later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium flex items-center gap-1">
                    <Type className="size-4 text-muted-foreground" />
                    Chapter Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter chapter name"
                      {...field}
                      className="rounded-lg"
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="destructive"
                onClick={() => setIsOpen(false)}
                disabled={pending}
                className="gap-1"
              >
                <XCircle className="size-4" /> Cancel
              </Button>
              <Button type="submit" disabled={pending} className="gap-1">
                <Save className="size-4" />
                {pending ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
