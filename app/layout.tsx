import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Beautiful Google Fonts
import "./globals.css";
import { BackToTopButton } from "@/components/BackToTopButton";

// Load Inter font for main content (clean and professional)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Load Playfair Display for headings or emphasis (adds elegance)
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

// Exporting a metadata object used by Next.js for SEO, social sharing, and browser settings
export const metadata: Metadata = {
  // The main title of the web page; appears in browser tabs and search results
  title: "Thinklab | Empowering Intelligent Learning",

  // A concise summary of the site used by search engines and link previews
  description:
    "Thinklab is a next-generation Learning Management System (LMS) engineered for institutions and enterprises seeking intelligent, engaging, and scalable digital learning solutions.",

  // Keywords to help describe the content of the site (some search engines still use this)
  keywords: [
    "LMS", // Industry acronym
    "Learning Management System", // Expanded acronym for clarity
    "Thinklab", // Brand name
    "Online Learning Platform", // Generic product descriptor
    "Corporate Training", // Business-focused learning
    "eLearning", // Widely searched term
    "Digital Education", // Broader education term
    "Education Software", // Technical/industry category
    "Learning Platform", // Product category
    "Intelligent Learning", // Descriptive, brand-aligned keyword
  ],

  // Attribution: specifies the author of the content with a name and a link (useful for credibility)
  authors: [
    { name: "Soumojit Banerjee", url: "https://github.com/soumojit622" },
  ],

  // Identifies the creator/organization behind the website content
  creator: "Thinklab",

  // Open Graph metadata used by social platforms like Facebook and LinkedIn
  openGraph: {
    // Title used in rich previews
    title: "Thinklab | Empowering Intelligent Learning",

    // Description shown in link previews
    description:
      "Thinklab is a future-ready LMS designed for educators, enterprises, and institutions. Deliver smart, scalable, and immersive digital learning experiences.",

    // Canonical URL of the page being shared
    url: "https://thinklab.com",

    // Name of the website or product (used in link previews)
    siteName: "Thinklab",

    // Regional setting; en_US = English (United States)
    locale: "en_US",

    // Content type; "website" is typical, but can be changed to "article", "product", etc.
    type: "website",
  },

  // Specifies the path to the website's favicon (icon shown in browser tabs)
  icons: {
    icon: "/logo.svg", // Must exist in the public directory of your project
  },

  // Sets the base URL used when resolving relative URLs in metadata
  metadataBase: new URL("https://thinklab.com"),
};

// Root layout with improved font variables applied
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Footer />
          <Toaster closeButton position="bottom-center" />
          <BackToTopButton/>
        </ThemeProvider>
      </body>
    </html>
  );
}
