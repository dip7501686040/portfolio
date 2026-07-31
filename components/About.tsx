export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid sm:grid-cols-[160px_1fr] gap-6 sm:gap-12">
          <div className="eyebrow pt-1">about</div>
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-5">
              Six years building systems clients trust in production.
            </h2>
            <p className="text-muted leading-relaxed">
              I&apos;m a Senior Full Stack Engineer based in West Bengal, India,
              working with distributed teams across time zones. My background
              spans enterprise SaaS (React, Next.js, NestJS, microservices) and
              I&apos;m now applying that same rigor to AI-powered products —
              LLM integrations, Retrieval-Augmented Generation, vector search,
              and the observability needed to run them reliably.
            </p>
            <p className="text-muted leading-relaxed mt-4">
              I lead architecture discussions, mentor engineers, and care about
              the parts of a project that don&apos;t show up in a demo:
              security, performance under load, and code a team can still
              maintain a year from now.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
