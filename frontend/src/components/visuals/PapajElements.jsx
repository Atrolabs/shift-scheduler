import React, { useState } from 'react'
import { motion } from 'framer-motion'

const PopeSVG = ({ size = 80, opacity = 0.9 }) => (
  <svg width={size} height={size} viewBox="0 0 100 120" style={{ opacity }}>
    <path d="M 30 5 Q 50 0, 70 5 L 70 25 Q 50 20, 30 25 Z" fill="#ffff00" />
    <path d="M 35 10 Q 50 8, 65 10 L 65 22 Q 50 18, 35 22 Z" fill="#fff" />
    <ellipse cx="50" cy="50" rx="20" ry="25" fill="#f4d3a3" />
    <path d="M 30 60 L 70 60 L 65 75 L 35 75 Z" fill="#fff" />
    <ellipse cx="50" cy="95" rx="22" ry="20" fill="#ffff00" />
    <rect x="47" y="65" width="6" height="15" fill="#000" />
    <rect x="42" y="70" width="16" height="6" fill="#000" />
    <circle cx="45" cy="48" r="2" fill="#000" />
    <circle cx="55" cy="48" r="2" fill="#000" />
    <path d="M 45 55 Q 50 58, 55 55" stroke="#000" strokeWidth="1.5" fill="none" />
    <circle cx="45" cy="48" r="5" fill="none" stroke="#000" strokeWidth="1" />
    <circle cx="55" cy="48" r="5" fill="none" stroke="#000" strokeWidth="1" />
    <line x1="50" y1="48" x2="50" y2="48" stroke="#000" strokeWidth="1" />
    <path
      d="M 30 35 Q 35 30, 40 35 Q 45 32, 50 35 Q 55 32, 60 35 Q 65 30, 70 35"
      stroke="#8b4513"
      strokeWidth="2"
      fill="none"
    />
  </svg>
)

const KremowkaSVG = ({ size = 50, opacity = 0.9 }) => (
  <svg width={size} height={size} viewBox="0 0 80 60" style={{ opacity }}>
    <ellipse cx="40" cy="15" rx="35" ry="12" fill="#d4a574" />
    <ellipse cx="40" cy="12" rx="32" ry="10" fill="#f4d3a3" />
    <ellipse cx="40" cy="30" rx="30" ry="18" fill="#fff8dc" />
    <ellipse cx="40" cy="28" rx="28" ry="16" fill="#fff" />
    <ellipse cx="40" cy="45" rx="35" ry="12" fill="#d4a574" />
    <ellipse cx="40" cy="48" rx="32" ry="10" fill="#f4d3a3" />
    {[...Array(8)].map((_, i) => (
      <circle
        key={i}
        cx={15 + (i % 4) * 15}
        cy={8 + Math.floor(i / 4) * 8}
        r="2"
        fill="#fff"
        opacity="0.8"
      />
    ))}
    <ellipse
      cx="40"
      cy="15"
      rx="30"
      ry="8"
      fill="none"
      stroke="#c9a568"
      strokeWidth="1"
      opacity="0.5"
    />
  </svg>
)

export default function PapajElement({
  initialX,
  initialY,
  duration,
  delay,
  type = 'pope',
  size,
  index,
}) {
  const [positions] = useState(() => {
    const xOffset = initialX !== undefined ? initialX : (Math.random() - 0.5) * 1200
    const yOffset = initialY !== undefined ? initialY : (Math.random() - 0.5) * 800
    const path1x = xOffset + (Math.random() - 0.5) * 400
    const path1y = yOffset + (Math.random() - 0.5) * 300
    const path2x = xOffset + (Math.random() - 0.5) * 600
    const path2y = yOffset + (Math.random() - 0.5) * 500
    const path3x = xOffset + (Math.random() - 0.5) * 400
    const path3y = yOffset + (Math.random() - 0.5) * 300

    return {
      start: { x: xOffset, y: yOffset },
      p1: { x: path1x, y: path1y },
      p2: { x: path2x, y: path2y },
      p3: { x: path3x, y: path3y },
    }
  })

  return (
    <motion.div
      initial={{
        x: `calc(50% + ${positions.start.x}px)`,
        y: `calc(50% + ${positions.start.y}px)`,
        rotate: 0,
      }}
      animate={{
        x: [
          `calc(50% + ${positions.start.x}px)`,
          `calc(50% + ${positions.p1.x}px)`,
          `calc(50% + ${positions.p2.x}px)`,
          `calc(50% + ${positions.p3.x}px)`,
          `calc(50% + ${positions.start.x}px)`,
        ],
        y: [
          `calc(50% + ${positions.start.y}px)`,
          `calc(50% + ${positions.p1.y}px)`,
          `calc(50% + ${positions.p2.y}px)`,
          `calc(50% + ${positions.p3.y}px)`,
          `calc(50% + ${positions.start.y}px)`,
        ],
        rotate: type === 'pope' ? [0, 5, -5, 3, 0] : [0, 15, -15, 10, 0],
        scale: type === 'pope' ? [1, 1.05, 1, 1.03, 1] : [1, 1.1, 0.95, 1.05, 1],
      }}
      transition={{
        duration: duration || 20 + Math.random() * 15,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: delay || 0,
      }}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {type === 'pope' ? (
        <PopeSVG size={size || 70 + Math.random() * 30} opacity={0.85 + Math.random() * 0.15} />
      ) : (
        <KremowkaSVG size={size || 40 + Math.random() * 25} opacity={0.85 + Math.random() * 0.15} />
      )}
    </motion.div>
  )
}

export function PapajSwarm({ popeCount = 6, kremowkaCount = 10 }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {Array.from({ length: popeCount }).map((_, i) => (
        <PapajElement
          key={`pope-${i}`}
          type="pope"
          duration={18 + Math.random() * 20}
          delay={Math.random() * 5}
          size={70 + Math.random() * 40}
          index={i}
        />
      ))}
      {Array.from({ length: kremowkaCount }).map((_, i) => (
        <PapajElement
          key={`kremowka-${i}`}
          type="kremowka"
          duration={12 + Math.random() * 15}
          delay={Math.random() * 5}
          size={35 + Math.random() * 30}
          index={i}
        />
      ))}
    </div>
  )
}
