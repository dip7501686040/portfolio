import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";
import ContentGrid from "@/components/case-study/ContentGrid";
import Footer from "@/components/Footer";

const withCaseStudy = projects.filter((p) => p.caseStudy);

export function generateStaticParams() {
  return withCaseStudy.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = withCaseStudy.find((p) => p.slug === slug);
  if (!project) return { title: "Case study" };
  return {
    title: `${project.title} — Case Study`,
    description: project.caseStudy!.tagline,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = withCaseStudy.find((p) => p.slug === slug);
  if (!project) notFound();
  const cs = project.caseStudy!;

  return (
    <main>
      <header className="border-b border-line">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10 pt-10 pb-14 sm:pt-14 sm:pb-16">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft size={14} /> Back to projects
          </Link>

          <div className="eyebrow mt-8 mb-4">engineering case study</div>

          <div className="flex flex-wrap items-center gap-4">
            <h1 className="font-display font-bold text-4xl sm:text-5xl leading-[1.05] tracking-tight text-ink max-w-3xl">
              {project.title}
            </h1>
            {cs.links.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                {cs.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 font-medium text-ink hover:border-accent hover:text-accent transition-colors"
                  >
                    {/View source|source|repo|github/i.test(l.label) ? (
                      <Github size={16} />
                    ) : (
                      <ExternalLink size={16} />
                    )}
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <p className="mt-4 max-w-2xl text-muted text-base sm:text-lg leading-relaxed">
            {cs.tagline}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs font-mono text-accent bg-accent/10 border border-accent/30 rounded px-2 py-1"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="section-pad border-b border-line">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10 grid sm:grid-cols-2 gap-8">
          <div>
            <div className="eyebrow mb-3">problem</div>
            <p className="text-ink leading-relaxed max-w-2xl">{cs.problem}</p>
          </div>
          <div>
            <div className="eyebrow mb-3">solution</div>
            <p className="text-ink leading-relaxed max-w-2xl">{cs.solution}</p>
          </div>
        </div>
      </section>

      {cs.highlights.length > 0 && (
        <section className="section-pad border-b border-line">
          <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
            <div className="eyebrow mb-3">highlights</div>
            <ul className="mt-2 space-y-3 max-w-3xl">
              {cs.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-ink leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ContentGrid content={cs.content} />

      <Footer />
    </main>
  );
}
