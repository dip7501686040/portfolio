"use client";

import { Moon, Sun, Sparkles } from "lucide-react";
import { useTheme, type Theme } from "./ThemeProvider";

const options: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "dark", label: "Dark theme", icon: Moon },
  { value: "light", label: "Light theme", icon: Sun },
  { value: "gradient", label: "Gradient theme", icon: Sparkles }
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="flex items-center gap-1 rounded-full border border-line bg-panel/80 p-1 shadow-lg shadow-black/20 backdrop-blur"
    >
      {options.map(({ value, label, icon: Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
              active ? "bg-accent text-graphite" : "text-muted hover:text-ink"
            }`}
          >
            <Icon size={15} />
          </button>
        );
      })}
    </div>
  );
}
