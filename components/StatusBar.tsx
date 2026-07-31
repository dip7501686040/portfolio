import { stats } from "@/lib/data";

export default function StatusBar() {
  return (
    <div className="border-y border-line bg-panel/60">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-line">
          {stats.map((s, i) => (
            <div key={s.label} className="py-4 px-4 first:pl-0">
              <div className="eyebrow flex items-center gap-2">
                {i === 3 && (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-teal animate-pulseDot" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
                  </span>
                )}
                {s.label}
              </div>
              <div className="font-display text-lg sm:text-xl mt-1 text-ink">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
