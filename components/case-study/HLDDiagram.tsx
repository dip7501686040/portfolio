"use client";

import {
  Monitor,
  Server,
  Radio,
  Cpu,
  Database,
  Bell,
  Activity
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
    <div className="relative z-10 flex w-20 shrink-0 flex-col items-center">
      <button
        type="button"
        onClick={() => onSelect(baseComponentId(flowNodeId))}
        aria-label={`View details for ${component.label}`}
        className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${badgeClass}`}
      >
        <Icon size={18} />
      </button>
      <span className={`mt-2 text-center text-[11px] leading-tight transition-colors duration-300 ${labelClass}`}>
        {component.label}
      </span>
    </div>
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
    <div>
      <div className="overflow-x-auto px-2 pt-5 pb-3">
        <div className="relative flex items-start justify-between gap-2">
          <div className="absolute left-10 right-10 top-[22px] h-px">
            <div className="absolute inset-0 bg-line" />
            <div
              className="absolute inset-y-0 left-0 bg-accent transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {primaryFlowOrder.map((id, idx) => (
            <TimelineNode
              key={`${id}-${idx}`}
              flowNodeId={id}
              state={stateFor(id, activeIds, completedIds)}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-line">
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
  const activeSet = new Set(activeIds);

  return (
    <div className="bg-panel border border-line rounded-xl p-5">
      <div className="eyebrow mb-5">high-level architecture</div>
      <Timeline activeIds={activeSet} completedIds={completedIds} onSelect={onSelect} />
    </div>
  );
}
