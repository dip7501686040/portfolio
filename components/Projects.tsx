"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Images, ArrowRight, Maximize2 } from "lucide-react";
import type { Project } from "@/lib/data";
import ProjectModal from "./ProjectModal";

export default function Projects({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-pad border-t border-line">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid sm:grid-cols-[160px_1fr] gap-6 sm:gap-12">
          <div className="eyebrow pt-1">catalog</div>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2">
              Featured projects
            </h2>
            <p className="text-muted mb-8 max-w-xl">
              A sample of shipped work. Each entry opens a gallery of screens,
              diagrams, or short demo clips.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {projects.map((p) => {
                const cover = p.media[0];
                const hasVideo = p.media.some((m) => m.type === "video");
                const caseStudyHref = p.caseStudyUrl ?? (p.hasCaseStudy ? `/projects/${p.slug}` : undefined);
                const isExternal = !!p.caseStudyUrl;
                const cardClass =
                  "relative text-left group bg-panel border border-line rounded-xl overflow-hidden hover:border-accent/60 transition-colors";

                const cardBody = (
                  <>
                    <div className="relative aspect-[16/10] bg-panel2 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cover.type === "image" ? cover.src : cover.poster ?? cover.src}
                        alt={cover.alt}
                        className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-scrim/0 group-hover:bg-scrim/40 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-white bg-scrim/70 border border-line rounded-full px-4 py-2 text-sm">
                          {caseStudyHref ? (
                            <ArrowRight size={14} />
                          ) : hasVideo ? (
                            <Play size={14} />
                          ) : (
                            <Images size={14} />
                          )}
                          {caseStudyHref
                            ? p.ctaLabel ?? "Open case study"
                            : hasVideo
                            ? "Watch demo"
                            : `View gallery (${p.media.length})`}
                        </span>
                      </div>
                      {caseStudyHref && (
                        <button
                          type="button"
                          aria-label={`View full-size cover image for ${p.title}`}
                          onClick={() => setActive(p)}
                          className="absolute right-3 top-3 z-20 bg-scrim/70 text-white border border-line rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-accent"
                        >
                          <Maximize2 size={14} />
                        </button>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg text-ink">{p.title}</h3>
                      <p className="text-sm text-muted mt-2 leading-relaxed">{p.summary}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="text-xs font-mono text-accent bg-accent/10 border border-accent/30 rounded px-2 py-1"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      {p.showTechOnCard && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {p.tech.map((t) => (
                            <span
                              key={t}
                              className="text-xs font-mono text-muted bg-panel2 border border-line rounded px-2 py-1"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                );

                return caseStudyHref ? (
                  <div key={p.slug} className={cardClass}>
                    {cardBody}
                    {/* Stretched link: sits below the zoom button (z-10 < z-20) so the
                        button stays clickable while the rest of the card still navigates. */}
                    <Link
                      href={caseStudyHref}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      aria-label={`Open case study: ${p.title}`}
                      className="absolute inset-0 z-10"
                    />
                  </div>
                ) : (
                  <button key={p.slug} onClick={() => setActive(p)} className={cardClass}>
                    {cardBody}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}
