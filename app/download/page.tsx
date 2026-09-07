"use client"

import Link from "next/link"
import { useState } from "react"
import { SiApple, SiLinux } from "react-icons/si"
import { FaWindows } from "react-icons/fa6"
import { ArrowLeft, Download, Server } from "lucide-react"

const platforms = [
  { name: "Windows", label: "Windows 10 or later", icon: FaWindows, file: "N.E.X.U.S.-Setup.exe", color: "text-sky-300" },
  { name: "macOS", label: "macOS 12 Monterey or later", icon: SiApple, file: "N.E.X.U.S.-for-Mac.dmg", color: "text-neutral-200" },
  { name: "Linux", label: "Ubuntu, Debian, Fedora, or Arch", icon: SiLinux, file: "N.E.X.U.S.-Linux.AppImage", color: "text-orange-300" },
]

export default function DownloadPage() {
  const [notice, setNotice] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col">
        <Link href="/" className="inline-flex w-fit items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to N.E.X.U.S.
        </Link>

        <section className="flex flex-1 flex-col justify-center py-16">
          <div className="max-w-3xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-blue-300">N.E.X.U.S. desktop</p>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">Bring adaptive execution to your desktop</h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-neutral-400 sm:text-lg">
              Download the N.E.X.U.S. desktop client and let approved workflows move securely between your browser, files, apps, and business tools.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
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
                  onClick={() => setNotice(`${name} download is coming soon`)}
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
          {notice && (
            <div role="status" className="mt-6 animate-in fade-in slide-in-from-bottom-2 rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-3 text-center text-sm text-blue-200">
              {notice}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
