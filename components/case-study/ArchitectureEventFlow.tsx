"use client";

import { useState } from "react";
import { eventFlowSteps, type ArchitectureComponentId, type FlowNodeId } from "@/lib/ai-notification";
import HLDDiagram from "./HLDDiagram";
import EventFlowCarousel from "./EventFlowCarousel";
import LLDDrawer from "./LLDDrawer";

export default function ArchitectureEventFlow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState<ArchitectureComponentId | null>(null);

  const activeIds = eventFlowSteps[activeIndex].highlightComponents;
  const completedIds = new Set<FlowNodeId>(
    eventFlowSteps.slice(0, activeIndex).flatMap((s) => s.highlightComponents)
  );

  return (
    <section id="architecture" className="section-pad border-b border-line">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="eyebrow mb-3">architecture</div>
        <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2">
          How an event moves through the system
        </h2>
        <p className="text-muted max-w-2xl mb-8 leading-relaxed">
          Step through the backend event flow — the architecture diagram highlights the component
          handling each step. Click any component for its low-level design.
        </p>

        <div className="space-y-6">
          <HLDDiagram
            activeIds={activeIds}
            completedIds={completedIds}
            onSelect={setSelectedComponent}
          />
          <EventFlowCarousel activeIndex={activeIndex} onChange={setActiveIndex} />
        </div>
      </div>

      <LLDDrawer componentId={selectedComponent} onClose={() => setSelectedComponent(null)} />
    </section>
  );
}
