import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="section-pad border-t border-line">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid sm:grid-cols-[160px_1fr] gap-6 sm:gap-12">
          <div className="eyebrow pt-1">stack</div>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-8">
              Skills &amp; tools
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <div className="font-mono text-xs uppercase tracking-wider text-teal mb-3">
                    {group.label}
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {group.skills.map((s) => (
                      <li
                        key={s}
                        className="text-sm text-ink/90 bg-panel border border-line rounded-md px-3 py-1.5"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
