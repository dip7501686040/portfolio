import Link from "next/link"
import { ArrowLeft, Play, Compass, Github, ExternalLink } from "lucide-react"
import { caseStudyContent } from "@/lib/ai-notification"

export default function CaseStudyHero({ github, liveDemo }: { github?: string; liveDemo?: string }) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10 pt-10 pb-14 sm:pt-14 sm:pb-16">
        <Link href="/#projects" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors">
          <ArrowLeft size={14} /> Back to projects
        </Link>

        <div className="eyebrow mt-8 mb-4">engineering case study</div>

        <div className="flex flex-wrap items-center gap-4">
          <h1 className="font-display font-bold text-4xl sm:text-5xl leading-[1.05] tracking-tight text-ink max-w-3xl">{caseStudyContent.heroTitle}</h1>
          {(github || liveDemo) && (
            <div className="flex flex-wrap items-center gap-3">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 font-medium text-ink hover:border-accent hover:text-accent transition-colors"
                >
                  <Github size={16} /> View source
                </a>
              )}
              {liveDemo && (
                <a
                  href={liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 font-medium text-ink hover:border-accent hover:text-accent transition-colors"
                >
                  <ExternalLink size={16} /> Live demo
                </a>
              )}
            </div>
          )}
        </div>
        <p className="mt-4 max-w-2xl text-muted text-base sm:text-lg leading-relaxed">{caseStudyContent.heroTagline}</p>

        <div className="flex flex-wrap gap-2 mt-6">
          {caseStudyContent.techBadges.map((t) => (
            <span
              key={t.name}
              className={
                t.status === "roadmap"
                  ? "text-xs font-mono text-muted bg-transparent border border-dashed border-line rounded px-2 py-1"
                  : "text-xs font-mono text-accent bg-accent/10 border border-accent/30 rounded px-2 py-1"
              }
              title={t.status === "roadmap" ? "On the roadmap — not yet deployed" : undefined}
            >
              {t.name}
              {t.status === "roadmap" && <span className="ml-1 opacity-70">(roadmap)</span>}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#demo" className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-medium text-graphite hover:bg-accent/90 transition-colors">
            <Play size={16} /> Watch Product Demo
          </a>
          <a href="#architecture" className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 font-medium text-ink hover:border-accent hover:text-accent transition-colors">
            <Compass size={16} /> Explore Architecture
          </a>
        </div>
      </div>
    </header>
  )
}
