import { Download, ArrowRight } from "lucide-react";
import { profile } from "@/lib/data";
import StatusBar from "./StatusBar";

export default function Hero() {
  return (
    <header>
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-14 sm:pt-24 sm:pb-16">
        <div className="eyebrow mb-5 animate-rise">
          system.status — profile online
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-6xl leading-[1.05] tracking-tight text-ink animate-rise [animation-delay:80ms] opacity-0 [animation-fill-mode:forwards]">
          {profile.name}
        </h1>
        <p className="mt-4 font-display text-xl sm:text-2xl text-accent animate-rise [animation-delay:150ms] opacity-0 [animation-fill-mode:forwards]">
          {profile.title}
        </p>
        <p className="mt-5 max-w-xl text-muted text-base sm:text-lg animate-rise [animation-delay:220ms] opacity-0 [animation-fill-mode:forwards]">
          I design and ship production-grade web platforms and AI/RAG systems —
          from React front ends to event-driven microservices — for teams that
          need senior-level ownership, not just code.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 animate-rise [animation-delay:300ms] opacity-0 [animation-fill-mode:forwards]">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-medium text-graphite hover:bg-accent/90 transition-colors"
          >
            View project catalog <ArrowRight size={16} />
          </a>
          <a
            href={profile.resumeFile}
            download
            className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 font-medium text-ink hover:border-accent hover:text-accent transition-colors"
          >
            <Download size={16} /> Download resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md px-5 py-3 font-medium text-muted hover:text-ink transition-colors"
          >
            Leave a message
          </a>
        </div>
      </div>
      <StatusBar />
    </header>
  );
}
