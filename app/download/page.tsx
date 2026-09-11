"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { SiApple, SiLinux } from "react-icons/si"
import { FaWindows } from "react-icons/fa6"
import { ArrowLeft, Download, Server } from "lucide-react"

const platforms = [
  { name: "Windows", label: "Windows 10 or later", icon: FaWindows, file: "N.E.X.U.S.-Setup.exe", color: "text-sky-300" },
  { name: "macOS", label: "macOS 12 Monterey or later", icon: SiApple, file: "N.E.X.U.S.-for-Mac.dmg", color: "text-neutral-200" },
  { name: "Linux", label: "Ubuntu, Debian, Fedora, or Arch", icon: SiLinux, file: "N.E.X.U.S.-Linux.AppImage", color: "text-orange-300" },
]

export default function DownloadPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [secondsLeft, setSecondsLeft] = useState(40 * 24 * 60 * 60)

  useEffect(() => {
    if (!selectedPlatform) return
    const timer = window.setInterval(() => setSecondsLeft((seconds) => Math.max(0, seconds - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [selectedPlatform])

  const days = Math.floor(secondsLeft / 86400)
  const hours = Math.floor((secondsLeft % 86400) / 3600)
  const minutes = Math.floor((secondsLeft % 3600) / 60)
  const seconds = secondsLeft % 60

  return (
    <main className="relative min-h-screen overflow-x-hidden overflow-y-auto bg-black px-4 py-6 text-white sm:px-6 lg:h-screen lg:overflow-hidden lg:px-8">
      <div className="mx-auto flex h-full max-w-6xl flex-col">
        <Link href="/" className="inline-flex w-fit items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to N.E.X.U.S.
        </Link>

        <section className="flex flex-1 flex-col justify-center py-6 sm:py-10">
          <div className="max-w-3xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-blue-300">N.E.X.U.S. desktop</p>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">Bring adaptive execution to your desktop</h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-neutral-400 sm:text-lg">
              Download the N.E.X.U.S. desktop client and let approved workflows move securely between your browser, files, apps, and business tools.
            </p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {platforms.map(({ name, label, icon: Icon, file, color }) => (
              <article key={name} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-blue-400/50 hover:bg-white/[0.07]">
                <div className="flex items-center justify-between">
                  <Icon aria-hidden="true" className={`h-8 w-8 ${color}`} />
                  <Server className="h-4 w-4 text-neutral-600" />
                </div>
                <h2 className="mt-8 text-2xl font-semibold">{name}</h2>
                <p className="mt-2 min-h-12 text-sm leading-6 text-neutral-400">{label}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSecondsLeft(40 * 24 * 60 * 60)
                    setSelectedPlatform(name)
                  }}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold transition-all hover:bg-blue-400 active:scale-95"
                >
                  <Download className="h-4 w-4" />
                  Download for {name}
                </button>
                <p className="mt-3 text-center font-mono text-[11px] text-neutral-600">{file}</p>
              </article>
            ))}
          </div>

          <p className="mt-8 text-sm text-neutral-500">The desktop client is coming soon. Download links will become active when each build is released.</p>
          {selectedPlatform && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`${selectedPlatform} download status`}>
              <div className="w-full max-w-md rounded-3xl border border-white/15 bg-white/[0.08] p-7 text-center shadow-2xl backdrop-blur-xl">
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-blue-300">{selectedPlatform} desktop client</p>
                <h2 className="mt-4 text-3xl font-bold text-transparent bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-500 bg-clip-text">Coming soon...</h2>
                <p className="mt-3 text-sm text-neutral-300">The N.E.X.U.S. build for {selectedPlatform} is being prepared.</p>
                <p className="mt-6 font-mono text-2xl tracking-widest text-transparent bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-500 bg-clip-text">{String(days).padStart(2, "0")}d {String(hours).padStart(2, "0")}h {String(minutes).padStart(2, "0")}m {String(seconds).padStart(2, "0")}s</p>
                <button type="button" onClick={() => setSelectedPlatform(null)} className="mt-7 rounded-full border border-white/20 px-5 py-2 text-sm text-neutral-200 transition-colors hover:border-blue-300 hover:text-white">Close</button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
