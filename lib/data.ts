export const profile = {
  name: "Dipankar Saha",
  title: "Senior Backend / Full Stack Engineer | AI & Distributed Systems",
  location: "Kolkata, India",
  availability: "Open to remote & relocation",
  email: "dip7501686040@gmail.com",
  phone: "+917001733750", // used for tel: and wa.me links, no spaces/symbols
  phoneDisplay: "+91 70017 33750",
  github: "https://github.com/dip7501686040",
  linkedin: "https://linkedin.com/in/dipankar-saha-247725153",
  yearsExperience: 6,
  resumeFile: "/Dipankar_Saha_Resume.pdf"
}

export const stats = [
  { label: "Years experience", value: "6+" },
  { label: "Response time", value: "<24h" },
  { label: "Timezone overlap", value: "IST / EST / GMT" },
  { label: "Status", value: "Available" }
]

export const skillGroups = [
  {
    label: "Backend",
    skills: ["Node.js", "NestJS", "TypeScript", "REST APIs", "GraphQL", "gRPC", "JWT", "OAuth2"]
  },
  {
    label: "Frontend",
    skills: ["React.js", "Next.js", "JavaScript (ES6+)", "Tailwind CSS"]
  },
  {
    label: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma"]
  },
  {
    label: "Messaging & Events",
    skills: ["RabbitMQ", "Event-Driven Architecture", "Microservices Design"]
  },
  {
    label: "AI & LLM",
    skills: ["OpenAI API Integration", "Generative AI", "Prompt Engineering", "LLM-based Workflow Design"]
  },
  {
    label: "Cloud & DevOps",
    skills: ["AWS (EC2, S3, EKS)", "Docker", "Kubernetes", "Nginx", "GitHub Actions", "Jenkins", "CI/CD"]
  },
  {
    label: "Observability",
    skills: ["OpenTelemetry", "Prometheus", "Grafana", "Jaeger", "Loki"]
  }
]

export const experience = [
  {
    role: "Senior Software Engineer",
    company: "Veztraa Solutions",
    location: "Remote",
    period: "Mar 2023 — Present",
    points: [
      "Designed and developed enterprise-scale SaaS applications using React, Next.js, TypeScript, Node.js, and NestJS.",
      "Led architecture discussions for scalable cloud-native applications following microservices architecture.",
      "Designed modular backend services with REST APIs and event-driven messaging.",
      "Implemented secure authentication and authorization using JWT and Role-Based Access Control (RBAC).",
      "Optimized MongoDB aggregation pipelines and MySQL queries through indexing and schema tuning.",
      "Containerized applications with Docker and deployed workloads to Kubernetes clusters on AWS.",
      "Built automated CI/CD pipelines using GitHub Actions and Jenkins, and mentored junior engineers."
    ],
    tech: ["React", "Next.js", "TypeScript", "Node.js", "NestJS", "Docker", "Kubernetes", "MySQL", "MongoDB", "RabbitMQ", "AWS", "GitHub Actions", "Jenkins"]
  },
  {
    role: "Software Engineer",
    company: "Tata Consultancy Services (TCS)",
    location: "Kolkata, India",
    period: "Apr 2021 — Feb 2023",
    points: [
      "Developed enterprise insurance applications for Zurich Insurance using Angular and Node.js.",
      "Built scalable REST APIs and frontend modules supporting high-volume business workflows.",
      "Worked closely with distributed teams following Agile/Scrum methodology.",
      "Fixed production issues while maintaining high application availability.",
      "Improved application performance and reduced production defects through proactive optimization."
    ],
    tech: ["Angular", "Node.js", "JavaScript", "REST APIs", "MySQL", "Git"]
  },
  {
    role: "Software Engineer",
    company: "Asparrowtech",
    location: "Indore, India",
    period: "Jun 2020 — Mar 2021",
    points: [
      "Developed responsive web applications using JavaScript frameworks and Node.js.",
      "Built backend APIs and integrated third-party services.",
      "Worked on database design, application enhancements, and bug fixes.",
      "Collaborated with clients to deliver custom software solutions."
    ],
    tech: ["JavaScript", "Node.js", "REST APIs"]
  }
]

import { coverDataUri } from "./case-study-cover"

export type ProjectMedia = {
  type: "image" | "video"
  src: string
  poster?: string // for video
  alt: string
}

/** One "Technical deep dive" card. Only rendered items live here — no placeholders. */
export type ContentCard = {
  /** matches the Personal Growth knowledge-graph feature slug */
  featureKey: string
  title: string
  kind: "video" | "screenshot" | "diagram"
  src: string // Cloudinary delivery URL
  poster?: string // for video
  caption: string
  /** the linked feature's GitHub reference, resolved by the Personal Growth
   *  app (Group C) — omitted when the card has no linked feature. */
  code?: { repoUrl: string | null; links: { label: string; url: string }[] } | null
}

export type CaseStudy = {
  tagline: string
  problem: string
  solution: string
  highlights: string[]
  links: { label: string; url: string }[]
  /** the deep-dive grid — section is hidden entirely when empty */
  content: ContentCard[]
}

export type Project = {
  slug: string
  title: string
  summary: string
  description: string
  tags: string[]
  tech: string[]
  media: ProjectMedia[]
  /** When true, the project card links to /projects/{slug} instead of opening the gallery modal. */
  hasCaseStudy?: boolean
  /** When set, the card links to this external URL instead of an internal case-study page or the gallery modal. */
  caseStudyUrl?: string
  /** Overrides the default "Open case study" hover label when caseStudyHref is set. */
  ctaLabel?: string
  /** When true, the project card also lists the tech stack below the tags. */
  showTechOnCard?: boolean
  /** Rendered by the generic /projects/[slug] page. (ai-notification-system has a bespoke page instead.) */
  caseStudy?: CaseStudy
}

export const projects: Project[] = [
  {
    slug: "ai-notification-system",
    title: "AI-Powered Event-Driven Notification System",
    summary: "Cloud-native notification platform with an AI-assisted decision engine for intelligent, multi-channel routing.",
    description:
      "A microservices platform that routes notifications across channels using an AI-assisted decision engine. Services communicate over gRPC and RabbitMQ, run on Kubernetes, and are fully observable with OpenTelemetry, backed by PostgreSQL and Redis.",
    tags: ["AI", "Microservices", "Event-Driven"],
    tech: ["Node.js", "TypeScript", "NestJS", "gRPC", "RabbitMQ", "PostgreSQL", "Redis", "OpenAI", "Docker", "Kubernetes", "OpenTelemetry"],
    media: [{ type: "image", src: "https://res.cloudinary.com/dhexmnaxl/image/upload/v1786515486/ChatGPT_Image_Aug_12_2026_11_44_02_AM_hdggrp.png", alt: "Notification platform architecture diagram" }],
    hasCaseStudy: true
  },
  {
    slug: "personal-growth-ai-os",
    title: "Personal Growth AI OS",
    summary: "A private system that distills real engineering work into a proof-of-skills knowledge graph feeding career, content, and learning agents.",
    description:
      "Next.js 16 + Supabase (Drizzle, RLS). Real engineering work is ingested into a pgvector RAG knowledge graph with cross-source duplicate detection and deterministic entity linking; eight structured LLM agents run over it behind a provider ladder. A deterministic retrieval endpoint maps any role's requirements to proof from shipped features.",
    tags: ["AI", "RAG", "Agents"],
    tech: ["Next.js 16", "TypeScript", "PostgreSQL", "pgvector", "Drizzle", "LangGraph", "OpenAI / Anthropic", "Cloudflare R2"],
    media: [{ type: "image", src: coverDataUri("Personal Growth AI OS"), alt: "Personal Growth AI OS" }],
    hasCaseStudy: true,
    caseStudy: {
      tagline: "A proof-of-skills knowledge graph, and the agents that run on it.",
      problem:
        "Career, content and learning tools don't know what you've actually built. Résumés and profiles drift from reality, and the proof of a skill lives scattered across repos, PRs and demos.",
      solution:
        "A private system that ingests real engineering work into a pgvector RAG knowledge graph with deterministic entity linking, then runs eight structured LLM agents (career, content, learning, …) over it behind a provider ladder. A deterministic proof-of-work endpoint — exposed over MCP — maps a role's requirements to matching shipped features.",
      highlights: [
        "Next.js 16 App Router + Supabase Postgres (Drizzle, RLS); pgvector RAG knowledge base with cross-source duplicate detection and deterministic entity linking.",
        "Eight structured LLM agents behind a provider-ladder abstraction (Gemini / OpenAI / Anthropic) with automatic fallback; a LangGraph extraction agent.",
        "A deterministic proof-of-work retrieval endpoint (over MCP) that maps role requirements to shipped features.",
        "Cloudflare R2-backed application pipeline: assisted browser form-fill, Gmail-draft outreach, per-job multi-channel tracking.",
      ],
      links: [
        { label: "View source", url: "https://github.com/dip7501686040/personal-growth-ai-os" },
      ],
      content: [],
    },
  },
  {
    slug: "platform-infrastructure",
    title: "Platform Infrastructure — Terraform + local AWS",
    summary: "A reproducible AWS-shaped Kubernetes runtime defined in Terraform and brought up by a serial, idempotent chain.",
    description:
      "Terraform modules describe an AWS-shaped runtime (EKS / ECR / ELBv2) that a serial, idempotent bring-up chain provisions locally — two clusters with cross-cluster networking, a self-hosted GitHub Actions apply pipeline, a self-healing CPU-arbitration watchdog, and an observability stack provisioned as containers.",
    tags: ["Infrastructure", "Terraform", "Kubernetes"],
    tech: ["Terraform", "AWS", "EKS", "Kubernetes", "GitHub Actions", "Prometheus", "Grafana", "Bash"],
    media: [{ type: "image", src: coverDataUri("Platform Infrastructure"), alt: "Platform Infrastructure" }],
    hasCaseStudy: true,
    caseStudy: {
      tagline: "A realistic multi-cluster Kubernetes environment, with no cloud bill.",
      problem:
        "Standing up a realistic multi-cluster Kubernetes environment for development shouldn't require a cloud bill or an afternoon of manual steps — and it should tear down and rebuild the same way every time.",
      solution:
        "Terraform modules describe an AWS-shaped runtime (EKS / ECR / ELBv2). A serial, idempotent bring-up chain provisions it locally with cross-cluster networking, a self-hosted GitHub Actions apply pipeline, a self-healing CPU-arbitration watchdog with a minimal-touch restart reconcile, and a Prometheus / Grafana stack provisioned as containers.",
      highlights: [
        "Reusable AWS Terraform modules (ECR / EKS / network); local AWS emulation with a dual-target graph; ALB fronting via ELBv2 emulation.",
        "Serial, idempotent cluster bring-up chain; two-cluster topology with cross-cluster networking.",
        "Self-hosted GitHub Actions apply pipeline; CPU arbitration & self-healing watchdog with a minimal-touch restart reconcile.",
        "Observability stack (Prometheus / Grafana) provisioned as containers.",
      ],
      links: [
        { label: "View source", url: "https://github.com/dip7501686040/platform-infrastructure" },
      ],
      content: [],
    },
  },
  {
    slug: "platform-gitops",
    title: "Platform GitOps — Helm + ArgoCD delivery",
    summary: "Reproducible, auditable Kubernetes delivery for a 13-service platform: every change to what runs in the cluster is a git commit ArgoCD reconciles.",
    description:
      "One shared Helm chart templates 11 NestJS services, layered with per-service / per-environment values. ArgoCD auto-syncs from git with a bounded RollingSync ApplicationSet; database migrations run as an ArgoCD PreSync hook keyed by a schema hash; a Helm-managed Jenkins pipeline builds images and commits the tag bump back.",
    tags: ["GitOps", "Kubernetes", "CI/CD"],
    tech: ["Helm", "ArgoCD", "Kubernetes", "Jenkins", "GitOps"],
    media: [{ type: "image", src: coverDataUri("Platform GitOps"), alt: "Platform GitOps" }],
    hasCaseStudy: true,
    caseStudy: {
      tagline: "Every change to the cluster is a git commit ArgoCD reconciles.",
      problem:
        "A multi-service platform needs releases that are auditable and reproducible — and a multi-service release shouldn't spike the cluster when many charts change at once.",
      solution:
        "One shared Helm chart templates 11 NestJS services, layered with per-service, per-environment values. ArgoCD auto-syncs from git with a bounded RollingSync ApplicationSet (maxUpdate 1). DB migrations run as an ArgoCD PreSync hook Job keyed by a schema hash — an unchanged schema is a no-op. Jenkins, itself a Helm-managed workload, builds each image and commits the tag bump back for ArgoCD.",
      highlights: [
        "One shared Helm chart for 11 NestJS services; per-service, per-environment values layering.",
        "ArgoCD GitOps auto-sync with a bounded RollingSync ApplicationSet so a multi-service release doesn't spike CPU.",
        "Database migrations as an ArgoCD PreSync hook, keyed by a schema hash.",
        "Jenkins as a Helm-managed Kubernetes workload; builds and pushes each image and commits the tag bump.",
      ],
      links: [
        { label: "View source", url: "https://github.com/dip7501686040/platform-gitops" },
      ],
      content: [],
    },
  },
  {
    slug: "portfolio",
    title: "This Portfolio",
    summary: "A Next.js portfolio with case studies and a project catalog, with /proof and /work pages backed by the Personal Growth public API.",
    description:
      "Next.js App Router site: a resume-derived home page, a project catalog with a media lightbox, multi-theme support, and /proof + /work pages that render shipped features and skills straight from the Personal Growth AI OS public API. Per-project content cards are fed from a Cloudinary-hosted media manifest.",
    tags: ["Portfolio", "Next.js"],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    media: [{ type: "image", src: coverDataUri("This Portfolio"), alt: "Portfolio" }],
    hasCaseStudy: true,
    caseStudy: {
      tagline: "A portfolio that renders verifiable proof from a live API.",
      problem:
        "A portfolio should show verifiable proof, not just claims — and stay current without hand-editing every time something ships.",
      solution:
        "A Next.js App Router site with case studies and a project catalog with a media lightbox. The /proof and /work pages are backed by the Personal Growth AI OS public API, so shipped features and skills render directly from the knowledge graph. Per-project deep-dive cards are fed from a Cloudinary-hosted media manifest.",
      highlights: [
        "Next.js App Router; resume-derived home page; project catalog with a media lightbox; multi-theme support (dark / light / gradient).",
        "/proof and /work pages backed by the Personal Growth public API.",
        "Per-project content cards fed from a Cloudinary media manifest.",
      ],
      links: [
        { label: "View source", url: "https://github.com/dip7501686040/portfolio" },
        { label: "Live", url: "https://dipankarsaha.vercel.app" },
      ],
      content: [],
    },
  },
  {
    slug: "logbook-management",
    title: "Japshop Admin Panel — Daily Financial Logbook",
    summary: "Digital ledger admin panel for a retail business, replacing paper logbooks with per-customer credit/debit tracking and granular RBAC.",
    description:
      "A production admin panel where staff log per-customer GAVE/GOT (credit/debit) entries across multiple logbooks, with running balances calculated per customer. Access is controlled by a two-layer RBAC model — role-based menu permissions plus per-user, per-logbook CRUD permissions — with OTP-gated superadmin login and a database-driven navigation menu.",
    tags: ["Admin Panel", "Multi-Tenant", "RBAC"],
    tech: ["Next.js", "React", "NestJS", "Prisma", "PostgreSQL", "JWT", "Tailwind CSS", "Docker", "Kubernetes"],
    media: [{ type: "image", src: "https://res.cloudinary.com/dhexmnaxl/image/upload/v1786688217/customers_page_n2ub6n.png", alt: "Japshop logbook customer ledger admin panel" }],
    caseStudyUrl: "https://elfin-okra-67f.notion.site/Japshop-Admin-Panel-Daily-Financial-Logbook-2513c6505e4c803fbebafc1df857c54f?source=copy_link"
  },
  {
    slug: "school-management",
    title: "School Management MVP",
    summary: "School admissions platform with a multi-step application flow, a student portal, and an admin panel for reviewing enrollments.",
    description:
      "A full-stack MVP for school admissions and operations. Prospective students submit applications through a multi-step form (student details, contact info, review) and track status from a personal dashboard, while admins sign in to a dedicated panel to review stats, manage the applications queue, and approve or reject enrollments. Built with Next.js App Router and Radix UI primitives for accessible dialogs, dropdowns, and tabs.",
    tags: ["Education", "Admin Panel", "Full Stack"],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Radix UI", "React Hook Form"],
    media: [{ type: "image", src: "https://res.cloudinary.com/dhexmnaxl/image/upload/v1786713310/dashboard_upzoqt.png", alt: "School management admin dashboard" }],
    caseStudyUrl: "https://school-mgt-mvp.vercel.app",
    ctaLabel: "See live demo",
    showTechOnCard: true
  }
]
