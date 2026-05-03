interface RetryButtonProps {
  onClick: () => void
  disabled?: boolean
}

export default function RetryButton({
  onClick,
  disabled = false,
}: RetryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 16px',
        fontSize: '0.82rem',
        fontWeight: 600,
        borderRadius: 8,
        border: '1px solid var(--line)',
        background: 'var(--paper)',
        color: 'var(--accent)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.2s',
        marginTop: 8,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          ;(e.currentTarget as HTMLButtonElement).style.background =
            'var(--accent-soft)'
          ;(e.currentTarget as HTMLButtonElement).style.borderColor =
            'var(--accent)'
        }
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.background =
          'var(--paper)'
        ;(e.currentTarget as HTMLButtonElement).style.borderColor =
          'var(--line)'
      }}
      aria-label="Try again"
    >
      ↻ Try again
    </button>
  )
}
