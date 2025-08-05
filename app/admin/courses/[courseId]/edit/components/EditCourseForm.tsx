"use client";

import { AdminCourseSingularType } from "@/app/data/admin/admin-get-course";
import { Uploader } from "@/components/file-uploader/Uploader";
import { RichTextEditor } from "@/components/rich-text-editor/Editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { tryCatch } from "@/hooks/try-catch";
import {
  courseCategories,
  courseLevels,
  courseSchema,
  CourseSchemaType,
  courseStatus,
} from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BadgeDollarSign,
  Clock3,
  FileText,
  GraduationCap,
  ImageIcon,
  Layers,
  Link2,
  ListChecks,
  Loader2,
  PlusIcon,
  Sparkles,
  Text,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { editCourse } from "../actions";

interface iAppProps {
  data: AdminCourseSingularType;
}

export const EditCourseForm = ({ data }: iAppProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema) as any,
    defaultValues: {
      title: data.title,
      description: data.description,
      filekey: data.filekey,
      price: data.price,
      duration: data.duration,
      level: data.level,
      category: data.category as CourseSchemaType["category"],
      status: data.status,
      slug: data.slug,
      smallDescription: data.smallDescription,
    },
  });

  const onSubmit = (values: CourseSchemaType) => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        editCourse(values, data.id)
      );

      if (error) {
        toast.error("An unexpected error occurred");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        form.reset();
        router.push("/admin/courses");
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <Text className="size-4" />
                Course Title
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter course title"
                  className="text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center gap-1">
                  <Link2 className="size-4" />
                  Slug
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Auto-generated slug"
                    className="text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            size="sm"
            className="h-10 mt-1 sm:mt-0"
            onClick={() => {
              const titleValue = form.getValues("title");
              const slug = slugify(titleValue);
              form.setValue("slug", slug, { shouldValidate: true });
            }}
          >
            Generate Slug
            <Sparkles className="ml-2 size-4" />
          </Button>
        </div>

        <FormField
          control={form.control}
          name="smallDescription"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="flex items-center gap-1">
                <FileText className="size-4 text-muted-foreground" />
                Small Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a short summary of the course..."
                  className="min-h-[120px] text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="flex items-center gap-1">
                <FileText className="size-4 text-muted-foreground" />
                Description
              </FormLabel>
              <FormControl>
                {/* Replace this with your actual rich text editor */}
                <RichTextEditor field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="filekey"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="flex items-center gap-1">
                <ImageIcon className="size-4 text-muted-foreground" />
                Thumbnail Image
              </FormLabel>
              <FormControl>
                <Uploader
                  onChange={field.onChange}
                  value={field.value}
                  fileTypeAccepted="image"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center gap-1">
                  <Layers className="size-4 text-muted-foreground" />
                  Category
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courseCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center gap-1">
                  <GraduationCap className="size-4 text-muted-foreground" />
                  Level
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courseLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center gap-1">
                  <Clock3 className="size-4 text-muted-foreground" />
                  Duration (hours)
                </FormLabel>
                <FormControl>
                  <Input placeholder="Duration" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="flex items-center gap-1">
                  <BadgeDollarSign className="size-4 text-muted-foreground" />
                  Price ($)
                </FormLabel>
                <FormControl>
                  <Input placeholder="Price" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="flex items-center gap-1">
                <ListChecks className="size-4 text-muted-foreground" />
                Status
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courseStatus.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              Saving...
              <Loader2 className="animate-spin ml-1" />
            </>
          ) : (
            <>
              Save Changes <PlusIcon className="ml-1" size={16} />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
