"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import type { Project } from "@/lib/data"

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [index, setIndex] = useState(0)
  const media = project.media[index]
  const caseStudyHref = project.caseStudyUrl ?? (project.hasCaseStudy ? `/projects/${project.slug}` : undefined)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % project.media.length)
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + project.media.length) % project.media.length)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose, project.media.length])

  return (
    <div className="fixed inset-0 z-50 bg-scrim/80 backdrop-blur-sm flex items-center justify-center p-6 sm:p-12 px-10 sm:px-24" onClick={onClose} role="dialog" aria-modal="true" aria-label={project.title}>
      <div className="w-full h-full flex flex-col bg-panel border border-line rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="relative flex-1 min-h-0 bg-panel2">
          {media.type === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={media.src} alt={media.alt} className="w-full h-full object-contain" />
          ) : (
            <video src={media.src} poster={media.poster} controls className="w-full h-full bg-black" />
          )}

          {caseStudyHref && (
            <Link
              href={caseStudyHref}
              target={project.caseStudyUrl ? "_blank" : undefined}
              rel={project.caseStudyUrl ? "noopener noreferrer" : undefined}
              className="group/cs absolute inset-0 z-10 flex items-center justify-center bg-scrim/0 hover:bg-scrim/40 transition-colors"
            >
              <span className="opacity-0 group-hover/cs:opacity-100 transition-opacity flex items-center gap-2 text-white bg-scrim/70 border border-line rounded-full px-4 py-2 text-sm">
                <ArrowRight size={14} /> Open case study
              </span>
            </Link>
          )}

          {project.media.length > 1 && (
            <>
              <button
                aria-label="Previous media"
                onClick={() => setIndex((i) => (i - 1 + project.media.length) % project.media.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-scrim/70 text-white border border-line rounded-full p-2 hover:text-accent"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                aria-label="Next media"
                onClick={() => setIndex((i) => (i + 1) % project.media.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-scrim/70 text-white border border-line rounded-full p-2 hover:text-accent"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          <button aria-label="Close" onClick={onClose} className="absolute right-3 top-3 z-20 bg-scrim/70 text-white border border-line rounded-full p-2 hover:text-danger">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 shrink-0 overflow-y-auto max-h-[35vh]">
          <h3 className="font-display text-xl text-ink">{project.title}</h3>
          <p className="text-muted mt-2 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tech.map((t) => (
              <span key={t} className="text-xs font-mono text-accent bg-accent/10 border border-accent/30 rounded px-2 py-1">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
