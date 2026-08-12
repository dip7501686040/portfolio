"use client";

import { useState } from "react";
import {
  Monitor,
  Server,
  Radio,
  Cpu,
  Database,
  Bell,
  Activity,
  Maximize2,
  X
} from "lucide-react";
import {
  architectureComponentMap,
  baseComponentId,
  primaryFlowOrder,
  supportingComponentIds,
  type ArchitectureComponent,
  type ArchitectureComponentId,
  type FlowNodeId
} from "@/lib/ai-notification";

const CATEGORY_ICON: Record<ArchitectureComponent["category"], typeof Server> = {
  client: Monitor,
  service: Server,
  broker: Radio,
  ai: Cpu,
  datastore: Database,
  channel: Bell,
  infra: Activity
};

type NodeState = "active" | "completed" | "idle";

function stateFor(
  flowNodeId: FlowNodeId,
  activeIds: Set<FlowNodeId>,
  completedIds: Set<FlowNodeId>
): NodeState {
  if (activeIds.has(flowNodeId)) return "active";
  if (completedIds.has(flowNodeId)) return "completed";
  return "idle";
}

function TimelineNode({
  flowNodeId,
  state,
  onSelect
}: {
  flowNodeId: FlowNodeId;
  state: NodeState;
  onSelect: (id: ArchitectureComponentId) => void;
}) {
  const component = architectureComponentMap[baseComponentId(flowNodeId)];
  const Icon = CATEGORY_ICON[component.category];

  const badgeClass =
    state === "active"
      ? "border-accent bg-accent text-graphite shadow-[0_0_0_5px_rgb(var(--color-accent)/0.18),0_0_16px_2px_rgb(var(--color-accent)/0.55)] scale-110"
      : state === "completed"
      ? "border-accent/50 bg-accent/10 text-accent"
      : "border-line bg-panel text-muted";

  const labelClass =
    state === "active" ? "text-ink font-semibold" : state === "completed" ? "text-ink" : "text-muted";

  return (
    <button
      type="button"
      onClick={() => onSelect(baseComponentId(flowNodeId))}
      aria-label={`View details for ${component.label}`}
      className="relative z-10 flex w-full items-center gap-3 rounded-lg py-1.5 pr-2 text-left transition-colors hover:bg-panel2/60"
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${badgeClass}`}
      >
        <Icon size={16} />
      </span>
      <span className={`text-sm transition-colors duration-300 ${labelClass}`}>{component.label}</span>
    </button>
  );
}

function Timeline({
  activeIds,
  completedIds,
  onSelect
}: {
  activeIds: Set<FlowNodeId>;
  completedIds: Set<FlowNodeId>;
  onSelect: (id: ArchitectureComponentId) => void;
}) {
  const reached = new Set<FlowNodeId>([...activeIds, ...completedIds]);
  let maxReachedIndex = 0;
  primaryFlowOrder.forEach((id, idx) => {
    if (reached.has(id)) maxReachedIndex = Math.max(maxReachedIndex, idx);
  });
  const progressPct = (maxReachedIndex / (primaryFlowOrder.length - 1)) * 100;

  return (
    <div className="relative">
      <div className="absolute left-[17px] top-5 bottom-5 w-px">
        <div className="absolute inset-x-0 top-0 h-full bg-line" />
        <div
          className="absolute inset-x-0 top-0 bg-accent transition-all duration-500 ease-out"
          style={{ height: `${progressPct}%` }}
        />
      </div>

      <div className="flex flex-col gap-1">
        {primaryFlowOrder.map((id, idx) => (
          <TimelineNode
            key={`${id}-${idx}`}
            flowNodeId={id}
            state={stateFor(id, activeIds, completedIds)}
            onSelect={onSelect}
          />
        ))}
      </div>

      <div className="mt-5 pt-5 border-t border-line">
        <div className="eyebrow mb-3">supporting infrastructure</div>
        <div className="flex flex-wrap gap-2">
          {supportingComponentIds.map((id) => {
            const component = architectureComponentMap[id];
            const Icon = CATEGORY_ICON[component.category];
            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelect(id)}
                aria-label={`View details for ${component.label}`}
                className="flex items-center gap-1.5 rounded-full border border-line bg-panel px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/60 hover:text-accent"
              >
                <Icon size={12} />
                {component.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function HLDDiagram({
  activeIds,
  completedIds,
  onSelect
}: {
  activeIds: FlowNodeId[];
  completedIds: Set<FlowNodeId>;
  onSelect: (id: ArchitectureComponentId) => void;
}) {
  const [zoomed, setZoomed] = useState(false);
  const activeSet = new Set(activeIds);

  return (
    <div className="bg-panel border border-line rounded-xl p-5 relative">
      <div className="flex items-center justify-between mb-4">
        <div className="eyebrow">high-level architecture</div>
        <button
          type="button"
          onClick={() => setZoomed(true)}
          aria-label="Expand architecture diagram"
          className="text-muted hover:text-accent transition-colors lg:hidden"
        >
          <Maximize2 size={16} />
        </button>
      </div>

      <Timeline activeIds={activeSet} completedIds={completedIds} onSelect={onSelect} />

      {zoomed && (
        <div
          className="fixed inset-0 z-50 bg-scrim/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setZoomed(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Architecture diagram"
        >
          <div
            className="w-full max-w-md max-h-[85vh] overflow-y-auto bg-panel border border-line rounded-xl p-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoomed(false)}
              aria-label="Close expanded diagram"
              className="absolute right-3 top-3 bg-scrim/70 text-white border border-line rounded-full p-2 hover:text-danger"
            >
              <X size={18} />
            </button>
            <div className="eyebrow mb-4">high-level architecture</div>
            <Timeline
              activeIds={activeSet}
              completedIds={completedIds}
              onSelect={(id) => {
                setZoomed(false);
                onSelect(id);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
