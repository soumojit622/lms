import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { AlertTriangle, Loader2, Trash2, XCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteChapter } from "../action";

export const DeleteChapter = ({
  chapterId,
  courseId,
}: {
  chapterId: string;
  courseId: string;
}) => {
  const [Open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const onSubmit = async () => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        deleteChapter({
          chapterId: chapterId,
          courseId: courseId,
        })
      );

      if (error) {
        toast.error("An unexpected error occurred. Please try again later.");
        return;
      }

      if (result.status === "success") {
        toast.success("Chapter deleted successfully");
        setOpen(false);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  };

  return (
    <AlertDialog open={Open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <Trash2 className="size-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[400px]">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="size-5" />
            <AlertDialogTitle>Delete Chapter?</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-sm text-muted-foreground mt-2">
            This action <span className="font-semibold">cannot</span> be undone.
            This will permanently delete the chapter and all its related data.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className="hover:bg-gray-100">
            <XCircle className="size-4" />
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={onSubmit}
            disabled={pending}
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
          >
            {pending ? (
              <>
                <Loader2 className="animate-spin size-4" /> Deleting...
              </>
            ) : (
              <>
                <Trash2 className="size-4" /> Delete
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
