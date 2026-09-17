export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid sm:grid-cols-[160px_1fr] gap-6 sm:gap-12">
          <div className="eyebrow pt-1">about</div>
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-5">Six years of backend engineering, now focused on production AI.</h2>
            <p className="text-muted leading-relaxed">
              I&apos;m a Senior AI/LLM Engineer based in Kolkata, India, working with distributed teams across time zones. My core focus is production AI — multi-agent orchestration, RAG pipelines, and multi-provider LLM integration with real reliability guarantees — built on an enterprise-grade backend foundation (Node.js, NestJS, event-driven microservices) I&apos;ve been shipping for six years.
            </p>
            <p className="text-muted leading-relaxed mt-4">
              I lead architecture discussions, mentor engineers, and care about the parts of a project that don&apos;t show up in a demo: security, performance under load, and code a team can still maintain a year from
              now.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
