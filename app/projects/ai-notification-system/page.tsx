import type { Metadata } from "next";
import { caseStudyContent, aiNotificationAssets } from "@/lib/ai-notification";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import ProductDemo from "@/components/case-study/ProductDemo";
import ArchitectureEventFlow from "@/components/case-study/ArchitectureEventFlow";
import EngineeringEvidence from "@/components/case-study/EngineeringEvidence";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI Notification System — Case Study",
  description: caseStudyContent.heroTagline
};

export default function AiNotificationSystemPage() {
  const { github, liveDemo } = aiNotificationAssets;

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
      <EngineeringEvidence />

      <Footer />
    </main>
  );
}
