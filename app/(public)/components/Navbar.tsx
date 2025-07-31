"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Home,
  LayoutDashboard,
  LogIn,
  Menu,
  UserPlus,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { UserDropdown } from "./UserDropdown";

const navigationItems = [
  { name: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
  { name: "Courses", href: "/courses", icon: <BookOpen className="w-4 h-4" /> },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
];

export const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border backdrop-blur-md bg-background/80 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt="ThinkLab Logo"
            width={36}
            height={36}
            className="object-contain transition-transform group-hover:scale-105"
          />
          <span className="text-2xl font-extrabold tracking-tight text-foreground transition-colors">
            Think<span className="text-primary">Lab</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />
          {!isPending &&
            (session ? (
              <UserDropdown />
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className={buttonVariants({
                    variant: "outline",
                    className:
                      "text-sm font-medium px-4 flex items-center gap-1",
                  })}
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className={buttonVariants({
                    className:
                      "text-sm font-semibold px-4 shadow-sm flex items-center gap-1",
                  })}
                >
                  <UserPlus className="w-4 h-4" />
                  Get Started
                </Link>
              </div>
            ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden inline-flex items-center justify-center p-2 text-muted-foreground hover:text-primary focus:outline-none"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-border bg-background shadow-lg"
          >
            <div className="px-4 py-6 space-y-6">
              {/* Navigation Links */}
              <div className="space-y-3">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Theme Toggle & Auth Buttons */}
              <div className="border-t border-border pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <ModeToggle />
                </div>

                {!isPending &&
                  (session ? (
                    <UserDropdown />
                  ) : (
                    <div className="space-y-2">
                      <Link
                        href="/login"
                        className={buttonVariants({
                          variant: "outline",
                          className: "w-full justify-center text-sm gap-2 flex",
                        })}
                      >
                        <LogIn className="w-4 h-4" />
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className={buttonVariants({
                          className:
                            "w-full justify-center text-sm font-semibold gap-2 flex",
                        })}
                      >
                        <UserPlus className="w-4 h-4" />
                        Get Started
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
