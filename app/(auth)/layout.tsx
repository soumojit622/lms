import { buttonVariants } from "@/components/ui/button";
import logo from "@/public/logo.png";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-muted px-4 py-10 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className:
            "absolute left-4 top-4 flex items-center gap-2 text-sm transition hover:shadow-sm",
        })}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      {/* Auth Box */}
      <div className="w-full max-w-md rounded-xl border bg-background p-8 shadow-md transition-all duration-300 sm:p-10">
        {/* Logo & Brand Name */}
        <Link
          href="/"
          className="mb-6 flex items-center justify-center gap-2 text-lg font-semibold tracking-tight text-foreground"
        >
          <Image
            src={logo}
            alt="ThinkLab logo"
            width={32}
            height={32}
            className="rounded-sm"
          />
          <span>ThinkLab</span>
        </Link>

        {/* Auth Form / Content */}
        <div className="space-y-6">{children}</div>

        {/* Terms and Privacy Notice */}
        <p className="mt-8 text-center text-xs text-muted-foreground leading-snug">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="text-foreground underline hover:text-primary transition-colors"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-foreground underline hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
