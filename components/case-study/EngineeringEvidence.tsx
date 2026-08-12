"use client";

import { useEffect, useState } from "react";
import { X, ImageOff } from "lucide-react";
import { engineeringDemos, aiNotificationAssets, type EngineeringDemo } from "@/lib/ai-notification";

function Lightbox({ demo, onClose }: { demo: EngineeringDemo; onClose: () => void }) {
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

  const preview = aiNotificationAssets.engineeringDemoPreviews[demo.id];

  return (
    <div
      className="fixed inset-0 z-50 bg-scrim/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={demo.title}
    >
      <div
        className="w-full max-w-3xl bg-panel border border-line rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-panel2">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt={`${demo.title} preview`} className="w-full max-h-[60vh] object-contain" />
          ) : (
            <div className="w-full aspect-video flex flex-col items-center justify-center gap-2 text-muted">
              <ImageOff size={22} />
              <span className="text-xs font-mono">Preview pending</span>
            </div>
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
        <div className="p-6">
          <div className="eyebrow mb-2">{demo.category}</div>
          <h3 className="font-display text-xl text-ink">{demo.title}</h3>
          <p className="text-muted mt-2 leading-relaxed">{demo.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function EngineeringEvidence() {
  const [active, setActive] = useState<EngineeringDemo | null>(null);

  return (
    <section id="evidence" className="section-pad">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="eyebrow mb-3">engineering evidence</div>
        <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2">Technical deep dive</h2>
        <p className="text-muted max-w-2xl mb-8 leading-relaxed">
          Concrete evidence for each production concern the platform handles.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {engineeringDemos.map((demo) => {
            const preview = aiNotificationAssets.engineeringDemoPreviews[demo.id];
            return (
              <div key={demo.id} className="bg-panel border border-line rounded-xl overflow-hidden flex flex-col">
                <div className="relative aspect-video bg-panel2 overflow-hidden">
                  {preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={preview}
                      alt={`${demo.title} preview`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted">
                      <ImageOff size={20} />
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="eyebrow mb-1.5">{demo.category}</div>
                  <h3 className="font-display text-base text-ink">{demo.title}</h3>
                  <p className="text-sm text-muted mt-2 leading-relaxed flex-1">{demo.description}</p>
                  <button
                    type="button"
                    onClick={() => preview && setActive(demo)}
                    disabled={!preview}
                    className={
                      preview
                        ? "mt-4 self-start text-sm font-medium text-accent hover:underline"
                        : "mt-4 self-start text-sm font-mono text-muted cursor-not-allowed"
                    }
                  >
                    {preview ? "View demo" : "Coming soon"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {active && <Lightbox demo={active} onClose={() => setActive(null)} />}
    </section>
  );
}
