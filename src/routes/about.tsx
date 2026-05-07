import { createFileRoute } from '@tanstack/react-router'
import { Info, Layout, Zap } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <main className="page-wrap py-12 md:py-20 rise-in">
      <section className="mb-16 max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent mb-6">
          <Info className="size-3.5" />
          Project Vision
        </div>
        <h1 className="display-title text-5xl md:text-6xl font-medium tracking-tight mb-6">
          Simplicity <br />
          <span className="text-accent italic">by design.</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Learning Map is a modern student management system built with 
          the TanStack ecosystem. We focus on speed, type-safety, and 
          a minimalist user experience.
        </p>
      </section>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent mb-6">
            <Zap className="size-6" />
          </div>
          <h3 className="text-xl font-medium mb-3">High Performance</h3>
          <p className="text-muted-foreground leading-relaxed">
            Built on top of TanStack Start, providing lightning fast 
            server-side rendering and smooth client-side transitions.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent mb-6">
            <Layout className="size-6" />
          </div>
          <h3 className="text-xl font-medium mb-3">Modern UI</h3>
          <p className="text-muted-foreground leading-relaxed">
            A clean, accessible, and responsive interface designed to 
            work perfectly on any device, from mobile to desktop.
          </p>
        </div>
      </div>
    </main>
  )
}
