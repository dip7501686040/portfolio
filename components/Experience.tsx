import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="section-pad border-t border-line">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid sm:grid-cols-[160px_1fr] gap-6 sm:gap-12">
          <div className="eyebrow pt-1">experience</div>
          <div className="max-w-3xl space-y-10">
            <h2 className="font-display text-2xl sm:text-3xl text-ink">
              Where I&apos;ve worked
            </h2>
            {experience.map((job) => (
              <div key={job.company} className="relative pl-6 border-l border-line">
                <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
                <div className="font-mono text-xs text-muted mb-1">{job.period}</div>
                <h3 className="font-display text-lg text-ink">
                  {job.role} <span className="text-muted font-body font-normal">· {job.company}</span>
                </h3>
                <div className="text-sm text-muted mb-3">{job.location}</div>
                <ul className="space-y-1.5 text-sm text-ink/85 list-disc list-inside marker:text-accent">
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.tech.map((t) => (
                    <span key={t} className="text-xs font-mono text-muted bg-panel border border-line rounded px-2 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
