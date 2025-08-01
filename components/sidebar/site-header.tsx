import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "../ModeToggle";

export function SiteHeader() {
  return (
    <header className="flex h-14 items-center border-b bg-background px-4 lg:px-6 shadow-sm">
      <div className="flex w-full items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

        <Separator
          orientation="vertical"
          className="h-6 w-px bg-muted-foreground/20 mx-2"
        />

        <h1 className="text-lg font-semibold tracking-tight text-foreground">
          ThinkLab
        </h1>

        <div className="ml-auto flex items-center space-x-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
