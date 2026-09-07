import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicContent, type PublicContentItem } from "@/lib/proof";

export const revalidate = 3600;
export const dynamicParams = true;

type Params = { slug: string };

async function find(slug: string): Promise<PublicContentItem | null> {
  const all = await getPublicContent();
  return all.find((c) => c.slug === slug) ?? null;
}

export async function generateStaticParams(): Promise<Params[]> {
  const all = await getPublicContent();
  return all.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const c = await find(params.slug);
  return {
    title: c ? c.title : "Proof",
    description: c?.hook ?? undefined,
  };
}

export default async function ProofPage({ params }: { params: Params }) {
  const c = await find(params.slug);
  if (!c) notFound();

  const urls = Object.entries(c.publishedUrls ?? {});

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
      <Link
        href="/#projects"
        className="font-mono text-xs text-ink/60 hover:text-ink"
      >
        ← work
      </Link>

      {c.assetType && <p className="eyebrow mt-8 mb-2">{c.assetType}</p>}
      <h1 className="font-display text-3xl font-bold text-ink">{c.title}</h1>
      {c.hook && <p className="mt-3 text-lg text-ink/80">{c.hook}</p>}

      {c.body && (
        <div className="prose prose-invert mt-8 max-w-none whitespace-pre-wrap leading-relaxed text-ink/90">
          {c.body}
        </div>
      )}

      {urls.length > 0 && (
        <div className="mt-8">
          <p className="eyebrow mb-3">published</p>
          <ul className="flex flex-wrap gap-2">
            {urls.map(([platform, href]) => (
              <li key={platform}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full border border-line px-3 py-1 font-mono text-xs text-ink/80 hover:border-ink hover:text-ink"
                >
                  {platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(c.skills.length > 0 || c.features.length > 0) && (
        <div className="mt-8 flex flex-wrap gap-1.5">
          {[...c.skills, ...c.features].map((t) => (
            <span
              key={t}
              className="rounded-full bg-ink/5 px-2 py-0.5 font-mono text-[11px] text-ink/70"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </main>
  );
}
