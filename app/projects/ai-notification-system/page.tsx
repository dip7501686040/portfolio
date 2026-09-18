import type { Metadata } from "next";
import { caseStudyContent, aiNotificationAssets } from "@/lib/ai-notification";
import type { ContentCard } from "@/lib/data";
import { getPublicContentCards } from "@/lib/proof";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import ProductDemo from "@/components/case-study/ProductDemo";
import ArchitectureEventFlow from "@/components/case-study/ArchitectureEventFlow";
import ContentGrid from "@/components/case-study/ContentGrid";
import Footer from "@/components/Footer";

// Re-check periodically — the Personal Growth app's /content page is the
// real source of truth for this section; nothing here needs a portfolio
// deploy when a new proof card is added.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "AI Notification System — Case Study",
  description: caseStudyContent.heroTagline
};

export default async function AiNotificationSystemPage() {
  const { github, liveDemo } = aiNotificationAssets;

  const allCards = await getPublicContentCards();
  const content: ContentCard[] = allCards
    .filter((c) => c.projectSlug === "ai-notification-system")
    .map((c) => ({
      featureKey: c.featureSlug ?? c.id,
      title: c.title,
      kind: c.kind,
      src: c.kind === "video" ? c.videoUrl ?? c.url : c.url,
      poster: c.kind === "video" ? c.url : undefined,
      caption: c.caption ?? "",
      code: c.code,
      role: c.role,
    }));

  return (
    <main>
      <CaseStudyHero github={github} liveDemo={liveDemo} />

      <section className="section-pad border-b border-line">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10 grid sm:grid-cols-2 gap-8">
          <div>
            <div className="eyebrow mb-3">problem</div>
            <p className="text-ink leading-relaxed max-w-2xl">{caseStudyContent.problem}</p>
          </div>
          <div>
            <div className="eyebrow mb-3">solution</div>
            <p className="text-ink leading-relaxed max-w-2xl">{caseStudyContent.solution}</p>
          </div>
        </div>
      </section>

      <ProductDemo />
      <ArchitectureEventFlow />
      <ContentGrid content={content} />

      <Footer />
    </main>
  );
}
