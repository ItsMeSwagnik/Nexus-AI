"use client"

import { useCallback, useEffect, useState } from "react"

interface SplineSceneProps {
  scene: string
  className?: string
}

const greeting = "Hi this is N.E.X.U.S. your adaptive automation companion"
const workflowStates = ["Monitoring The Workflow...", "Adapting...", "Waiting For User Approval...", "Approved", "Executing..."]

export function SplineScene({ className }: SplineSceneProps) {
  const [isActive, setIsActive] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [statusIndex, setStatusIndex] = useState(0)

  const activate = useCallback(() => {
    setIsActive(true)
    setTypedText("")
    setStatusIndex(0)
  }, [])

  useEffect(() => {
    const handleActivate = () => activate()
    window.addEventListener("nexus-sphere-activate", handleActivate)
    return () => window.removeEventListener("nexus-sphere-activate", handleActivate)
  }, [activate])

  useEffect(() => {
    if (!isActive) return
    if (typedText.length < greeting.length) {
      const timer = window.setTimeout(() => setTypedText(greeting.slice(0, typedText.length + 1)), 34)
      return () => window.clearTimeout(timer)
    }
    const timer = window.setTimeout(() => setStatusIndex((index) => (index + 1) % workflowStates.length), 1500)
    return () => window.clearTimeout(timer)
  }, [isActive, typedText])

  return (
    <button
      type="button"
      aria-label={isActive ? "Restart N.E.X.U.S. visualization" : "Activate N.E.X.U.S. visualization"}
      aria-pressed={isActive}
      onClick={() => (isActive ? setIsActive(false) : activate())}
      className={`group relative block h-[340px] min-h-[340px] w-full cursor-pointer overflow-hidden bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 md:h-full md:min-h-0 ${className ?? ""}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_62%)]" />
      <div className={`absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/30 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.2),rgba(37,99,235,0.2)_30%,rgba(0,0,0,0.9)_72%)] shadow-[0_0_45px_rgba(37,99,235,0.12)] transition-transform duration-300 ease-out sm:h-56 sm:w-56 ${isActive ? "animate-[heartbeat_1.15s_ease-in-out_infinite]" : "group-hover:scale-105"}`} />
      <div className={`absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 transition-transform duration-700 ease-out sm:h-72 sm:w-72 ${isActive ? "rotate-45 scale-110" : "rotate-[18deg] group-hover:rotate-12"}`} />
      <div className={`absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/10 transition-transform duration-1000 ease-out sm:h-80 sm:w-80 ${isActive ? "-rotate-45 scale-105" : "-rotate-[24deg] group-hover:-rotate-12"}`} />
      <div className="absolute inset-x-4 bottom-10 min-h-12 text-center font-mono text-xs leading-5 text-transparent bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-500 bg-clip-text sm:inset-x-8">
        {isActive ? <span>{typedText}<span className="ml-0.5 animate-pulse text-blue-300">▋</span></span> : <span className="text-blue-200/70">Click to activate N.E.X.U.S.</span>}
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.24em] text-blue-200/70 sm:text-[10px] sm:tracking-[0.32em]">
        {isActive ? workflowStates[statusIndex] : "Adaptive execution layer"}
      </div>
    </button>
  )
}
