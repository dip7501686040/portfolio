"use client"

import { useState } from "react"
import { Play, Clapperboard } from "lucide-react"
import { aiNotificationAssets } from "@/lib/ai-notification"

export default function ProductDemo() {
  const [started, setStarted] = useState(false)
  const hasVideo = Boolean(aiNotificationAssets.productVideo)

  return (
    <section id="demo" className="section-pad border-b border-line">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="eyebrow mb-3">product demo</div>
        <h2 className="font-display text-2xl sm:text-3xl text-ink mb-2">See it in action</h2>
        <p className="text-muted max-w-2xl mb-8 leading-relaxed">See the notification system in action — from event creation and rule evaluation to AI processing and notification delivery.</p>

        <div className="relative aspect-video bg-panel2 border border-line rounded-xl overflow-hidden">
          {started && hasVideo ? (
            <video src={aiNotificationAssets.productVideo} poster={aiNotificationAssets.productPoster} controls autoPlay className="w-full h-full bg-black" />
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={aiNotificationAssets.productPoster} alt="AI Notification System product demo preview" loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-scrim/30 flex items-center justify-center">
                {hasVideo ? (
                  <button
                    type="button"
                    onClick={() => setStarted(true)}
                    aria-label="Play product demo video"
                    className="flex items-center gap-2 text-white bg-scrim/70 border border-line rounded-full px-6 py-3 hover:border-accent hover:text-accent transition-colors"
                  >
                    <Play size={18} /> Play demo
                  </button>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-white bg-scrim/70 border border-line rounded-full px-6 py-3">
                    <Clapperboard size={18} />
                    <span className="text-sm font-mono">Demo video pending</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
