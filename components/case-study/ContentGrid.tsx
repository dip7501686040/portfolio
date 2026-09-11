"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Github, X } from "lucide-react";
import type { ContentCard } from "@/lib/data";

interface Cycle {
  featureKey: string;
  cards: ContentCard[];
}

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

function stepLabel(card: ContentCard): string {
  if (card.role === "ui") return "What you see";
  if (card.role === "terminal") return "How it works";
  return card.kind;
}

function Lightbox({
  cycle,
  index,
  setIndex,
  onClose,
}: {
  cycle: Cycle;
  index: number;
  setIndex: (i: number) => void;
  onClose: () => void;
}) {
  const card = cycle.cards[index];
  const hasSteps = cycle.cards.length > 1;
  const next = () => setIndex((index + 1) % cycle.cards.length);
  const prev = () => setIndex((index - 1 + cycle.cards.length) % cycle.cards.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (hasSteps && e.key === "ArrowRight") next();
      if (hasSteps && e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, index, hasSteps]);

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

          {hasSteps && (
            <>
              <button
                type="button"
                aria-label="Previous"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-scrim/70 text-white border border-line rounded-full p-2 hover:text-accent"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={next}
                className="absolute right-14 top-1/2 -translate-y-1/2 bg-scrim/70 text-white border border-line rounded-full p-2 hover:text-accent"
              >
                <ChevronRight size={18} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {cycle.cards.map((c, i) => (
                  <span
                    key={`${c.role ?? c.kind}-${i}`}
                    className={`h-1.5 w-1.5 rounded-full ${i === index ? "bg-accent" : "bg-white/35"}`}
                  />
                ))}
              </div>
            </>
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
            <div className="eyebrow mb-2 flex items-center gap-2">
              <span>{stepLabel(card)}</span>
              {hasSteps && (
                <span className="text-muted normal-case tracking-normal font-normal">
                  · step {index + 1} of {cycle.cards.length}
                </span>
              )}
            </div>
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
  const cycles = useMemo<Cycle[]>(() => {
    const map = new Map<string, ContentCard[]>();
    for (const c of content) {
      const arr = map.get(c.featureKey) ?? [];
      arr.push(c);
      map.set(c.featureKey, arr);
    }
    return [...map.entries()].map(([featureKey, cards]) => ({
      featureKey,
      cards: [...cards].sort((a, b) => (a.role === "ui" ? -1 : 1) - (b.role === "ui" ? -1 : 1)),
    }));
  }, [content]);

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  if (cycles.length === 0) return null;
  const activeCycle = cycles.find((c) => c.featureKey === activeKey) ?? null;

  return (
    <section id="evidence" className="section-pad border-t border-line">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="eyebrow mb-3">engineering evidence</div>
        <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2">
          Technical deep dive
        </h2>
        <p className="text-muted max-w-2xl mb-8 leading-relaxed">
          Demos, screenshots and diagrams for the features behind this project —
          what it looks like to use, then what&apos;s behind it.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cycles.map((cycle) => {
            const primary = cycle.cards[0];
            const hasSteps = cycle.cards.length > 1;
            return (
              <button
                key={cycle.featureKey}
                id={cycle.featureKey}
                type="button"
                onClick={() => {
                  setActiveKey(cycle.featureKey);
                  setActiveIndex(0);
                }}
                className="text-left bg-panel border border-line rounded-xl overflow-hidden flex flex-col hover:border-accent/60 transition-colors scroll-mt-24"
              >
                <div className="relative aspect-video bg-panel2 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={primary.kind === "video" ? (primary.poster ?? primary.src) : primary.src}
                    alt={primary.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  {hasSteps && (
                    <span className="absolute bottom-2 right-2 rounded-full bg-scrim/70 text-white text-[11px] px-2 py-0.5 border border-line">
                      {cycle.cards.length} views
                    </span>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="eyebrow mb-1.5">
                    {primary.role === "ui" ? "product walkthrough" : primary.kind}
                  </div>
                  <h3 className="font-display text-base text-ink">{primary.title}</h3>
                  <p className="text-sm text-muted mt-2 leading-relaxed flex-1">
                    {primary.caption}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <span className="text-sm font-medium text-accent">
                      {hasSteps
                        ? "See it → how it works"
                        : primary.kind === "video"
                          ? "Play"
                          : "View"}
                    </span>
                    <CodeLinks code={primary.code} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {activeCycle && (
        <Lightbox
          cycle={activeCycle}
          index={activeIndex}
          setIndex={setActiveIndex}
          onClose={() => setActiveKey(null)}
        />
      )}
    </section>
  );
}
