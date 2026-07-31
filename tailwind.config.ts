import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        graphite: "rgb(var(--color-graphite) / <alpha-value>)",
        panel: "rgb(var(--color-panel) / <alpha-value>)",
        panel2: "rgb(var(--color-panel2) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        amber: "rgb(var(--color-amber) / <alpha-value>)",
        amberDim: "rgb(var(--color-amberDim) / <alpha-value>)",
        teal: "rgb(var(--color-teal) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        scrim: "rgb(0 0 0 / <alpha-value>)"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(79,209,197,0.5)" },
          "50%": { opacity: "0.6", boxShadow: "0 0 0 6px rgba(79,209,197,0)" }
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        pulseDot: "pulseDot 2s ease-in-out infinite",
        rise: "rise 0.6s ease-out forwards"
      }
    }
  },
  plugins: []
};
export default config;
