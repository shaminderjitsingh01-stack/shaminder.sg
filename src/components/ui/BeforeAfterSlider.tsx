'use client'

import { useState } from 'react'

interface BeforeAfterSliderProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
}

export default function BeforeAfterSlider({ beforeSrc, afterSrc, beforeAlt, afterAlt }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)

  return (
    <div className="relative">
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl select-none">
        {/* After Image (Background) */}
        <img src={afterSrc} alt={afterAlt} className="absolute inset-0 w-full h-full object-cover object-top" />

        {/* Before Image (Clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <img
            src={beforeSrc}
            alt={beforeAlt}
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ width: `${100 / (position / 100)}%`, maxWidth: 'none' }}
          />
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
            <span className="text-gray-600 text-sm font-bold">↔</span>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">Before</div>
        <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded">After</div>

        {/* Invisible Range Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        />
      </div>
      <p className="text-center text-sm text-gray-500 mt-3">← Drag to compare before & after →</p>
    </div>
  )
}
