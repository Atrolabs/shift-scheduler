import React, { useState } from 'react'
import { motion } from 'framer-motion'

const KoiFishSVG = ({
  size = 60,
  baseColor = '#ff6b6b',
  patternColor = '#ffa07a',
  opacity = 0.85,
}) => {
  const gradientId = `koi-${baseColor.replace('#', '')}`
  return (
    <svg width={size} height={size} viewBox="0 0 120 80" style={{ opacity }}>
      <defs>
        <linearGradient id={`body-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={baseColor} stopOpacity="0.95" />
          <stop offset="50%" stopColor={baseColor} stopOpacity="0.85" />
          <stop offset="100%" stopColor={baseColor} stopOpacity="0.75" />
        </linearGradient>
        <radialGradient id={`pattern-${gradientId}`} cx="50%" cy="50%">
          <stop offset="0%" stopColor={patternColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={patternColor} stopOpacity="0.4" />
        </radialGradient>
      </defs>

      <ellipse cx="50" cy="40" rx="35" ry="22" fill={`url(#body-${gradientId})`} />
      <ellipse cx="20" cy="40" rx="15" ry="18" fill={`url(#body-${gradientId})`} />
      <path
        d="M 75 40 L 100 25 Q 115 30, 110 40 Q 115 50, 100 55 L 75 40"
        fill={`url(#body-${gradientId})`}
      />
      <path d="M 35 20 Q 45 10, 55 20 L 50 25 Q 40 22, 35 20" fill={baseColor} opacity="0.7" />
      <ellipse
        cx="30"
        cy="30"
        rx="6"
        ry="12"
        fill={baseColor}
        opacity="0.6"
        transform="rotate(-20 30 30)"
      />
      <ellipse
        cx="30"
        cy="50"
        rx="6"
        ry="12"
        fill={baseColor}
        opacity="0.6"
        transform="rotate(20 30 50)"
      />
      <ellipse cx="50" cy="55" rx="5" ry="10" fill={baseColor} opacity="0.6" />
      <ellipse cx="45" cy="35" rx="12" ry="8" fill={`url(#pattern-${gradientId})`} />
      <ellipse cx="60" cy="45" rx="10" ry="6" fill={`url(#pattern-${gradientId})`} />
      <ellipse cx="30" cy="45" rx="8" ry="5" fill={`url(#pattern-${gradientId})`} />
      {[...Array(6)].map((_, i) => (
        <circle key={i} cx={35 + i * 8} cy={38 + (i % 2) * 4} r="2" fill="#fff" opacity="0.4" />
      ))}
      <circle cx="15" cy="38" r="4" fill="#fff" />
      <circle cx="15" cy="38" r="2.5" fill="#000" />
      <circle cx="16" cy="37" r="1" fill="#fff" opacity="0.8" />
      <ellipse cx="8" cy="40" rx="3" ry="2" fill={baseColor} opacity="0.6" />
      <line x1="8" y1="38" x2="8" y2="42" stroke={baseColor} strokeWidth="0.5" opacity="0.5" />
    </svg>
  )
}

export default function KoiFish({ initialX, initialY, duration, delay, size, color, index }) {
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
        rotate: [0, 15, -15, 10, 0],
      }}
      transition={{
        duration: duration || 20 + Math.random() * 10,
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
      <KoiFishSVG
        size={size || 50 + Math.random() * 30}
        baseColor={color}
        patternColor={['#fff', '#ffebcd', '#ffe4e1', '#f0f8ff'][Math.floor(Math.random() * 4)]}
        opacity={0.75 + Math.random() * 0.2}
      />
    </motion.div>
  )
}

export function KoiFishSwarm({ count = 8 }) {
  const colors = [
    '#ff6b35',
    '#ff8c42',
    '#ffa500',
    '#ff6347',
    '#ffd700',
    '#ffb347',
    '#ff7f50',
    '#ffa07a',
  ]

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
      {Array.from({ length: count }).map((_, i) => (
        <KoiFish
          key={i}
          duration={15 + Math.random() * 15}
          delay={Math.random() * 5}
          size={50 + Math.random() * 40}
          color={colors[Math.floor(Math.random() * colors.length)]}
          index={i}
        />
      ))}
    </div>
  )
}
