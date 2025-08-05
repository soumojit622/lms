import { cn } from "@/lib/utils";
import {
  CloudUpload,
  FileImage,
  Loader2,
  X,
  Video,
  FileWarning,
  FilePlus,
  RotateCcw,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export const RenderEmptyState = ({
  isDragActive,
}: {
  isDragActive: boolean;
}) => {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
        <CloudUpload
          className={cn(
            "size-6 text-muted-foreground",
            isDragActive && "text-primary"
          )}
        />
      </div>
      <p className="text-lg font-medium text-foreground">
        Drag and drop your files here, or{" "}
        <span className="cursor-pointer font-semibold text-primary underline underline-offset-4">
          click to upload
        </span>
      </p>
      <Button type="button" className="mt-4">
        <FilePlus className="size-4" />
        Select Files
      </Button>
    </div>
  );
};

export const RenderErrorState = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-destructive/10">
        <FileWarning className="size-6 text-destructive" />
      </div>
      <p className="text-lg font-semibold text-destructive">Upload Failed</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Something went wrong. Please try again.
      </p>
      <Button
        type="button"
        variant="destructive"
        className="mt-4"
        onClick={onRetry}
      >
        <RotateCcw className="size-4" />
        Retry File Selection
      </Button>
    </div>
  );
};

export const RenderUploadedState = ({
  previewUrl,
  isDeleting,
  handleRemoveFile,
  fileType,
}: {
  previewUrl: string;
  isDeleting: boolean;
  handleRemoveFile: () => void;
  fileType: "image" | "video";
}) => {
  return (
    <div className="relative group w-full h-full flex items-center justify-center overflow-hidden rounded-md border bg-muted">
      {fileType === "video" ? (
        <video
          src={previewUrl}
          controls
          className="h-full w-full rounded-md object-contain"
        />
      ) : (
        <Image
          src={previewUrl}
          alt="Uploaded preview"
          fill
          className="object-contain p-2"
        />
      )}
      <Button
        variant="destructive"
        size="icon"
        onClick={handleRemoveFile}
        disabled={isDeleting}
        className="absolute top-4 right-4 z-10 shadow-md"
      >
        {isDeleting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <X className="size-4" />
        )}
      </Button>
    </div>
  );
};

export const RenderUploadingState = ({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center rounded-md border bg-muted p-4">
      <div className="mb-2 rounded-full bg-primary/10 p-3">
        {file.type.startsWith("video") ? (
          <Video className="size-5 text-primary" />
        ) : (
          <FileImage className="size-5 text-primary" />
        )}
      </div>
      <p className="text-sm font-medium text-foreground">
        Uploading… {progress}%
      </p>
      <p className="mt-1 truncate text-xs text-muted-foreground max-w-xs">
        {file.name}
      </p>
    </div>
  );
};
