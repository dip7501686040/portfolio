import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { externalProjects, manualCovers, type Project } from "@/lib/data";
import { coverDataUri } from "@/lib/case-study-cover";
import { getPublicProjects } from "@/lib/proof";

export const revalidate = 3600;

async function loadProjects(): Promise<Project[]> {
  const live = await getPublicProjects();
  const liveProjects: Project[] = live.map((p) => ({
    slug: p.slug,
    title: p.name,
    summary: p.tagline,
    description: p.architecture ?? p.description ?? p.tagline,
    tags: p.tech.slice(0, 3),
    tech: p.tech.slice(3, 11),
    showTechOnCard: p.tech.length > 3,
    media: [
      {
        type: "image",
        src: manualCovers[p.slug] ?? coverDataUri(p.name),
        alt: p.name,
      },
    ],
    hasCaseStudy: true,
  }));
  return [...liveProjects, ...externalProjects];
}

export default async function Home() {
  const projects = await loadProjects();
  return (
    <main>
      <Hero />
      <About />
      <Projects projects={projects} />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
