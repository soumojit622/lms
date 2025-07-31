import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BadgeDollarSign,
  BookOpen,
  Briefcase,
  Building2,
  Github,
  GraduationCap,
  Heart,
  Instagram,
  Linkedin,
  Lock,
  Mail,
  Megaphone,
  Newspaper,
  ShieldCheck,
  Users,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-background border-t pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12">
        {/* Logo & Description */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/logo.svg"
              alt="ThinkLab Logo"
              width={36}
              height={36}
              className="object-contain"
            />
            <span className="text-2xl font-bold text-foreground">ThinkLab</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground mb-6">
            Elevating modern education with interactive, expert-led content for
            today’s learners — wherever they are.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/soumojit622"
              target="_blank"
              aria-label="Twitter"
            >
              <Github className="w-4 h-4 hover:text-primary transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/soumojit-banerjee-4914b3228/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 hover:text-primary transition-colors" />
            </a>
            <a
              href="https://www.instagram.com/soumo622/"
              target="_blank"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 hover:text-primary transition-colors" />
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
            Explore
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href="/courses"
                className="flex items-center gap-2 hover:text-primary"
              >
                <BookOpen className="w-4 h-4" />
                Courses
              </a>
            </li>
            <li>
              <a
                href="/categories"
                className="flex items-center gap-2 hover:text-primary"
              >
                <GraduationCap className="w-4 h-4" />
                Categories
              </a>
            </li>
            <li>
              <a
                href="/instructors"
                className="flex items-center gap-2 hover:text-primary"
              >
                <Users className="w-4 h-4" />
                Instructors
              </a>
            </li>
            <li>
              <a
                href="/pricing"
                className="flex items-center gap-2 hover:text-primary"
              >
                <BadgeDollarSign className="w-4 h-4" />
                Pricing
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href="/about"
                className="flex items-center gap-2 hover:text-primary"
              >
                <Building2 className="w-4 h-4" />
                About Us
              </a>
            </li>
            <li>
              <a
                href="/blog"
                className="flex items-center gap-2 hover:text-primary"
              >
                <Newspaper className="w-4 h-4" />
                Blog
              </a>
            </li>
            <li>
              <a
                href="/careers"
                className="flex items-center gap-2 hover:text-primary"
              >
                <Briefcase className="w-4 h-4" />
                Careers
              </a>
            </li>
            <li>
              <a
                href="/press"
                className="flex items-center gap-2 hover:text-primary"
              >
                <Megaphone className="w-4 h-4" />
                Press
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
            Stay Updated
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Join our newsletter for updates, articles, and more.
          </p>
          <form className="flex w-full items-center space-x-2">
            <Input type="email" placeholder="Your email" className="flex-1" />
            <Button type="submit" size="sm">
              <Mail className="w-4 h-4 mr-1" />
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t mt-16 py-6 px-4 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground gap-4">
        <p>&copy; {new Date().getFullYear()} ThinkLab. All rights reserved.</p>
        <div className="flex items-center gap-3">
          <a
            href="/privacy"
            className="flex items-center gap-1 hover:text-primary"
          >
            <Lock className="w-3 h-3" />
            Privacy
          </a>
          <span className="text-muted-foreground">|</span>
          <a
            href="/terms"
            className="flex items-center gap-1 hover:text-primary"
          >
            <ShieldCheck className="w-3 h-3" />
            Terms
          </a>
        </div>
      </div>

      {/* Creator Note */}
      <div className="text-center text-xs text-muted-foreground pb-8 px-4">
        Made with <Heart className="inline w-3 h-3 text-red-500 mx-1" /> by{" "}
        <span className="font-semibold text-primary">Soumojit Banerjee</span>
      </div>
    </footer>
  );
}
