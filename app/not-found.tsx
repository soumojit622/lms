import Link from "next/link";
import { Ghost, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/40 via-background to-muted/20 px-6 py-24">
      {/* Glass Card */}
      <div className="w-full max-w-xl rounded-2xl border border-border bg-background/80 shadow-xl backdrop-blur-lg p-10 text-center space-y-8 animate-fadeIn">
        {/* Icon */}
        <div className="flex justify-center">
          <Ghost className="h-16 w-16 text-primary animate-float" />
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            Lost in Learning?
          </h1>
          <p className="mt-2 text-muted-foreground text-sm sm:text-base">
            Looks like the page you're looking for doesn't exist.
          </p>
        </div>

        {/* Suggestions */}
        <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
          <p>Here are a few things you can do:</p>
          <ul className="list-disc list-inside text-left max-w-md mx-auto">
            <li>Double-check the URL for typos.</li>
            <li>Return to the homepage to explore courses and tools.</li>
            <li>
              Need help?{" "}
              <a
                href="mailto:support@thinklab.com"
                className="text-primary underline hover:text-primary/80"
              >
                Contact our support team
              </a>
              .
            </li>
          </ul>
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary text-white px-5 py-2.5 text-sm font-medium transition hover:bg-primary/90 shadow-md"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
