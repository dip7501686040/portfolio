"use client";

import { useEffect, useState } from "react";
import { Github, X } from "lucide-react";
import type { ContentCard } from "@/lib/data";

function CodeLinks({ code }: { code: ContentCard["code"] }) {
  if (!code || code.links.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1">
      {code.links.map((l) => (
        <a
          key={l.url}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
        >
          <Github size={12} /> {l.label}
        </a>
      ))}
    </div>
  );
}

function Lightbox({ card, onClose }: { card: ContentCard; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-scrim/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={card.title}
    >
      <div
        className="w-full max-w-4xl bg-panel border border-line rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-panel2">
          {card.kind === "video" ? (
            <video
              src={card.src}
              poster={card.poster}
              controls
              autoPlay
              className="w-full max-h-[70vh] bg-black"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={card.src}
              alt={card.title}
              className="w-full max-h-[70vh] object-contain"
            />
          )}
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-3 top-3 bg-scrim/70 text-white border border-line rounded-full p-2 hover:text-danger"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-6 flex flex-col gap-3">
          <div>
            <div className="eyebrow mb-2">{card.kind}</div>
            <h3 className="font-display text-xl text-ink">{card.title}</h3>
            <p className="text-muted mt-2 leading-relaxed">{card.caption}</p>
          </div>
          <CodeLinks code={card.code} />
        </div>
      </div>
    </div>
  );
}

export default function ContentGrid({ content }: { content: ContentCard[] }) {
  const [active, setActive] = useState<ContentCard | null>(null);
  if (content.length === 0) return null;

  return (
    <section id="evidence" className="section-pad border-t border-line">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="eyebrow mb-3">engineering evidence</div>
        <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2">
          Technical deep dive
        </h2>
        <p className="text-muted max-w-2xl mb-8 leading-relaxed">
          Demos, screenshots and diagrams for the features behind this project.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((card) => (
            <button
              key={`${card.featureKey}:${card.src}`}
              id={card.featureKey}
              type="button"
              onClick={() => setActive(card)}
              className="text-left bg-panel border border-line rounded-xl overflow-hidden flex flex-col hover:border-accent/60 transition-colors scroll-mt-24"
            >
              <div className="relative aspect-video bg-panel2 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.kind === "video" ? (card.poster ?? card.src) : card.src}
                  alt={card.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="eyebrow mb-1.5">{card.kind}</div>
                <h3 className="font-display text-base text-ink">{card.title}</h3>
                <p className="text-sm text-muted mt-2 leading-relaxed flex-1">
                  {card.caption}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <span className="text-sm font-medium text-accent">
                    {card.kind === "video" ? "Play" : "View"}
                  </span>
                  <CodeLinks code={card.code} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && <Lightbox card={active} onClose={() => setActive(null)} />}
    </section>
  );
}
