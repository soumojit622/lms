import {
  BookOpen,
  ChevronDownIcon,
  Home,
  LayoutDashboardIcon,
  LogOutIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSignout } from "@/hooks/use-signout";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface iAppProps {
  name: string;
  email: string;
  image: string;
}

export function UserDropdown({ name, email, image }: iAppProps) {
  const router = useRouter();
  const handleSignOut = useSignout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto px-2 py-1 flex items-center gap-2 hover:bg-muted/40 rounded-full transition-none"
        >
          <Avatar className="w-8 h-8 border">
            <AvatarImage src={image} alt="Profile image" />
            <AvatarFallback className="text-xs font-medium text-muted-foreground">
              {name[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="min-w-56 rounded-xl border border-border bg-popover shadow-xl p-2"
      >
        {/* Header */}
        <DropdownMenuLabel className="px-3 py-2 border-b border-muted text-left">
          <div className="space-y-0.5">
            <p className="text-sm font-semibold text-foreground truncate">
              {name}
            </p>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
        </DropdownMenuLabel>

        {/* Links */}
        <DropdownMenuGroup className="pt-2">
          <DropdownMenuItem asChild>
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted w-full text-sm text-foreground cursor-pointer"
            >
              <Home className="w-4 h-4 text-primary" />
              Home
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/courses"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted w-full text-sm text-foreground cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-primary" />
              Courses
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted w-full text-sm text-foreground cursor-pointer"
            >
              <LayoutDashboardIcon className="w-4 h-4 text-primary" />
              Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2" />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-500/10 text-sm font-medium cursor-pointer"
        >
          <LogOutIcon className="w-4 h-4 text-red-500" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
