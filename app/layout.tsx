import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import FloatingActions from "@/components/FloatingActions";
import ThemeToggle from "@/components/ThemeToggle";
import { NO_FLASH_SCRIPT } from "@/components/ThemeProvider";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display"
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body"
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "Dipankar Saha | Senior Full Stack AI Engineer",
  description:
    "Senior Full Stack Engineer (6+ yrs) building React/Next.js, NestJS, and AI/RAG-powered systems for global clients. Available for freelance and full-time engagements.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Dipankar Saha | Senior Full Stack AI Engineer",
    description:
      "React, Next.js, NestJS, Node.js, AI/LLM & RAG systems, Kubernetes. Open to remote & relocation.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
      </head>
      <body className="font-body bg-graphite text-ink antialiased">
        <Providers>
          {children}
          <ThemeToggle />
          <FloatingActions />
        </Providers>
      </body>
    </html>
  );
}
