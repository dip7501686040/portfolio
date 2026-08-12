"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ImageOff, Maximize2, X } from "lucide-react";
import { eventFlowSteps, aiNotificationAssets } from "@/lib/ai-notification";

const SWIPE_THRESHOLD = 40;

function Screenshot({
  src,
  alt,
  onExpand
}: {
  src: string;
  alt: string;
  onExpand?: () => void;
}) {
  if (!src) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted">
        <ImageOff size={22} />
        <span className="text-xs font-mono">Screenshot pending</span>
      </div>
    );
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" className="w-full h-full object-contain" />
      {onExpand && (
        <button
          type="button"
          onClick={onExpand}
          aria-label="View screenshot full size"
          className="absolute right-2.5 top-2.5 flex items-center gap-1.5 text-white bg-scrim/70 border border-line rounded-full px-3 py-1.5 text-xs hover:border-accent hover:text-accent transition-colors"
        >
          <Maximize2 size={13} /> View full size
        </button>
      )}
    </>
  );
}

function ScreenshotLightbox({
  activeIndex,
  onChange,
  onClose
}: {
  activeIndex: number;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const step = eventFlowSteps[activeIndex];
  const screenshot = aiNotificationAssets.eventFlowScreenshots[step.screenshotKey];
  const goTo = (index: number) => onChange((index + eventFlowSteps.length) % eventFlowSteps.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-scrim/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${step.title} — full size screenshot`}
    >
      <div className="relative w-full flex-1 min-h-0 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {screenshot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={screenshot}
            alt={`${step.title} — backend screenshot`}
            className="max-w-full max-h-full object-contain rounded-lg border border-line"
          />
        ) : (
          <div className="text-muted flex flex-col items-center gap-2">
            <ImageOff size={28} />
            <span className="text-sm font-mono">Screenshot pending</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous step"
          className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 bg-scrim/70 text-white border border-line rounded-full p-2 hover:text-accent"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next step"
          className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 bg-scrim/70 text-white border border-line rounded-full p-2 hover:text-accent"
        >
          <ChevronRight size={18} />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close full size screenshot"
          className="absolute right-0 top-0 sm:-right-4 sm:-top-4 bg-scrim/70 text-white border border-line rounded-full p-2 hover:text-danger"
        >
          <X size={18} />
        </button>
      </div>

      <div className="text-center mt-2 max-w-xl" onClick={(e) => e.stopPropagation()}>
        <div className="text-sm font-medium text-ink">{step.title}</div>
        <div className="text-xs text-muted mt-1">{step.flowLabel}</div>
      </div>
    </div>
  );
}

export default function EventFlowCarousel({
  activeIndex,
  onChange
}: {
  activeIndex: number;
  onChange: (index: number) => void;
}) {
  const touchStartX = useRef<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const step = eventFlowSteps[activeIndex];
  const screenshot = aiNotificationAssets.eventFlowScreenshots[step.screenshotKey];

  const goTo = (index: number) => onChange((index + eventFlowSteps.length) % eventFlowSteps.length);
  const next = () => goTo(activeIndex + 1);
  const prev = () => goTo(activeIndex - 1);

  return (
    <div
      className="bg-panel border border-line rounded-xl p-5 focus:outline-none"
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label="Backend event-flow steps"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (delta > SWIPE_THRESHOLD) prev();
        if (delta < -SWIPE_THRESHOLD) next();
        touchStartX.current = null;
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="eyebrow">backend event flow</div>
        <span className="text-xs font-mono text-accent bg-accent/10 border border-accent/30 rounded px-2 py-1">
          {step.message}
        </span>
      </div>

      <div className="relative bg-panel2 border border-line rounded-lg overflow-hidden h-[280px] sm:h-[420px] lg:h-[480px]">
        <Screenshot
          src={screenshot}
          alt={`${step.title} — backend screenshot`}
          onExpand={screenshot ? () => setLightboxOpen(true) : undefined}
        />
      </div>

      <h3 className="font-display text-lg text-ink mt-4">{step.title}</h3>
      <p className="text-sm text-muted mt-1.5 leading-relaxed">{step.description}</p>
      <div className="text-xs font-mono text-muted mt-3">{step.flowLabel}</div>

      <div className="flex items-center justify-between mt-5">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous step"
          className="flex items-center gap-1 text-sm text-muted hover:text-accent transition-colors"
        >
          <ChevronLeft size={16} /> Prev
        </button>

        <div className="flex items-center gap-2">
          {eventFlowSteps.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to step ${i + 1}: ${s.title}`}
              aria-current={i === activeIndex}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex ? "w-5 bg-accent" : "w-2 bg-line"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next step"
          className="flex items-center gap-1 text-sm text-muted hover:text-accent transition-colors"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>

      {lightboxOpen && (
        <ScreenshotLightbox activeIndex={activeIndex} onChange={onChange} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  );
}
