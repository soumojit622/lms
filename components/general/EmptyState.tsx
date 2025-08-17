import { Ban, Search } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

interface iAppProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export const EmptyState = ({
  title,
  description,
  buttonText,
  href,
}: iAppProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center border border-dashed rounded-2xl p-12 bg-muted/30 shadow-sm animate-in fade-in-50 space-y-6 transition-all hover:shadow-md">
      {/* Icon Circle */}
      <div className="flex items-center justify-center size-20 rounded-full bg-background border shadow-inner ring-2 ring-primary/30">
        <Ban className="size-10 text-primary" />
      </div>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>

      {/* Description */}
      <p className="text-sm md:text-base text-muted-foreground max-w-md leading-relaxed">
        {description}
      </p>

      {/* Action Button */}
      <Link
        href={href}
        className={buttonVariants({
          className: "gap-2 px-6 py-2.5 text-sm rounded-lg",
        })}
      >
        <Search className="size-4" />
        {buttonText}
      </Link>
    </div>
  );
};
