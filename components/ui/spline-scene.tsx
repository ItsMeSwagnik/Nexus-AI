"use client"

import { useState } from "react"

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ className }: SplineSceneProps) {
  const [isActive, setIsActive] = useState(false)

  return (
    <button
      type="button"
      aria-label={isActive ? "Pause N.E.X.U.S. visualization" : "Activate N.E.X.U.S. visualization"}
      aria-pressed={isActive}
      onClick={() => setIsActive((active) => !active)}
      className={`group relative block h-full w-full cursor-pointer overflow-hidden bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 ${className ?? ""}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_62%)]" />
      <div className={`absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/30 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.2),rgba(37,99,235,0.2)_30%,rgba(0,0,0,0.9)_72%)] shadow-[0_0_45px_rgba(37,99,235,0.12)] transition-transform duration-500 ease-out ${isActive ? "scale-110 rotate-6" : "group-hover:scale-105"}`} />
      <div className={`absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 transition-transform duration-700 ease-out ${isActive ? "-rotate-45 scale-110" : "rotate-[18deg] group-hover:rotate-12"}`} />
      <div className={`absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/10 transition-transform duration-1000 ease-out ${isActive ? "rotate-45 scale-105" : "-rotate-[24deg] group-hover:-rotate-12"}`} />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.32em] text-blue-200/70">
        {isActive ? "execution layer active" : "click to activate"}
      </div>
    </button>
  )
}
