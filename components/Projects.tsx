"use client";

import { useState } from "react";
import { Play, Images } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import ProjectModal from "./ProjectModal";

export default function Projects() {
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
                return (
                  <button
                    key={p.slug}
                    onClick={() => setActive(p)}
                    className="text-left group bg-panel border border-line rounded-xl overflow-hidden hover:border-teal/60 transition-colors"
                  >
                    <div className="relative aspect-[16/10] bg-panel2 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cover.type === "image" ? cover.src : cover.poster ?? cover.src}
                        alt={cover.alt}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-scrim/0 group-hover:bg-scrim/40 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-white bg-scrim/70 border border-line rounded-full px-4 py-2 text-sm">
                          {hasVideo ? <Play size={14} /> : <Images size={14} />}
                          {hasVideo ? "Watch demo" : `View gallery (${p.media.length})`}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg text-ink">{p.title}</h3>
                      <p className="text-sm text-muted mt-2 leading-relaxed">{p.summary}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="text-xs font-mono text-amber bg-amber/10 border border-amber/30 rounded px-2 py-1"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
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
