import React from 'react'
import { motion } from 'framer-motion'
import { KoiFishSwarm } from '../visuals/KoiFish'
import { PapajSwarm } from '../visuals/PapajElements'

function ThemeBackground({ theme, themeName }) {
  return (
    <>
      {themeName === 'warm' ? (
        <>
          <div
            style={{
              position: 'absolute',
              top: -100,
              right: -100,
              width: 400,
              height: 400,
              background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15), transparent)',
              borderRadius: '50%',
              filter: 'blur(60px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -150,
              left: -150,
              width: 500,
              height: 500,
              background: 'radial-gradient(circle, rgba(234, 179, 8, 0.12), transparent)',
              borderRadius: '50%',
              filter: 'blur(80px)',
            }}
          />
        </>
      ) : themeName === 'fish' ? (
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
              linear-gradient(${theme.gridColor} 1px, transparent 1px),
              linear-gradient(90deg, ${theme.gridColor} 1px, transparent 1px)
            `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite',
              pointerEvents: 'none',
            }}
          />
          {theme.backgroundAnimations !== false && (
            <motion.div
              style={{
                position: 'absolute',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(14, 165, 233, 0.4), transparent)',
                borderRadius: '50%',
                top: '-250px',
                right: '-250px',
                filter: 'blur(60px)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          {theme.backgroundAnimations !== false && (
            <motion.div
              style={{
                position: 'absolute',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(20, 184, 166, 0.35), transparent)',
                borderRadius: '50%',
                bottom: '-200px',
                left: '-200px',
                filter: 'blur(70px)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.25, 0.45, 0.25],
                x: [0, -40, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          {theme.backgroundAnimations !== false && (
            <motion.div
              style={{
                position: 'absolute',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3), transparent)',
                borderRadius: '50%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(50px)',
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.4, 0.2],
                rotate: [0, 360],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          )}
          {theme.backgroundAnimations !== false && <KoiFishSwarm count={12} />}
        </>
      ) : themeName === 'papaj' ? (
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
              linear-gradient(${theme.gridColor} 1px, transparent 1px),
              linear-gradient(90deg, ${theme.gridColor} 1px, transparent 1px)
            `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite',
              pointerEvents: 'none',
              opacity: 0.4,
            }}
          />
          {theme.backgroundAnimations !== false && (
            <motion.div
              style={{
                position: 'absolute',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(255, 255, 0, 0.3), transparent)',
                borderRadius: '50%',
                top: '-300px',
                right: '-300px',
                filter: 'blur(80px)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          {theme.backgroundAnimations !== false && (
            <motion.div
              style={{
                position: 'absolute',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.35), transparent)',
                borderRadius: '50%',
                bottom: '-250px',
                left: '-250px',
                filter: 'blur(70px)',
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.25, 0.45, 0.25],
                rotate: [360, 180, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          {theme.backgroundAnimations !== false && <PapajSwarm popeCount={6} kremowkaCount={10} />}
        </>
      ) : themeName === 'evangelion' ? (
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
              linear-gradient(${theme.gridColor} 1px, transparent 1px),
              linear-gradient(90deg, ${theme.gridColor} 1px, transparent 1px)
            `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite',
              pointerEvents: 'none',
              opacity: 0.6,
            }}
          />
          {theme.backgroundAnimations !== false && (
            <motion.div
              style={{
                position: 'absolute',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(139, 0, 255, 0.5), transparent)',
                borderRadius: '50%',
                top: '-300px',
                right: '-300px',
                filter: 'blur(60px)',
              }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 0.7, 0.4],
                rotate: [0, 360],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          {theme.backgroundAnimations !== false && (
            <motion.div
              style={{
                position: 'absolute',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(0, 255, 255, 0.4), transparent)',
                borderRadius: '50%',
                bottom: '-250px',
                left: '-250px',
                filter: 'blur(70px)',
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
                rotate: [360, 0],
              }}
              transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          {theme.backgroundAnimations !== false && (
            <motion.div
              style={{
                position: 'absolute',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(255, 107, 0, 0.35), transparent)',
                borderRadius: '50%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(50px)',
              }}
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.25, 0.5, 0.25],
                x: [0, 100, -100, 0],
                y: [0, 50, -50, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          {theme.backgroundAnimations !== false && (
            <motion.div
              style={{
                position: 'absolute',
                width: '350px',
                height: '350px',
                background: 'radial-gradient(circle, rgba(157, 78, 221, 0.4), transparent)',
                borderRadius: '50%',
                top: '20%',
                right: '20%',
                filter: 'blur(55px)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.55, 0.3],
                rotate: [0, -360],
              }}
              transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </>
      ) : (
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
              linear-gradient(${theme.gridColor} 1px, transparent 1px),
              linear-gradient(90deg, ${theme.gridColor} 1px, transparent 1px)
            `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite',
              pointerEvents: 'none',
            }}
          />
          {theme.backgroundAnimations !== false && (
            <motion.div
              style={{
                position: 'absolute',
                width: '300px',
                height: '300px',
                background:
                  themeName === 'catppuccin'
                    ? 'radial-gradient(circle, rgba(137, 180, 250, 0.25), transparent)'
                    : 'radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent)',
                borderRadius: '50%',
                top: '-150px',
                right: '-150px',
                filter: 'blur(40px)',
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          {theme.backgroundAnimations !== false && themeName === 'catppuccin' && (
            <motion.div
              style={{
                position: 'absolute',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(203, 166, 247, 0.2), transparent)',
                borderRadius: '50%',
                bottom: '-100px',
                left: '-100px',
                filter: 'blur(50px)',
              }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </>
      )}
    </>
  )
}

export default ThemeBackground
