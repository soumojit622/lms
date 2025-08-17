"use client";

import Image from "next/image";
import {
  Users,
  Linkedin,
  Github,
  Mail,
  ArrowLeft,
  Briefcase,
  Handshake,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const fallbackImage =
  "https://ui-avatars.com/api/?name=Team+Member&background=0D8ABC&color=fff";

// const teamMembers = [
//   {
//     name: "Soumojit Banerjee",
//     role: "Web Developer",
//     image: "/soumojit.jpg", // 👈 local image in public/ OR leave empty to test fallback
//     linkedin: "https://www.linkedin.com/in/soumojit-banerjee-4914b3228",
//     github: "https://github.com/soumojit622",
//     email: "mailto:soumojitbanerjee22@gmail.com",
//   },
//   {
//     name: "John Doe",
//     role: "IoT Engineer",
//     image: "", // 👈 no image provided → will use fallback
//     linkedin: "https://linkedin.com",
//     github: "https://github.com",
//     email: "mailto:test@example.com",
//   },
// ];

const TeamPage = () => {
  return (
    // <div className="min-h-[70vh] px-6 py-16 bg-gradient-to-b from-background via-muted/40 to-background">
    //   {/* Header */}
    //   <div className="mx-auto max-w-3xl text-center space-y-4">
    //     <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground bg-muted/30">
    //       <Users className="h-3.5 w-3.5" />
    //       Our Team
    //     </div>

    //     <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
    //       Meet the <span className="text-primary">Minds</span> Behind Innovation
    //     </h1>

    //     <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
    //       Passionate individuals driving creativity, technology, and innovation.
    //     </p>
    //   </div>

    //   {/* Team Members */}
    //   <div className="mx-auto mt-16 max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    //     {teamMembers.map((member, i) => (
    //       <Card
    //         key={i}
    //         className="group border rounded-2xl shadow-sm bg-gradient-to-br from-card/90 to-muted/40 backdrop-blur-sm transition-all hover:shadow-xl hover:border-primary/40 hover:-translate-y-1"
    //       >
    //         <CardHeader className="flex flex-col items-center pt-8">
    //           {/* Profile Image with fallback */}
    //           <div className="rounded-full overflow-hidden ring-2 ring-muted/50 group-hover:ring-primary/40 transition">
    //             <Image
    //               src={member.image || fallbackImage}
    //               alt={member.name}
    //               width={96}
    //               height={96}
    //               className="object-cover rounded-full"
    //             />
    //           </div>

    //           <CardTitle className="mt-4 text-lg font-semibold text-center">
    //             {member.name}
    //           </CardTitle>
    //           <p className="text-xs text-muted-foreground">{member.role}</p>
    //         </CardHeader>
    //         <CardContent className="flex justify-center gap-6 pb-6">
    //           <Link
    //             href={member.linkedin}
    //             target="_blank"
    //             className="hover:text-primary transition-colors"
    //           >
    //             <Linkedin className="h-5 w-5" />
    //           </Link>
    //           <Link
    //             href={member.github}
    //             target="_blank"
    //             className="hover:text-primary transition-colors"
    //           >
    //             <Github className="h-5 w-5" />
    //           </Link>
    //           <Link
    //             href={member.email}
    //             className="hover:text-primary transition-colors"
    //           >
    //             <Mail className="h-5 w-5" />
    //           </Link>
    //         </CardContent>
    //       </Card>
    //     ))}
    //   </div>

    <div className="min-h-[60vh] px-4 py-16 md:px-8 lg:px-12">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          Team
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px]">
            Coming Soon
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center justify-center gap-2">
          Meet the People Behind the Work
          <Handshake className="h-7 w-7" />
        </h1>

        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Our team page is under construction. Soon you’ll get to know the
          talented individuals who bring vision, expertise, and collaboration to
          life.
        </p>
      </div>

      {/* Preview Card */}
      <div className="mx-auto mt-10 max-w-2xl">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-muted-foreground" />
              Team Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-2">
                <div className="h-16 w-16 rounded-full bg-muted animate-pulse" />
                <div className="h-3 w-20 rounded bg-muted animate-pulse" />
                <div className="h-3 w-12 rounded bg-muted animate-pulse" />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-center">
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
