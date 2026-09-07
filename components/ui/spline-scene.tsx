"use client"

import { useState } from "react"

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ className }: SplineSceneProps) {
  const [pointer, setPointer] = useState({ x: 50, y: 50 })
  const rotateX = (pointer.y - 50) * -0.18
  const rotateY = (pointer.x - 50) * 0.18

  return (
    <div
      aria-label="N.E.X.U.S. autonomous workflow visualization"
      role="img"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect()
        setPointer({
          x: ((event.clientX - bounds.left) / bounds.width) * 100,
          y: ((event.clientY - bounds.top) / bounds.height) * 100,
        })
      }}
      onPointerLeave={() => setPointer({ x: 50, y: 50 })}
      className={`group relative overflow-hidden bg-black ${className ?? ""}`}
    >
      <div
        className="absolute inset-0 transition-[background] duration-300"
        style={{
          background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(96,165,250,0.3), transparent 30%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 62%)`,
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/30 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.2),rgba(37,99,235,0.2)_30%,rgba(0,0,0,0.9)_72%)] shadow-[0_0_80px_rgba(37,99,235,0.2)] transition-transform duration-150 ease-out"
        style={{ transform: `translate(-50%, -50%) perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 transition-transform duration-300 ease-out"
        style={{ transform: `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotate(18deg)` }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/10 transition-transform duration-500 ease-out"
        style={{ transform: `translate(-50%, -50%) rotateX(${-rotateX}deg) rotateY(${-rotateY}deg) rotate(-24deg)` }}
      />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.32em] text-blue-200/70">
        adaptive execution layer
      </div>
    </div>
  )
}
