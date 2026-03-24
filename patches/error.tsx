'use client'

export default function MainError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a16',
      color: '#f0f0f5',
      padding: 24,
      textAlign: 'center'
    }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
        Something went wrong
      </h2>
      <p style={{ fontSize: 14, color: '#a0a0b8', marginBottom: 24, maxWidth: 400 }}>
        We encountered an unexpected error. Please try again.
      </p>
      <button
        onClick={reset}
        style={{
          padding: '12px 24px',
          borderRadius: 12,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: 'white',
          border: 'none',
          fontWeight: 600,
          cursor: 'pointer',
          fontSize: 14
        }}
      >
        Try Again
      </button>
    </div>
  )
}
