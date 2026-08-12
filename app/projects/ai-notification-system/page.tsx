import type { Metadata } from "next";
import { Github, ExternalLink } from "lucide-react";
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
      <CaseStudyHero />

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

      {(github || liveDemo) && (
        <section className="border-b border-line">
          <div className="mx-auto max-w-[1600px] px-6 lg:px-10 py-8 flex flex-wrap gap-3">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 font-medium text-ink hover:border-accent hover:text-accent transition-colors"
              >
                <Github size={16} /> View source
              </a>
            )}
            {liveDemo && (
              <a
                href={liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 font-medium text-ink hover:border-accent hover:text-accent transition-colors"
              >
                <ExternalLink size={16} /> Live demo
              </a>
            )}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
