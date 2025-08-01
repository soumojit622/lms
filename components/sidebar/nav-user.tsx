"use client";

import {
  IconDashboard,
  IconDotsVertical,
  IconLogout,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { Home, Tv2 } from "lucide-react";
import Link from "next/link";
import { useSignout } from "@/hooks/use-signout";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data: session, isPending } = authClient.useSession();
  const handleSignOut = useSignout();

  if (isPending) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="gap-3 px-3 py-2 rounded-lg transition-none data-[state=open]:bg-muted/60"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={
                    session?.user.image ??
                    `https://avatar.vercel.sh/${session?.user.email}`
                  }
                  alt={session?.user.name ?? "User Avatar"}
                />
                <AvatarFallback className="rounded-lg text-xs font-semibold">
                  {session?.user.name
                    ? session.user.name[0]?.toUpperCase()
                    : (session?.user.email?.[0]?.toUpperCase() ?? "U")}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col text-left leading-tight text-sm">
                <span className="truncate font-medium text-foreground">
                  {session?.user.name?.length
                    ? session.user.name
                    : session?.user.email.split("@")[0]}
                </span>
                <span className="truncate text-muted-foreground text-xs">
                  {session?.user.email}
                </span>
              </div>

              <IconDotsVertical className="ml-auto h-4 w-4 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-56 rounded-xl border border-border bg-popover p-2 shadow-xl"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={6}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 px-3 py-2">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={
                      session?.user.image ??
                      `https://avatar.vercel.sh/${session?.user.email}`
                    }
                    alt={session?.user.name ?? "User Avatar"}
                  />
                  <AvatarFallback className="rounded-lg text-xs font-semibold">
                    {session?.user.name
                      ? session.user.name[0]?.toUpperCase()
                      : (session?.user.email?.[0]?.toUpperCase() ?? "U")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col truncate text-sm leading-tight">
                  <span className="truncate font-medium text-foreground">
                    {session?.user.name?.length
                      ? session.user.name
                      : session?.user.email.split("@")[0]}
                  </span>
                  <span className="truncate text-muted-foreground text-xs">
                    {session?.user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuItem asChild>
                <Link
                  href="/"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                >
                  <Home className="h-4 w-4 text-primary" />
                  Homepage
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/admin"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                >
                  <IconDashboard className="h-4 w-4 text-primary" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/admin/courses"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                >
                  <Tv2 className="h-4 w-4 text-primary" />
                  Courses
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleSignOut}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-500/10 text-sm font-medium cursor-pointer"
            >
              <IconLogout className="h-4 w-4 text-red-500" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
