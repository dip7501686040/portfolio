// Central data + asset config for the AI Notification System case study.
// Nothing in components/case-study/* hardcodes copy or asset paths — it all
// flows through here, so new steps/demos/assets can be added without
// touching UI code.
//
// Content below was extracted directly from the real implementation at
// ~/ai-notification-system (apps/*-service, packages/rabbitmq,
// docker-compose.yml) — not the project's own planning docs, which
// describe an earlier/aspirational design that the final code diverges
// from in places (e.g. RabbitMQ topology, which services exist).

export type ArchitectureComponentId =
  | "application"
  | "api-gateway"
  | "event-service"
  | "rabbitmq"
  | "rule-engine"
  | "ai-service"
  | "notification-service"
  | "channel-service"
  | "notification-channels"
  | "authentication"
  | "tenant-service"
  | "template-service"
  | "postgresql"
  | "redis"
  | "llm-providers"
  | "observability"
  | "analytics-service"
  | "audit-service"
  | "prediction-service"

export type ArchitectureComponent = {
  id: ArchitectureComponentId
  label: string
  category: "client" | "service" | "broker" | "datastore" | "ai" | "infra" | "channel"
  role: string
}

// The catalog of real components in the system. LLD content for each lives
// in `lldDetails` below, keyed by the same id.
export const architectureComponents: ArchitectureComponent[] = [
  {
    id: "application",
    label: "Web Dashboard",
    category: "client",
    role: "Next.js dashboard — submits test events and shows notifications live over Socket.IO"
  },
  {
    id: "api-gateway",
    label: "API Gateway",
    category: "infra",
    role: "Single public entry point — auth, rate limiting, thin gRPC proxy to every service, no business logic"
  },
  {
    id: "event-service",
    label: "Event Service",
    category: "service",
    role: "Validates and stores incoming events, publishes event.created"
  },
  {
    id: "rabbitmq",
    label: "RabbitMQ",
    category: "broker",
    role: "One durable topic exchange (platform) carrying every async message"
  },
  {
    id: "rule-engine",
    label: "Rule Engine Service",
    category: "service",
    role: "Evaluates each tenant's rules against incoming events"
  },
  {
    id: "ai-service",
    label: "AI Service",
    category: "ai",
    role: "Multi-provider LLM analysis plus RAG duplicate detection"
  },
  {
    id: "notification-service",
    label: "Notification Service",
    category: "service",
    role: "Owns the notification lifecycle: creation, retries, dead-lettering"
  },
  {
    id: "channel-service",
    label: "Channel Service",
    category: "service",
    role: "Stateless delivery worker — real SMTP/webhook/Socket.IO dispatch"
  },
  {
    id: "notification-channels",
    label: "Notification Channels",
    category: "channel",
    role: "Email, Webhook, and real-time Dashboard delivery"
  },
  {
    id: "authentication",
    label: "Identity Service",
    category: "infra",
    role: "JWT auth, bcrypt password hashing, Google OAuth, gRPC token validation"
  },
  {
    id: "tenant-service",
    label: "Tenant Service",
    category: "service",
    role: "Organizations, membership, RBAC, and Stripe billing"
  },
  {
    id: "template-service",
    label: "Template Service",
    category: "service",
    role: "{{variable}} rendering for notification content per tenant/channel"
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    category: "datastore",
    role: "Database-per-service — nine separate logical databases, no cross-service joins"
  },
  {
    id: "redis",
    label: "Redis",
    category: "datastore",
    role: "API-key rate limiting and Socket.IO cross-replica pub/sub"
  },
  {
    id: "llm-providers",
    label: "LLM Providers",
    category: "ai",
    role: "OpenAI, Anthropic, and local Ollama models behind one LangChain interface"
  },
  {
    id: "observability",
    label: "Observability",
    category: "infra",
    role: "OpenTelemetry traces/metrics/logs exported to Jaeger, Prometheus, Loki, Grafana"
  },
  {
    id: "analytics-service",
    label: "Analytics Service",
    category: "service",
    role: "Fire-and-forget daily aggregate stats — never blocks the pipeline"
  },
  {
    id: "audit-service",
    label: "Audit Service",
    category: "service",
    role: "Fire-and-forget audit log for logins, rule changes, AI decisions, sends"
  },
  {
    id: "prediction-service",
    label: "Prediction Service",
    category: "ai",
    role: "Reserved for in-house ML models — scaffolded only, not yet built"
  }
]

export const architectureComponentMap: Record<ArchitectureComponentId, ArchitectureComponent> = Object.fromEntries(architectureComponents.map((c) => [c.id, c])) as Record<ArchitectureComponentId, ArchitectureComponent>

// The primary-flow diagram positions RabbitMQ at 4 separate hops even
// though it's one broker instance. Each hop gets its own id (rabbitmq-1..4)
// so a step can highlight *the specific hop it's at* instead of every
// RabbitMQ node glowing together — architectureComponentMap lookups still
// resolve through baseComponentId() below.
export type FlowNodeId = ArchitectureComponentId | "rabbitmq-1" | "rabbitmq-2" | "rabbitmq-3" | "rabbitmq-4"

export function baseComponentId(flowNodeId: FlowNodeId): ArchitectureComponentId {
  return flowNodeId.startsWith("rabbitmq-") ? "rabbitmq" : (flowNodeId as ArchitectureComponentId)
}

// Visual order of the primary event pipeline — the literal path a single
// event takes end to end.
export const primaryFlowOrder: FlowNodeId[] = [
  "application",
  "api-gateway",
  "event-service",
  "rabbitmq-1",
  "rule-engine",
  "rabbitmq-2",
  "ai-service",
  "rabbitmq-3",
  "notification-service",
  "rabbitmq-4",
  "channel-service",
  "notification-channels"
]

// Shown as supporting infrastructure below the primary pipeline — real
// services/dependencies that aren't part of a single event's direct path.
export const supportingComponentIds: ArchitectureComponentId[] = [
  "authentication",
  "tenant-service",
  "template-service",
  "postgresql",
  "redis",
  "llm-providers",
  "observability",
  "analytics-service",
  "audit-service",
  "prediction-service"
]

export type EventFlowStep = {
  id: string
  title: string
  message: string
  description: string
  flowLabel: string
  highlightComponents: FlowNodeId[]
  screenshotKey: keyof typeof aiNotificationAssets.eventFlowScreenshots
}

// The 9 real stages of one event's journey, in the order they were
// actually captured end to end (dashboard submit through both delivery
// channels).
export const eventFlowSteps: EventFlowStep[] = [
  {
    id: "event-submitted",
    title: "Event Submitted",
    message: "HTTP POST /events",
    description: "A test event is submitted from the web dashboard to api-gateway.",
    flowLabel: "Web Dashboard → API Gateway",
    highlightComponents: ["application", "api-gateway"],
    screenshotKey: "eventSubmitted"
  },
  {
    id: "gateway-dispatch",
    title: "Gateway Dispatch",
    message: "gRPC CreateEvent",
    description: "API Gateway resolves the caller's identity and forwards the request to Event Service over internal gRPC.",
    flowLabel: "API Gateway → Event Service (gRPC)",
    highlightComponents: ["api-gateway", "event-service"],
    screenshotKey: "gatewayDispatch"
  },
  {
    id: "event-created",
    title: "Event Created",
    message: "event.created",
    description: "Event Service stores the event and publishes event.created onto RabbitMQ for asynchronous processing.",
    flowLabel: "Event Service → RabbitMQ",
    highlightComponents: ["event-service", "rabbitmq-1"],
    screenshotKey: "eventCreated"
  },
  {
    id: "rule-matched",
    title: "Rule Evaluation & Match",
    message: "event.created → event.rule.matched",
    description: "Rule Engine consumes event.created, evaluates the tenant's active rules, and publishes event.rule.matched with every rule that matched.",
    flowLabel: "RabbitMQ → Rule Engine Service → RabbitMQ",
    highlightComponents: ["rabbitmq-1", "rule-engine"],
    screenshotKey: "ruleMatched"
  },
  {
    id: "ai-processing",
    title: "AI Processing",
    message: "event.rule.matched → event.ai.completed",
    description: "AI Service consumes the matched event, runs an LLM analysis with RAG-based duplicate detection, and publishes event.ai.completed.",
    flowLabel: "RabbitMQ → AI Service → RabbitMQ",
    highlightComponents: ["rabbitmq-2", "ai-service"],
    screenshotKey: "aiProcessing"
  },
  {
    id: "notification-created",
    title: "Notification Processing",
    message: "event.ai.completed → notification.created",
    description: "Notification Service consumes the AI result, creates a notification per matched rule action, and publishes notification.created.",
    flowLabel: "RabbitMQ → Notification Service → RabbitMQ",
    highlightComponents: ["rabbitmq-3", "notification-service"],
    screenshotKey: "notificationCreated"
  },
  {
    id: "channel-dispatch",
    title: "Channel Dispatch",
    message: "notification.created → notification.sent",
    description: "Channel Service consumes notification.created, dispatches through the action's configured channel, and reports the outcome back over RabbitMQ.",
    flowLabel: "RabbitMQ → Channel Service → Notification Channels",
    highlightComponents: ["rabbitmq-4", "channel-service", "notification-channels"],
    screenshotKey: "channelDispatch"
  },
  {
    id: "dashboard-delivery",
    title: "Live Dashboard Delivery",
    message: "Socket.IO push",
    description: "For a dashboard-channel action, the notification appears in the web dashboard in real time over a Socket.IO connection relayed by API Gateway.",
    flowLabel: "Channel Service → API Gateway → Web Dashboard",
    highlightComponents: ["notification-channels", "api-gateway", "application"],
    screenshotKey: "dashboardDelivery"
  },
  {
    id: "email-delivery",
    title: "Email Delivery",
    message: "SMTP delivery",
    description: "For an email-channel action, the same notification is delivered to the recipient's inbox over Gmail SMTP.",
    flowLabel: "Channel Service → Notification Channels (Email)",
    highlightComponents: ["notification-channels"],
    screenshotKey: "emailDelivery"
  }
]

export type LLDDetail = {
  responsibilities?: string[]
  internalFlow?: string
  apis?: string[]
  events?: string[]
  rabbitmqInteraction?: string
  database?: string
  failureHandling?: string
  scaling?: string
  security?: string
}

// Real content pulled from the codebase, keyed by architecture component id.
// A field is omitted (not guessed) wherever nothing concrete was found.
export const lldDetails: Record<ArchitectureComponentId, LLDDetail> = {
  application: {
    responsibilities: ["Submit test events against a tenant", "Show notifications live as they arrive", "Manage tenants, rules, templates, API keys and billing"],
    internalFlow: "Next.js app. Connects to API Gateway's Socket.IO namespace after JWT handshake, subscribes to its tenant's room, and receives notification/notification-status events in real time instead of polling.",
    security: "JWT stored client-side; every request goes through API Gateway, never to a backend service directly."
  },
  "api-gateway": {
    responsibilities: ["The only public entry point for every client request", "Authentication, rate limiting, request routing", "No business logic of its own"],
    internalFlow: "Every backend service's own REST surface was removed in favor of api-gateway proxying each request to the owning service over internal gRPC, after resolving the caller's identity.",
    apis: ["Full REST surface for auth, tenants, events, rules, ai-analyses, notifications, templates, analytics, audit-logs, api-keys, admin, and the Stripe webhook"],
    events: ["Consumes: notification.dashboard.push, notification.status.updated (relayed to the browser over Socket.IO)"],
    rabbitmqInteraction: "Its only RabbitMQ role is consuming those two push events to relay to the correct tenant's Socket.IO room.",
    failureHandling: "A global exception filter maps every downstream gRPC error to the correct HTTP status code.",
    scaling: "Stateless; Socket.IO uses a Redis pub/sub adapter so broadcasts stay correct once more than one replica is running.",
    security:
      "Resolves every bearer token via gRPC to Identity Service rather than verifying JWTs locally. CORS locked to the configured frontend origin, credentials disabled (bearer tokens, not cookies). Redis-backed fixed-window rate limiting per API key. The Stripe webhook route authenticates purely via signature verification, since Stripe calls it directly."
  },
  "event-service": {
    responsibilities: ["Validate and persist incoming events", "Enforce tenant membership on every request", "Publish event.created onto RabbitMQ"],
    internalFlow:
      "Rejects an event outright (400) if no enabled rule could ever match its type, rather than accepting it and silently producing zero notifications. Persists as status: received, publishes event.created, then updates status to published (or failed if the publish throws).",
    apis: ["POST /events (ingest)", "GET /events?tenantId= (paginated/searchable/sortable)", "GET /events/:id"],
    events: ["Publishes: event.created"],
    rabbitmqInteraction: "Publisher only — publishes event.created to the platform topic exchange.",
    database: "PostgreSQL — event_db",
    failureHandling: "A rule-match precheck rejects dead-end events at ingest time. If the RabbitMQ publish itself throws, the event is persisted with status: failed rather than left ambiguous.",
    scaling: "Stateless — horizontally scalable behind API Gateway; RabbitMQ decouples it from every downstream consumer's throughput.",
    security: "Every route requires a valid JWT and tenant membership, both checked over gRPC — never trusts a client-supplied tenantId."
  },
  rabbitmq: {
    responsibilities: ["Single asynchronous messaging backbone for the whole platform"],
    internalFlow:
      "One durable topic exchange named platform. A topic exchange lets multiple independent consumers bind to the same routing key without coordinating — e.g. Rule Engine and AI Service each react to a different key off the same exchange independently.",
    events: [
      "event.created",
      "event.rule.matched",
      "event.ai.completed",
      "notification.created",
      "notification.status.updated",
      "notification.sent",
      "notification.retry",
      "notification.dead",
      "notification.dashboard.push",
      "audit.created"
    ],
    rabbitmqInteraction:
      "Exchange: platform (topic, durable). Queues follow <consumer-service>.<routing-key> (e.g. rule-engine.event.created, channel-service.notification.created), each durable. Publishes are persistent messages; consumers ack on success and nack-without-requeue on a thrown handler error.",
    failureHandling:
      "No dead-letter exchange is configured — a poison message is dropped and logged rather than redelivered forever. End-to-end reliability instead comes from Notification Service's own database-tracked retry/dead-letter state machine, not a broker-level DLQ. The connection layer auto-reconnects and replays every consumer registration on reconnect.",
    scaling: "Single broker instance in this deployment; independent per-consumer queues mean adding a new consumer never affects existing ones.",
    security: "Internal-only, not exposed outside the Docker network."
  },
  "rule-engine": {
    responsibilities: ["CRUD for tenant rules", "Evaluate every active rule against each event.created", "Publish event.rule.matched with every rule that matched"],
    internalFlow:
      "Loads the tenant's enabled rules matching the event type (or a \"*\" wildcard), evaluates each rule's condition tree with a pure in-memory evaluator (AND / OR / NOT / equals / contains / regex / greater-than / less-than over a flattened {type, source, tenantId, ...payload} context), records a match per rule, and publishes exactly one event.rule.matched per event carrying every matched rule — not one message per rule.",
    apis: ["POST/GET/PATCH/DELETE /rules (via API Gateway)"],
    events: ["Consumes: event.created", "Publishes: event.rule.matched, audit.created (on evaluation failure)"],
    rabbitmqInteraction: "Queue rule-engine.event.created bound to platform/event.created. Publishes to platform/event.rule.matched and platform/audit.created.",
    database: "PostgreSQL — rule_engine_db (Rule, RuleMatch)",
    failureHandling: "An evaluation error publishes an audit.created record before re-throwing, so the message is nacked and dropped rather than silently swallowed.",
    scaling: "Stateless consumer — multiple instances can safely bind to the same durable queue for competing-consumer throughput.",
    security: "Rule CRUD requires JWT + tenant membership, the same gRPC-checked pattern as every other service."
  },
  "ai-service": {
    responsibilities: ["Multi-provider LLM analysis of matched events", "RAG-based duplicate detection", "Per-tenant AI provider configuration"],
    internalFlow:
      "Embeds the event text and retrieves semantically similar recent analyses for the same tenant (RAG) before calling the tenant's configured LLM — OpenAI, Anthropic, or a local Ollama model, all behind one LangChain interface with structured output — then persists the analysis and publishes event.ai.completed.",
    apis: ["GET /ai-analyses?tenantId=", "GET /ai-analyses/:id", "GET /ai-analyses/by-event/:eventId", "GET/PUT /ai-config (per-tenant provider/model, owner/admin only)"],
    events: ["Consumes: event.rule.matched", "Publishes: event.ai.completed, audit.created (on failure)"],
    rabbitmqInteraction: "Queue ai-service.event.rule.matched. Publishes to platform/event.ai.completed.",
    database: "PostgreSQL — ai_db (EventAnalysis, TenantAiConfig)",
    failureHandling: "An LLM failure is persisted as an EventAnalysis row with status: failed plus an audit.created event, rather than crashing the consumer or dropping the event silently.",
    scaling: "Stateless consumer; the RAG similarity lookup only queries this tenant's own recent rows.",
    security: "Per-tenant AI provider config is write-gated to owner/admin roles; reads are open to any tenant member."
  },
  "notification-service": {
    responsibilities: ["Own the full notification lifecycle", "Turn a matched rule's actions into tracked notification rows", "Schedule and drive retries"],
    internalFlow:
      "Creates one Notification per configured rule action (merging the rule match and AI analysis into the content, rendering a template if one is set), then publishes notification.created to hand the actual send off to Channel Service — it never calls Channel Service directly. Reacts to Channel Service's outcome events to update each row's status, and a poller republishes notification.created to redrive anything past its retry time.",
    apis: ["GET /notifications?tenantId=&status=", "GET /notifications/:id", "PATCH /notifications/:id/read"],
    events: [
      "Consumes: event.ai.completed, notification.sent, notification.retry, notification.dead, notification.dashboard.push",
      "Publishes: notification.created, notification.status.updated, audit.created (on failure)"
    ],
    rabbitmqInteraction:
      "Queues: notification-service.event.ai.completed and one per outcome event. Publishes notification.created (new + retry redispatch) and notification.status.updated (live dashboard refresh signal).",
    database: "PostgreSQL — notification_db (status: pending → dispatching → sent | retrying → dead_letter)",
    failureHandling:
      "A retry scheduler polls on an interval, claims due rows before redispatching (so the next tick can't double-claim), and republishes notification.created; Channel Service's backoff schedule decides the next-attempt time and max attempts before a row is marked dead_letter.",
    scaling: "Stateless consumer plus an in-process interval poller for retries — not a distributed job queue yet.",
    security: "Read endpoints require JWT + tenant membership; a 404 (not 403) is returned for a non-member so existence isn't leaked."
  },
  "channel-service": {
    responsibilities: ["Actually deliver a notification through its configured channel", "Report the delivery outcome back to Notification Service"],
    internalFlow:
      "For the dashboard channel, publishes notification.dashboard.push directly (always counts as delivered — no retry semantics for a live push). For every other channel, calls the matching connector (Email over Gmail SMTP, or Webhook over HTTP with an 8s timeout); on success publishes notification.sent, on failure publishes notification.retry (with backoff) or notification.dead once max attempts are hit.",
    events: ["Consumes: notification.created", "Publishes: notification.sent, notification.retry, notification.dead, notification.dashboard.push"],
    rabbitmqInteraction: "Queue channel-service.notification.created. Stateless — attempts/maxAttempts travel in the message itself.",
    database: "None — stateless by design",
    failureHandling: "Both connectors fail gracefully ({success:false, error}) rather than throwing, feeding the same retry/dead-letter reporting path as any other failure.",
    scaling: "Stateless — a slow email/webhook provider only blocks this consumer's own queue, never Notification Service's.",
    security: "No REST surface and no API Gateway route — reachable only as an internal RabbitMQ consumer."
  },
  "notification-channels": {
    responsibilities: ["The delivery surfaces a user actually sees a notification on"],
    internalFlow:
      "Three real channels exist today: Email (Gmail SMTP via nodemailer), Webhook (HTTP POST, 8s timeout, success = any 2xx), and Dashboard (Socket.IO push relayed by API Gateway). Channel and target come from the matched rule's configured action.",
    security: "Dashboard delivery requires the browser's Socket.IO connection to complete a JWT handshake and tenant-membership check before receiving anything for that tenant's room."
  },
  authentication: {
    responsibilities: ["User accounts, password auth, Google OAuth", "Issue and validate JWTs for every other service"],
    internalFlow: "Register/login hash passwords with bcrypt and issue a JWT. Every other service validates a bearer token by calling this service's ValidateToken gRPC method rather than verifying it locally.",
    apis: ["POST /auth/register, /auth/login", "GET /auth/me", "POST /auth/forgot-password, /auth/reset-password", "GET /auth/google, /auth/google/callback"],
    database: "PostgreSQL — identity_db (User, PasswordResetToken)",
    failureHandling: "Forgot/reset-password tokens are SHA-256-hashed with a 1-hour expiry, single-use.",
    scaling: "Stateless; horizontally scalable behind API Gateway's gRPC calls.",
    security: "bcrypt password hashing; JWT bearer auth; Google OAuth only registers when real client credentials are configured for the deployment."
  },
  "tenant-service": {
    responsibilities: ["Organizations, membership, RBAC", "Stripe billing (checkout, portal, cancel)", "gRPC membership checks for every other service"],
    internalFlow:
      "Owns Tenant/TenantMember data plus a real Stripe integration — creates a Stripe customer, a Checkout Session for paid plans, a Billing Portal session, and applies webhook-verified subscription events. API Gateway only verifies the Stripe webhook signature at the edge; Tenant Service is the only place that calls the Stripe API.",
    apis: ["POST/GET/PATCH/DELETE /tenants + membership endpoints", "POST /tenants/:id/billing/checkout|portal|cancel"],
    rabbitmqInteraction: "None — reached over gRPC only (CheckMembership/GetTenant), used by nearly every other service to authorize a request.",
    database: "PostgreSQL — tenant_db",
    failureHandling: "Stripe is treated as the source of truth for subscription state — cancellation reverts the plan only once the subscription-deleted webhook is applied, not optimistically.",
    scaling: "Stateless.",
    security: "403 for a non-owner/admin managing settings, 401 with no token, 404 (not 403) for a non-member tenant lookup, 403 removing a tenant's last owner."
  },
  "template-service": {
    responsibilities: ["{{variable}} rendering for notification content"],
    internalFlow:
      "A template is keyed by (tenantId, name, channel), since the same logical template needs a different shape per channel. Notification Service calls an internal RenderTemplate gRPC method (not exposed publicly) when a rule action sets a template name; a missing template falls back to the flattened event context rather than a placeholder.",
    apis: ["POST/GET/PATCH/DELETE /templates (via API Gateway)"],
    rabbitmqInteraction: "None — reached over gRPC only.",
    database: "PostgreSQL — template_db",
    scaling: "Stateless.",
    security: "Standard JWT + tenant-membership auth on the CRUD surface."
  },
  postgresql: {
    responsibilities: ["Durable storage, one logical database per service"],
    internalFlow:
      "identity_db, tenant_db, event_db, rule_engine_db, ai_db, notification_db, template_db, analytics_db, audit_db — one PostgreSQL instance, nine separate databases, no cross-service SQL joins. Each service owns its schema via Prisma.",
    scaling: "Single instance in this deployment; database-per-service keeps each service's schema and migrations independent.",
    security: "Reached only from inside the Docker network by the service that owns it."
  },
  redis: {
    responsibilities: ["API-key rate limiting", "Socket.IO cross-replica pub/sub"],
    internalFlow:
      "API Gateway uses a fixed-window counter (per API key, per minute) for rate limiting, and a separate Redis pub/sub pair backs the Socket.IO adapter so tenant-room broadcasts stay correct across replicas.",
    scaling: "Correct even at today's single-replica scale — it's the standard fix the moment a second API Gateway replica exists, not a premature optimization."
  },
  "llm-providers": {
    responsibilities: ["External LLM inference for AI Service"],
    internalFlow:
      "AI Service supports OpenAI, Anthropic, and local Ollama models, selected per tenant, behind one LangChain provider with structured output — one prompt, one schema, one code path regardless of provider. Ollama also runs an embedding model locally for the RAG similarity step.",
    security: "An unconfigured provider is rejected at config-write time instead of accepted and left to fail silently later."
  },
  observability: {
    responsibilities: ["Distributed tracing, metrics, and structured logs across every service"],
    internalFlow:
      "Every service runs an OpenTelemetry SDK with auto-instrumentation (including the RabbitMQ client, so publishes/consumes are traced for free), exporting over OTLP-gRPC to an otel-collector, which feeds Jaeger (traces), Prometheus (metrics), and Loki (logs). Grafana is the shared dashboard layer; cAdvisor adds container-level metrics."
  },
  "analytics-service": {
    responsibilities: ["Daily aggregate stats for the dashboard's historical view"],
    internalFlow: "Consumes event.created, notification.sent, and notification.dashboard.push off the platform exchange and upserts daily counters — never touches production traffic synchronously.",
    apis: ["GET /analytics/daily-events", "GET /analytics/top-sources", "GET /analytics/notifications"],
    events: ["Consumes: event.created, notification.sent, notification.dashboard.push"],
    rabbitmqInteraction: "Fire-and-forget consumer only — never publishes.",
    database: "PostgreSQL — analytics_db (DailyEventStat, DailyNotificationStat)",
    scaling: "A slow or down Analytics Service never blocks the notification pipeline — it's a passive consumer on the same durable exchange."
  },
  "audit-service": {
    responsibilities: ["Audit trail across the platform"],
    internalFlow:
      "Consumes audit.created (a generic key reused by Rule Engine, AI Service, and Notification Service for their own action/failure events) plus notification.sent and event.ai.completed directly, and writes an audit log row for each.",
    apis: ["GET /audit-logs", "GET /audit-logs/me"],
    events: ["Consumes: audit.created, notification.sent, event.ai.completed"],
    database: "PostgreSQL — audit_db",
    scaling: "Fire-and-forget consumer, same pattern as Analytics Service."
  },
  "prediction-service": {
    responsibilities: ["Reserved for in-house ML models (e.g. fraud detection, forecasting) — separate from AI Service's external LLM calls"],
    internalFlow: "Scaffolded only today: a Python service exposing just a gRPC health check. No prediction models or endpoints are implemented yet.",
    database: "None yet"
  }
}

export type TechBadge = {
  name: string
  status?: "roadmap"
}

export type EngineeringDemo = {
  id: string
  title: string
  category: string
  description: string
}

export const engineeringDemos: EngineeringDemo[] = [
  {
    id: "authentication",
    title: "Authentication",
    category: "Security",
    description: "JWT auth with bcrypt-hashed passwords, Google OAuth, and gRPC-validated tokens across every service."
  },
  {
    id: "authorization",
    title: "Authorization",
    category: "Security",
    description: "Per-tenant RBAC — role checks enforced both at the gateway and inside each owning service."
  },
  {
    id: "rabbitmq-flow",
    title: "RabbitMQ Event Flow",
    category: "Architecture",
    description: "A single durable topic exchange (platform) carrying every async message across the pipeline."
  },
  {
    id: "ai-processing",
    title: "AI Processing",
    category: "AI",
    description: "Multi-provider LLM analysis (OpenAI, Anthropic, or local Ollama via LangChain) with RAG-based duplicate detection."
  },
  {
    id: "deployment",
    title: "Deployment",
    category: "Infrastructure",
    description: "Dockerized microservices orchestrated with docker-compose today; Kubernetes is on the roadmap, not yet deployed."
  },
  {
    id: "observability",
    title: "Observability",
    category: "Infrastructure",
    description: "Distributed tracing, metrics and logs via OpenTelemetry, exported to Jaeger, Prometheus, Loki and Grafana."
  },
  {
    id: "billing",
    title: "Billing & Payments",
    category: "Product",
    description: "Real Stripe integration — Checkout Sessions, Billing Portal, and webhook-verified subscription sync."
  },
  {
    id: "scaling",
    title: "Scaling",
    category: "Infrastructure",
    description: "Stateless RabbitMQ consumers scale independently of each other and of the request path."
  },
  {
    id: "database-caching",
    title: "Database & Caching",
    category: "Data",
    description: "Database-per-service across nine PostgreSQL databases, plus Redis for rate limiting and Socket.IO fan-out."
  },
  {
    id: "security",
    title: "Security",
    category: "Security",
    description: "gRPC-only internal calls, server-side tenant checks on every request, Stripe webhook signature verification, Redis-backed API-key rate limiting."
  },
  {
    id: "notification-channels",
    title: "Notification Channels",
    category: "Product",
    description: "Email (Gmail SMTP), Webhook, and real-time dashboard delivery over Socket.IO."
  },
  {
    id: "failure-handling",
    title: "Failure Handling & Idempotency",
    category: "Reliability",
    description: "Retry/dead-letter tracked in Postgres by Notification Service, not a RabbitMQ DLQ — poison messages are dropped and logged, not redelivered forever."
  },
  {
    id: "api-event-design",
    title: "API & Event Design",
    category: "Architecture",
    description: "Every public REST route is a thin API Gateway proxy over internal gRPC to the service that owns it."
  }
]

export const caseStudyContent = {
  heroTitle: "AI Notification System",
  heroTagline: "Event-driven AI notification infrastructure built with microservices and RabbitMQ.",
  techBadges: [
    { name: "Node.js" },
    { name: "TypeScript" },
    { name: "NestJS" },
    { name: "RabbitMQ" },
    { name: "PostgreSQL" },
    { name: "Redis" },
    { name: "OpenAI" },
    { name: "Docker" },
    { name: "Kubernetes", status: "roadmap" as const },
    { name: "OpenTelemetry" }
  ] satisfies TechBadge[],
  problem:
    "Reacting to product and system events in real time — evaluating rules, generating context-aware notification content, and delivering it through the right channel — doesn't fit cleanly into a single request/response path without coupling every step together and failing under load.",
  solution:
    "An event-driven system where rule evaluation, AI content generation, and delivery each run as independent services, communicating asynchronously over a single RabbitMQ exchange so the pipeline stays resilient and each stage can scale on its own."
}

// Local/CDN asset paths. Empty strings render as clearly-marked "pending"
// placeholders in the UI rather than a broken image/video.
export const aiNotificationAssets = {
  productVideo: "https://res.cloudinary.com/dhexmnaxl/video/upload/v1786456324/Full_product_demo_ui_dv_edited_vor33x.mp4",
  // No separate poster was provided — reusing the first real pipeline
  // screenshot (the event-submit UI) rather than a generic placeholder.
  productPoster: "https://res.cloudinary.com/dhexmnaxl/image/upload/v1786456292/Event_Send_UI_ec8ggr.png",
  github: "https://github.com/dip7501686040/ai-notification-system",
  liveDemo: "https://ainotification.duckdns.org",
  eventFlowScreenshots: {
    eventSubmitted: "https://res.cloudinary.com/dhexmnaxl/image/upload/v1786456292/Event_Send_UI_ec8ggr.png",
    gatewayDispatch: "https://res.cloudinary.com/dhexmnaxl/image/upload/v1786456291/api-gateway_dispatch_createEvent_g7ptqf.png",
    eventCreated: "https://res.cloudinary.com/dhexmnaxl/image/upload/v1786456291/event-service_publish_event.created_wmjok1.png",
    ruleMatched: "https://res.cloudinary.com/dhexmnaxl/image/upload/v1786456294/rule-engine_servcie_consume_event.created_and_publish_event.rule.matched_ht9bhm.png",
    aiProcessing: "https://res.cloudinary.com/dhexmnaxl/image/upload/v1786456298/rule-engine_servcie_consume_event.created_ubmi6u.png",
    notificationCreated: "https://res.cloudinary.com/dhexmnaxl/image/upload/v1786456301/notification-service_consume_event.ai.completed_and_publish_notification.created_t7e0do.png",
    channelDispatch: "https://res.cloudinary.com/dhexmnaxl/image/upload/v1786456291/channel-servcie_consume_notification.created_and_publish_notfication.sent_l4irve.png",
    dashboardDelivery: "https://res.cloudinary.com/dhexmnaxl/image/upload/v1786456294/Recived_notfication_with_socket.io_connection_in_dashboard_zuae7o.png",
    emailDelivery: "https://res.cloudinary.com/dhexmnaxl/image/upload/v1786456292/Recieved_notification_in_email_tzmmdw.png"
  },
  // Keyed by EngineeringDemo.id — populate as previews become available.
  engineeringDemoPreviews: {} as Record<string, string>
}
