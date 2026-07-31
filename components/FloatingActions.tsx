import { Phone } from "lucide-react";
import { profile } from "@/lib/data";

export default function FloatingActions() {
  const whatsappHref = `https://wa.me/${profile.phone.replace("+", "")}?text=${encodeURIComponent(
    "Hi Dipankar, I found your portfolio and would like to talk about a project."
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <a
        href={`tel:${profile.phone}`}
        aria-label="Call Dipankar"
        className="flex items-center justify-center h-12 w-12 rounded-full bg-panel border border-line text-ink hover:border-teal hover:text-teal shadow-lg shadow-black/30 transition-colors"
      >
        <Phone size={20} />
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-[#0B0E14] shadow-lg shadow-black/30 hover:brightness-105 transition"
      >
        <WhatsAppIcon />
      </a>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.7.44 3.35 1.29 4.8L2 22l5.42-1.38a9.9 9.9 0 0 0 4.62 1.14h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.13-2.9-6.99A9.83 9.83 0 0 0 12.04 2Zm0 1.67c2.19 0 4.24.85 5.79 2.4a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.71 8.24-8.24 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.22.82.86-3.13-.2-.32a8.15 8.15 0 0 1-1.26-4.36c0-4.54 3.71-8.15 8.35-8.15Zm-3.1 4.35c-.16 0-.42.06-.64.31-.22.25-.85.83-.85 2.02 0 1.19.87 2.35.99 2.51.12.16 1.7 2.71 4.2 3.7 2.08.83 2.5.66 2.95.62.45-.04 1.46-.6 1.66-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.46-.28-.24-.12-1.46-.72-1.68-.8-.23-.08-.4-.12-.56.12-.16.24-.64.8-.79.97-.15.16-.29.18-.53.06-.24-.12-1.03-.38-1.97-1.22-.73-.65-1.22-1.45-1.36-1.69-.14-.24-.01-.38.11-.5.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.32-.74-1.8-.19-.47-.39-.4-.55-.41Z" />
    </svg>
  );
}
