import React from 'react'

function SectionTitle({ children, theme, style, ...props }) {
  const titleStyle = {
    fontSize: 'clamp(1.5rem, 5vw, 2rem)',
    fontWeight: 800,
    color: theme.textPrimary,
    marginBottom: 24,
    letterSpacing: '-0.5px',
    lineHeight: 1.2,
    ...style,
  }

  return (
    <h1 style={titleStyle} {...props}>
      {children}
    </h1>
  )
}

export default SectionTitle
