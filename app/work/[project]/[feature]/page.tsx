import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { codeUrl, getPublicFeatures, type PublicFeature } from "@/lib/proof";

export const revalidate = 3600;
export const dynamicParams = true;

type Params = { project: string; feature: string };

async function find(p: Params): Promise<PublicFeature | null> {
  const all = await getPublicFeatures();
  return (
    all.find(
      (f) => f.projectSlug === p.project && f.featureSlug === p.feature,
    ) ?? null
  );
}

export async function generateStaticParams(): Promise<Params[]> {
  const all = await getPublicFeatures();
  return all.map((f) => ({ project: f.projectSlug, feature: f.featureSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const f = await find(params);
  return {
    title: f ? `${f.title} — ${f.projectName}` : "Work",
    description: f?.description ?? undefined,
  };
}

export default async function FeaturePage({ params }: { params: Params }) {
  const f = await find(params);
  if (!f) notFound();

  const links: { label: string; href: string }[] = [];
  if (f.repoUrl) links.push({ label: "Repository", href: f.repoUrl });
  if (f.liveUrl) links.push({ label: "Live", href: f.liveUrl });
  for (const [key, path] of Object.entries(f.codePaths ?? {})) {
    const href = codeUrl(f.repoUrl, path);
    if (href) links.push({ label: key, href });
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
      <Link
        href="/#projects"
        className="font-mono text-xs text-ink/60 hover:text-ink"
      >
        ← work
      </Link>

      <p className="eyebrow mt-8 mb-2">{f.projectName}</p>
      <h1 className="font-display text-3xl font-bold text-ink">{f.title}</h1>

      {f.description && (
        <p className="mt-4 leading-relaxed text-ink/90">{f.description}</p>
      )}

      {f.demoVideoUrl && (
        <div className="mt-8 overflow-hidden rounded-lg border border-line">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video src={f.demoVideoUrl} controls className="w-full" />
        </div>
      )}

      {links.length > 0 && (
        <div className="mt-8">
          <p className="eyebrow mb-3">links</p>
          <ul className="flex flex-wrap gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full border border-line px-3 py-1 font-mono text-xs text-ink/80 hover:border-ink hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
