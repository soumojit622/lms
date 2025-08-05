import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeftIcon, ShieldX } from "lucide-react";
import Link from "next/link";

const BotAdminRoute = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4">
      <Card className="w-full max-w-md border-none shadow-2xl backdrop-blur-md bg-white/80 dark:bg-zinc-900/70">
        <CardHeader className="text-center space-y-6 pt-8">
          <div className="relative w-fit mx-auto">
            <div className="bg-red-500/10 p-5 rounded-full border border-destructive/30 shadow-md">
              <ShieldX className="size-12 text-destructive" />
            </div>
            <span className="absolute -top-2 -right-2 bg-destructive text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
              403
            </span>
          </div>

          <div className="space-y-1">
            <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
              Access Restricted
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
              You’re not authorized to view this page. Only admins have access
              to manage course content and features.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pb-8">
          <Link
            href="/"
            className={buttonVariants({
              className:
                "w-full flex items-center justify-center gap-2 bg-primary text-white hover:opacity-90",
            })}
          >
            <ArrowLeftIcon className="size-4" />
            Back to Home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default BotAdminRoute;
