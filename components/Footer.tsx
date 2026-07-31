import { Github, Linkedin, Mail, Phone, Download } from "lucide-react";
import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="font-display text-ink">{profile.name}</div>
          <div className="text-sm text-muted">
            {profile.location} · {profile.availability}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 text-muted hover:text-accent">
            <Mail size={15} /> Email
          </a>
          <a href={`tel:${profile.phone}`} className="flex items-center gap-1.5 text-muted hover:text-accent">
            <Phone size={15} /> Call
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted hover:text-accent">
            <Github size={15} /> GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted hover:text-accent">
            <Linkedin size={15} /> LinkedIn
          </a>
          <a href={profile.resumeFile} download className="flex items-center gap-1.5 text-muted hover:text-accent">
            <Download size={15} /> Resume
          </a>
        </div>
      </div>
      <div className="text-center text-xs text-muted pb-6 font-mono">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js.
      </div>
    </footer>
  );
}
