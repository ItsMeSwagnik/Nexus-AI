"use client"

import { useCallback, useEffect, useState } from "react"

interface SplineSceneProps {
  scene: string
  className?: string
}

const introLines = ["Hi this is N.E.X.U.S.", "Your Adaptive Automation Companion"]
const workflowStates = ["Monitoring The Workflow...", "Adapting...", "Waiting For User Approval...", "Approved", "Executing..."]

type SceneMode = "intro" | "workflow"

export function SplineScene({ className }: SplineSceneProps) {
  const [mode, setMode] = useState<SceneMode>("intro")
  const [lineIndex, setLineIndex] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [statusIndex, setStatusIndex] = useState(0)

  const activate = useCallback(() => {
    setMode("workflow")
    setTypedText("")
    setIsDeleting(false)
    setStatusIndex(0)
  }, [])

  useEffect(() => {
    const handleActivate = () => activate()
    window.addEventListener("nexus-sphere-activate", handleActivate)
    return () => window.removeEventListener("nexus-sphere-activate", handleActivate)
  }, [activate])

  useEffect(() => {
    if (mode === "workflow") {
      const timer = window.setTimeout(() => setStatusIndex((index) => (index + 1) % workflowStates.length), 2200)
      return () => window.clearTimeout(timer)
    }

    const target = introLines[lineIndex]
    const isComplete = typedText === target
    const timer = window.setTimeout(() => {
      if (!isDeleting && !isComplete) setTypedText(target.slice(0, typedText.length + 1))
      else if (!isDeleting && isComplete) setIsDeleting(true)
      else if (isDeleting && typedText.length > 0) setTypedText(target.slice(0, typedText.length - 1))
      else {
        setIsDeleting(false)
        setLineIndex((index) => (index + 1) % introLines.length)
      }
    }, isComplete && !isDeleting ? 1300 : isDeleting ? 42 : 58)
    return () => window.clearTimeout(timer)
  }, [lineIndex, mode, isDeleting, typedText])

  return (
    <button
      type="button"
      aria-label={mode === "workflow" ? "Restart N.E.X.U.S. workflow" : "Activate N.E.X.U.S. workflow"}
      aria-pressed={mode === "workflow"}
      onClick={activate}
      className={`group relative block h-[340px] min-h-[340px] w-full cursor-pointer overflow-hidden bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 md:h-full md:min-h-0 ${className ?? ""}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_62%)]" />
      <div className={`absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/30 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.2),rgba(37,99,235,0.2)_30%,rgba(0,0,0,0.9)_72%)] shadow-[0_0_45px_rgba(37,99,235,0.12)] transition-transform duration-300 ease-out sm:h-56 sm:w-56 ${mode === "workflow" ? "animate-[heartbeat_1.15s_ease-in-out_infinite]" : "group-hover:scale-105"}`} />
      <div className={`absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 transition-transform duration-700 ease-out sm:h-72 sm:w-72 ${mode === "workflow" ? "rotate-45 scale-110" : "rotate-[18deg] group-hover:rotate-12"}`} />
      <div className={`absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/10 transition-transform duration-1000 ease-out sm:h-80 sm:w-80 ${mode === "workflow" ? "-rotate-45 scale-105" : "-rotate-[24deg] group-hover:-rotate-12"}`} />
      {mode === "intro" && <div className="absolute inset-x-4 bottom-10 min-h-12 text-center font-mono text-xs leading-5 text-transparent bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-500 bg-clip-text sm:inset-x-8">{typedText}<span className="ml-0.5 animate-pulse text-blue-300">▋</span></div>}
      {mode === "workflow" && <div className="absolute inset-x-3 bottom-10 min-h-12 text-center font-mono text-xs leading-5 text-transparent bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-500 bg-clip-text sm:inset-x-8">{workflowStates[statusIndex]}</div>}
    </button>
  )
}
