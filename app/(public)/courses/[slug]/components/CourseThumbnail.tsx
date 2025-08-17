"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { IconChartBar, IconCategory, IconClock } from "@tabler/icons-react";
import { useConstructUrl } from "@/hooks/use-construct-url";

interface Props {
  filekey: string;
  level: string;
  category: string;
  duration: number;
  title: string;
}

export function CourseThumbnail({
  filekey,
  level,
  category,
  duration,
  title,
}: Props) {
  const thumbnailUrl = useConstructUrl(filekey);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl">
      <Image
        src={thumbnailUrl}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
        <Badge className="px-3 py-1 rounded-full shadow-md">
          <IconChartBar className="size-4" />
          <span>{level}</span>
        </Badge>
        <Badge className="px-3 py-1 rounded-full shadow-md">
          <IconCategory className="size-4" />
          <span>{category}</span>
        </Badge>
        <Badge className="px-3 py-1 rounded-full shadow-md">
          <IconClock className="size-4" />
          <span>{duration}h</span>
        </Badge>
      </div>
    </div>
  );
}
