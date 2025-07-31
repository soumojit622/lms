"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to Top"
      className={cn(
        "fixed cursor-pointer bottom-6 right-6 z-50 p-3 rounded-full shadow-xl transition-all duration-300",
        "bg-primary text-white dark:bg-primary dark:text-white",
        "hover:bg-primary/90 dark:hover:bg-primary/80",
        "backdrop-blur-md border border-white/20 dark:border-white/10",
        "ring-1 ring-primary/30 dark:ring-primary/40",
        "opacity-0 scale-95 pointer-events-none",
        isVisible && "opacity-100 scale-100 pointer-events-auto"
      )}
    >
      <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
    </button>
  );
};
