"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { architectureComponentMap, lldDetails, type ArchitectureComponentId } from "@/lib/ai-notification";

const SECTIONS: { key: keyof (typeof lldDetails)[ArchitectureComponentId]; label: string }[] = [
  { key: "responsibilities", label: "Responsibilities" },
  { key: "internalFlow", label: "Internal flow" },
  { key: "apis", label: "Important APIs" },
  { key: "events", label: "Events / messages" },
  { key: "rabbitmqInteraction", label: "RabbitMQ interaction" },
  { key: "database", label: "Database / storage" },
  { key: "failureHandling", label: "Failure handling" },
  { key: "scaling", label: "Scaling considerations" },
  { key: "security", label: "Security considerations" }
];

export default function LLDDrawer({
  componentId,
  onClose
}: {
  componentId: ArchitectureComponentId | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!componentId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [componentId, onClose]);

  if (!componentId) return null;

  const component = architectureComponentMap[componentId];
  const detail = lldDetails[componentId];
  const hasContent = SECTIONS.some((s) => {
    const value = detail[s.key];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-scrim/80 backdrop-blur-sm flex justify-end"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${component.label} details`}
    >
      <div
        className="w-full sm:max-w-md h-full overflow-y-auto bg-panel border-l border-line p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="eyebrow mb-2">low-level design</div>
            <h3 className="font-display text-xl text-ink">{component.label}</h3>
            <p className="text-sm text-muted mt-1">{component.role}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="shrink-0 text-muted hover:text-danger transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 space-y-5">
          {hasContent ? (
            SECTIONS.map((s) => {
              const value = detail[s.key];
              if (!value || (Array.isArray(value) && value.length === 0)) return null;
              return (
                <div key={s.key}>
                  <div className="text-xs font-mono uppercase tracking-wide text-accent mb-1.5">
                    {s.label}
                  </div>
                  {Array.isArray(value) ? (
                    <ul className="text-sm text-muted leading-relaxed list-disc list-inside space-y-1">
                      {value.map((v, i) => (
                        <li key={i}>{v}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted leading-relaxed">{value}</p>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-sm text-muted leading-relaxed font-mono">
              LLD details for this component haven&apos;t been published yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
