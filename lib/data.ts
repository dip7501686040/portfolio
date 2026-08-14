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

export type ProjectMedia = {
  type: "image" | "video"
  src: string
  poster?: string // for video
  alt: string
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
  /** When true, the card shows a "coming soon" hover state instead of opening the gallery/case study. */
  comingSoon?: boolean
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
