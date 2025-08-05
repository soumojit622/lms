import { Ban, PlusCircle } from "lucide-react";
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
    <div className="flex flex-col items-center justify-center h-full text-center border border-dashed rounded-xl p-10 bg-muted/30 shadow-sm animate-in fade-in-50 space-y-6 transition-all">
      {/* Icon Circle */}
      <div className="flex items-center justify-center size-20 rounded-full bg-primary/10 border border-primary/20 shadow-inner">
        <Ban className="size-10 text-primary" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>

      {/* Description */}
      <p className="text-sm text-muted-foreground max-w-md">{description}</p>

      {/* Action Button */}
      <Link
        href={href}
        className={buttonVariants({ className: "gap-2 px-5 py-2.5 text-sm" })}
      >
        <PlusCircle className="size-4" />
        {buttonText}
      </Link>
    </div>
  );
};
