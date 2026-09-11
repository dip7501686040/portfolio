/**
 * Public proof data pulled from the private Personal Growth app
 * (`/api/public/*`). Only content/features explicitly marked public there are
 * ever returned. Fetched with ISR (hourly) so the portfolio has no runtime
 * dependency on the private app being up.
 */
const API =
  process.env.NEXT_PUBLIC_GROWTH_API_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export interface PublicFeature {
  projectSlug: string;
  featureSlug: string;
  projectName: string;
  repoUrl: string | null;
  liveUrl: string | null;
  title: string;
  description: string | null;
  status: string;
  demoVideoUrl: string | null;
  codePaths: Record<string, string> | null;
}

export interface PublicContentItem {
  slug: string;
  title: string;
  hook: string | null;
  angle: string | null;
  body: string | null;
  assetType: string | null;
  publishedUrls: Record<string, string> | null;
  skills: string[];
  features: string[];
}

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getPublicFeatures(): Promise<PublicFeature[]> {
  return (
    (await fetchJson<{ features: PublicFeature[] }>("/api/public/features"))
      ?.features ?? []
  );
}

export async function getPublicContent(): Promise<PublicContentItem[]> {
  return (
    (await fetchJson<{ items: PublicContentItem[] }>("/api/public/content"))
      ?.items ?? []
  );
}

export interface PublicMediaItem {
  projectSlug: string;
  featureKey: string; // == PublicFeature.featureSlug
  kind: "video" | "screenshot" | "diagram";
  url: string; // display image (poster frame for a video)
  videoUrl: string | null; // set only when kind === "video"
  caption: string;
  width: number | null;
  height: number | null;
}

/** Visual proof — uploaded via `pnpm media upload` in the Personal Growth
 *  repo, mirrored to R2 there so this shows up without a portfolio deploy. */
export async function getPublicMedia(): Promise<PublicMediaItem[]> {
  return (
    (await fetchJson<{ items: PublicMediaItem[] }>("/api/public/media"))
      ?.items ?? []
  );
}

/** Resolve a repo path key to a GitHub tree URL. */
export function codeUrl(repoUrl: string | null, path: string): string | null {
  if (!repoUrl) return null;
  return `${repoUrl.replace(/\/$/, "")}/tree/main/${path.replace(/^\//, "")}`;
}

export interface PublicContentCard {
  id: string;
  title: string;
  caption: string | null;
  kind: "video" | "screenshot" | "diagram";
  url: string; // display image (poster frame for a video)
  videoUrl: string | null; // set only when kind === "video"
  projectSlug: string | null;
  featureSlug: string | null; // == PublicFeature.featureSlug
  code: { repoUrl: string | null; links: { label: string; url: string }[] } | null;
}

/**
 * The portfolio's real source of truth for deep-dive cards — curated in the
 * Personal Growth app's /content page (Group C), not baked into this repo.
 * Supersedes getPublicMedia() for rendering; that one stays for internal use.
 */
export async function getPublicContentCards(): Promise<PublicContentCard[]> {
  return (
    (await fetchJson<{ cards: PublicContentCard[] }>("/api/public/content-cards"))
      ?.cards ?? []
  );
}
