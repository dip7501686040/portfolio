export const profile = {
  name: "Dipankar Saha",
  title: "Senior Full Stack AI Engineer",
  location: "West Bengal, India",
  availability: "Open to remote & relocation",
  email: "dip7501686040@gmail.com",
  phone: "+917001733750", // used for tel: and wa.me links, no spaces/symbols
  phoneDisplay: "+91 70017 33750",
  github: "https://github.com/dip7501686040",
  linkedin: "https://linkedin.com/in/dipankar-saha-247725153",
  yearsExperience: 6,
  resumeFile: "/resume.pdf"
};

export const stats = [
  { label: "Years experience", value: "6+" },
  { label: "Response time", value: "<24h" },
  { label: "Timezone overlap", value: "IST / EST / GMT" },
  { label: "Status", value: "Available" }
];

export const skillGroups = [
  {
    label: "Frontend",
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS"]
  },
  {
    label: "Backend",
    skills: ["Node.js", "NestJS", "REST APIs", "GraphQL", "gRPC", "JWT", "OAuth2"]
  },
  {
    label: "AI & LLM",
    skills: ["OpenAI API Integration", "RAG Pipelines", "Embeddings", "pgvector", "Vector Search"]
  },
  {
    label: "Cloud & DevOps",
    skills: ["AWS (EC2, S3)", "Docker", "Kubernetes", "Nginx", "GitHub Actions", "CI/CD"]
  },
  {
    label: "Databases",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis"]
  },
  {
    label: "Observability",
    skills: ["OpenTelemetry", "Prometheus", "Grafana", "Jaeger", "Loki"]
  }
];

export const experience = [
  {
    role: "Senior Software Engineer",
    company: "Innoways",
    location: "Remote — Hong Kong",
    period: "Mar 2023 — Present",
    points: [
      "Designed enterprise-scale SaaS applications using React, Next.js, TypeScript, Node.js, and NestJS.",
      "Led architecture discussions for cloud-native applications following microservices architecture.",
      "Implemented secure authentication with JWT and Role-Based Access Control (RBAC).",
      "Optimized MongoDB aggregation pipelines and MySQL queries for performance.",
      "Containerized applications with Docker and deployed to Kubernetes clusters.",
      "Built automated CI/CD pipelines with GitHub Actions and mentored junior engineers."
    ],
    tech: ["React", "Next.js", "TypeScript", "Node.js", "NestJS", "Docker", "Kubernetes", "MongoDB", "AWS"]
  },
  {
    role: "Software Engineer",
    company: "Tata Consultancy Services (TCS)",
    location: "India",
    period: "Apr 2021 — Mar 2023",
    points: [
      "Developed enterprise insurance applications for Zurich Insurance using Angular and Node.js.",
      "Built scalable REST APIs and frontend modules supporting high-volume business workflows.",
      "Worked with distributed teams following Agile/Scrum methodology.",
      "Improved application performance and reduced production defects through proactive optimization."
    ],
    tech: ["Angular", "Node.js", "REST APIs", "MySQL", "Git"]
  },
  {
    role: "Software Engineer",
    company: "Asparrowtech",
    location: "India",
    period: "Jun 2020 — Dec 2021",
    points: [
      "Developed responsive web applications using JavaScript frameworks and Node.js.",
      "Built backend APIs and integrated third-party services.",
      "Collaborated directly with clients to deliver custom software solutions."
    ],
    tech: ["JavaScript", "Node.js", "REST APIs"]
  }
];

export type ProjectMedia = {
  type: "image" | "video";
  src: string;
  poster?: string; // for video
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  tech: string[];
  media: ProjectMedia[];
};

export const projects: Project[] = [
  {
    slug: "ai-notification-platform",
    title: "AI-Powered Event-Driven Notification Platform",
    summary:
      "Cloud-native notification platform with an AI-assisted decision engine for intelligent, multi-channel routing.",
    description:
      "A microservices platform that routes notifications across channels using an AI-assisted decision engine. Services communicate over gRPC and RabbitMQ, run on Kubernetes, and are fully observable with OpenTelemetry, backed by PostgreSQL and Redis.",
    tags: ["AI", "Microservices", "Event-Driven"],
    tech: ["Node.js", "NestJS", "PostgreSQL", "RabbitMQ", "Docker", "Kubernetes", "OpenTelemetry"],
    media: [
      { type: "image", src: "/projects/notification-platform-1.svg", alt: "Notification platform architecture diagram" },
      { type: "image", src: "/projects/notification-platform-2.svg", alt: "Notification platform observability dashboard" }
    ]
  },
  {
    slug: "tenantguard",
    title: "TenantGuard",
    summary: "Multi-tenant IAM SaaS with JWT auth, RBAC, and isolated tenant databases.",
    description:
      "An identity and access management SaaS built for multi-tenant products. Each tenant gets isolated data, role-based permissions, and secure API integrations, with JWT-based authentication throughout.",
    tags: ["SaaS", "Security", "Multi-Tenant"],
    tech: ["Node.js", "NestJS", "JWT", "RBAC", "PostgreSQL"],
    media: [
      { type: "image", src: "/projects/tenantguard-1.svg", alt: "TenantGuard admin dashboard" }
    ]
  }
];
