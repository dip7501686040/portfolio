/**
 * A self-contained SVG cover tile (data URI) for a project card that doesn't
 * have a real screenshot/diagram yet. Swap `media[0]` for a Cloudinary image
 * once one is uploaded via `pnpm media upload` in the Personal Growth repo.
 */
export function coverDataUri(title: string): string {
  const lines = wrap(title, 18);
  const y0 = 375 - (lines.length - 1) * 34;
  const text = lines
    .map(
      (l, i) =>
        `<tspan x="600" y="${y0 + i * 68}">${escapeXml(l)}</tspan>`,
    )
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
<rect width="1200" height="750" fill="#0f0f10"/>
<rect x="24" y="24" width="1152" height="702" fill="none" stroke="#1f2a28" stroke-width="2" rx="14"/>
<circle cx="1090" cy="110" r="150" fill="#14b8a6" opacity="0.08"/>
<text font-family="ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial" font-size="58" font-weight="700" fill="#5eead4" text-anchor="middle">${text}</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function wrap(s: string, max: number): string[] {
  const words = s.split(/\s+/);
  const out: string[] = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > max && line) {
      out.push(line);
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) out.push(line);
  return out;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
