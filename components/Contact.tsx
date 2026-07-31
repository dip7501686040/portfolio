"use client"

import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { Send, LogOut, Mail } from "lucide-react"
import GoogleIcon from "./icons/GoogleIcon"

type Status = "idle" | "sending" | "sent" | "error"

export default function Contact() {
  const { data: session, status: sessionStatus } = useSession()
  const [form, setForm] = useState({ name: "", email: "", message: "", honeypot: "" })
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  // Pre-fill name/email once signed in with Google, without overwriting edits.
  const displayName = form.name || session?.user?.name || ""
  const displayEmail = form.email || session?.user?.email || ""

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("sending")
    setErrorMsg("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: displayName,
          email: displayEmail,
          message: form.message,
          honeypot: form.honeypot
        })
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong.")
      }
      setStatus("sent")
      setForm({ name: "", email: "", message: "", honeypot: "" })
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.")
    }
  }

  return (
    <section id="contact" className="section-pad border-t border-line">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid sm:grid-cols-[160px_1fr] gap-6 sm:gap-12">
          <div className="eyebrow pt-1">contact</div>
          <div className="max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2">Leave a message</h2>
            <p className="text-muted mb-3">Have a project in mind? Sign in with Google to auto-fill your details, or just fill the form directly.</p>
            <p className="flex items-center gap-1.5 text-xs text-muted mb-6">
              <Mail size={13} />
              Sends straight to my inbox — I&apos;ll reply by email, usually within a day.
            </p>

            {sessionStatus === "authenticated" ? (
              <div className="flex items-center gap-3 mb-6 bg-panel border border-line rounded-lg px-4 py-3">
                {session.user?.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={session.user.image} alt="" className="h-9 w-9 rounded-full" />
                )}
                <div className="flex-1 text-sm">
                  <div className="text-ink">{session.user?.name}</div>
                  <div className="text-muted">{session.user?.email}</div>
                </div>
                <button type="button" onClick={() => signOut()} className="inline-flex items-center gap-1 text-xs text-muted hover:text-danger">
                  <LogOut size={14} /> Sign out
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => signIn("google")}
                className="mb-6 inline-flex items-center gap-2 rounded-md border border-line bg-panel px-4 py-2.5 text-sm font-medium text-ink hover:border-accent hover:text-accent transition-colors"
              >
                <GoogleIcon />
                Continue with Google
              </button>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field — hidden from real users, catches simple bots */}
              <input type="text" name="company" value={form.honeypot} onChange={(e) => setForm({ ...form, honeypot: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <div>
                <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  required
                  value={displayName}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-md bg-panel border border-line px-3.5 py-2.5 text-ink placeholder:text-muted/60"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={displayEmail}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-md bg-panel border border-line px-3.5 py-2.5 text-ink placeholder:text-muted/60"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-muted mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-md bg-panel border border-line px-3.5 py-2.5 text-ink placeholder:text-muted/60 resize-none"
                  placeholder="Tell me about your project, timeline, and budget."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-medium text-graphite hover:bg-accent/90 transition-colors disabled:opacity-60"
              >
                <Send size={16} />
                {status === "sending" ? "Sending…" : "Send message"}
              </button>

              {status === "sent" && <p className="text-accent text-sm">Message sent — I&apos;ll reply within a day.</p>}
              {status === "error" && <p className="text-danger text-sm">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
