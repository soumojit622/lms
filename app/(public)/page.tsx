import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart4,
  BrainCircuit,
  Briefcase,
  Camera,
  Code,
  GraduationCap,
  Languages,
  LogIn,
  Megaphone,
  Palette,
  Quote,
  Rocket,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { FaChalkboardTeacher, FaGamepad, FaUsers } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import { HiChartBar } from "react-icons/hi";
interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const categories = [
  { name: "Development", icon: <Code className="h-5 w-5 text-primary" /> },
  { name: "Design", icon: <Palette className="h-5 w-5 text-primary" /> },
  { name: "Marketing", icon: <Megaphone className="h-5 w-5 text-primary" /> },
  {
    name: "Data Science",
    icon: <BarChart4 className="h-5 w-5 text-primary" />,
  },
  { name: "AI & ML", icon: <BrainCircuit className="h-5 w-5 text-primary" /> },
  { name: "Business", icon: <Briefcase className="h-5 w-5 text-primary" /> },
  { name: "Photography", icon: <Camera className="h-5 w-5 text-primary" /> },
  {
    name: "Language Learning",
    icon: <Languages className="h-5 w-5 text-primary" />,
  },
];

const faqs = [
  {
    q: "Is ThinkLab free to use?",
    a: "You can start learning with free courses. Premium plans unlock full access to all content and features.",
  },
  {
    q: "Can I get a certificate after completing a course?",
    a: "Yes, certificates are provided for all completed courses which you can showcase on LinkedIn or resumes.",
  },
  {
    q: "Are the courses self-paced?",
    a: "Absolutely. Learn at your own pace with lifetime access to purchased content.",
  },
  {
    q: "Do you offer live sessions or mentorship?",
    a: "Yes, selected courses include live mentorship sessions and community Q&As.",
  },
];

const features: FeatureProps[] = [
  {
    title: "Comprehensive Courses",
    description:
      "Access a wide range of expertly designed courses across various industries, including tech, business, and personal development.",
    icon: <FaChalkboardTeacher className="h-8 w-8 text-primary" />,
  },
  {
    title: "Interactive Learning",
    description:
      "Experience active learning through quizzes, coding playgrounds, flashcards, and simulations built to reinforce real-world skills.",
    icon: <FaGamepad className="h-8 w-8 text-primary" />,
  },
  {
    title: "Progress Tracking",
    description:
      "Track your learning with visual analytics, course completion badges, skill reports, and personalized goals.",
    icon: <HiChartBar className="h-8 w-8 text-primary" />,
  },
  {
    title: "Community Support",
    description:
      "Join a thriving learning community. Collaborate with peers, share knowledge, and connect with instructors through forums and group sessions.",
    icon: <FaUsers className="h-8 w-8 text-primary" />,
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Centered Glowing Background Spots */}
        <div className="absolute inset-0 -z-10 pointer-events-none flex items-center justify-center">
          <div className="absolute w-[400px] h-[400px] bg-[#da7756] rounded-full blur-[160px] opacity-30" />
          <div className="absolute w-[300px] h-[300px] bg-[#da7756] rounded-full blur-[140px] opacity-20 translate-x-24 translate-y-12" />
        </div>

        {/* Optional subtle radial background */}
        <div className="absolute inset-0 -z-20 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        <div className="mx-auto max-w-4xl space-y-8">
          {/* Badge */}
          <Badge
            variant="outline"
            className="mx-auto text-sm px-4 py-1 tracking-wide flex items-center justify-center gap-2 w-max border border-border bg-muted/50 text-foreground backdrop-blur-sm shadow-sm"
          >
            <GraduationCap className="w-5 h-5 text-primary" />
            <span>The Future of Online Education</span>
          </Badge>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
            Empower Your Future with{" "}
            <span className="text-primary">Smart Learning</span>
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl leading-relaxed">
            ThinkLab helps learners and teams upskill faster with immersive
            tools, insightful progress tracking, and real-world curriculum led
            by experts.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/courses" className={buttonVariants({ size: "lg" })}>
              <Rocket className="w-5 h-5" />
              Explore Courses
            </Link>

            <Link
              href="/login"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              <LogIn className="w-5 h-5" />
              Sign In
            </Link>
          </div>

          {/* Register Prompt */}
          <p className="text-sm text-muted-foreground pt-2 flex items-center justify-center gap-1">
            New here?
            <Link
              href="/register"
              className="inline-flex items-center gap-1 text-primary underline hover:text-primary/80 transition"
            >
              Create a free account
            </Link>
            and start learning today.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-muted/10 backdrop-blur">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Why Choose ThinkLab?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Designed for modern learners with purpose-built tools, top-tier
              instructors, and structured content for every skill level.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative border border-border bg-white/80 dark:bg-background/80 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
              >
                <CardHeader className="space-y-4 pb-0">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary shadow-sm mx-auto">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold text-center text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground text-sm text-center leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-28 overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 -z-10 opacity-70 backdrop-blur-sm" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
              Trusted by Thousands of Learners
            </h2>
            <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Empowering individuals worldwide to learn, grow, and succeed—on
              their own schedule.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: (
                  <GiGraduateCap className="mx-auto text-5xl text-primary group-hover:scale-110 transition-transform duration-300" />
                ),
                value: "15,000+",
                label: "Active Learners",
              },
              {
                icon: (
                  <BsCameraVideo className="mx-auto text-5xl text-primary group-hover:scale-110 transition-transform duration-300" />
                ),
                value: "400+",
                label: "Video Lessons",
              },
              {
                icon: (
                  <HiChartBar className="mx-auto text-5xl text-primary group-hover:scale-110 transition-transform duration-300" />
                ),
                value: "95%",
                label: "Completion Rate",
              },
              {
                icon: (
                  <AiOutlineClockCircle className="mx-auto text-5xl text-primary group-hover:scale-110 transition-transform duration-300" />
                ),
                value: "24/7",
                label: "Learning Access",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="group rounded-2xl bg-background/70 border border-border p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 backdrop-blur-md"
              >
                {stat.icon}
                <h3 className="text-3xl font-bold text-foreground mt-4 group-hover:text-primary transition-colors duration-300">
                  {stat.value}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Instructors Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
        <div className="flex flex-col items-center space-y-16">
          {/* Heading */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Learn from Industry Experts
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Our world-class instructors bring hands-on experience and
              cutting-edge insights into every course—ensuring you're always one
              step ahead.
            </p>
          </div>

          {/* Instructor Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full">
            {[
              {
                name: "Dr. Ananya Roy",
                expertise: "AI & Data Science",
                img: "/instructors/ananya.jpg",
              },
              {
                name: "Mark Jensen",
                expertise: "Web Development",
                img: "/instructors/mark.jpg",
              },
              {
                name: "Ritika Sharma",
                expertise: "Product Design",
                img: "/instructors/ritika.jpg",
              },
            ].map((instructor, i) => (
              <div
                key={i}
                className="group rounded-3xl overflow-hidden bg-background border border-border shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={instructor.img}
                    alt={instructor.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                </div>
                <div className="p-6 text-left z-20 relative space-y-1">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {instructor.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {instructor.expertise}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6">
          Explore Top Categories
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg mb-14 max-w-2xl mx-auto">
          Discover a wide range of subjects to grow your skills and elevate your
          career.
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="group rounded-2xl border bg-background p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-sm font-medium text-foreground flex flex-col items-center justify-center h-32"
            >
              <div className="mb-3 text-primary text-3xl group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </div>
              <span className="text-base sm:text-lg font-semibold group-hover:text-primary transition-colors duration-200">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight text-foreground">
          What Our Learners Say
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-16">
          Hear directly from learners whose careers were transformed through
          ThinkLab’s expert-led courses and community support.
        </p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          {[
            {
              name: "Sneha Rani",
              role: "UI/UX Intern at Zeta",
              quote:
                "ThinkLab made learning fun and practical. The hands-on projects really helped me showcase my skills in interviews.",
              avatar:
                "https://ui-avatars.com/api/?name=Sneha+Rani&background=random",
              rating: 5,
            },
            {
              name: "Ravi Kumar",
              role: "Frontend Developer at Freshworks",
              quote:
                "The instructors are world-class. I stayed motivated thanks to the platform’s clean interface and structured learning path.",
              avatar:
                "https://ui-avatars.com/api/?name=Ravi+Kumar&background=random",
              rating: 5,
            },
            {
              name: "Arjun Mehta",
              role: "Data Analyst at Flipkart",
              quote:
                "With ThinkLab, I transitioned into data science smoothly. Their beginner-to-advanced courses are spot on.",
              avatar:
                "https://ui-avatars.com/api/?name=Arjun+Mehta&background=random",
              rating: 4,
            },
            {
              name: "Priya Singh",
              role: "Freelance Designer",
              quote:
                "Great community and amazing content! I especially loved the design courses and portfolio reviews.",
              avatar:
                "https://ui-avatars.com/api/?name=Priya+Singh&background=random",
              rating: 5,
            },
          ].map((t, i) => (
            <div
              key={i}
              className="relative rounded-2xl border bg-background p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <Quote className="absolute top-5 left-5 w-6 h-6 text-primary/20 group-hover:text-primary/40 transition-colors duration-300" />

              <p className="text-muted-foreground mb-6 text-sm sm:text-base leading-relaxed pl-8 pr-2">
                “{t.quote}”
              </p>

              <div className="flex items-center gap-4 pl-6">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover border shadow-sm"
                  unoptimized
                />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    {t.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                  <div
                    className="flex items-center gap-1 mt-1"
                    aria-label={`Rating: ${t.rating} stars`}
                  >
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`w-4 h-4 ${
                          j < t.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-left">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-center mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground text-center text-base sm:text-lg max-w-2xl mx-auto mb-12">
          Everything you need to know about ThinkLab. Can’t find what you’re
          looking for? Reach out to our support team.
        </p>

        <Accordion type="single" collapsible className="space-y-4">
          {[
            {
              q: "Is ThinkLab free to use?",
              a: "You can start learning with free courses. Premium plans unlock full access to all content and features.",
            },
            {
              q: "Can I get a certificate after completing a course?",
              a: "Yes, certificates are provided for all completed courses which you can showcase on LinkedIn or resumes.",
            },
            {
              q: "Are the courses self-paced?",
              a: "Absolutely. Learn at your own pace with lifetime access to purchased content.",
            },
            {
              q: "Do you offer live sessions or mentorship?",
              a: "Yes, selected courses include live mentorship sessions and community Q&As.",
            },
          ].map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-lg border bg-background shadow-sm transition-all hover:shadow-md"
            >
              <AccordionTrigger className="px-5 py-4 text-base font-medium text-left text-foreground hover:text-primary transition-all">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-4 pt-0 text-muted-foreground text-sm leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
