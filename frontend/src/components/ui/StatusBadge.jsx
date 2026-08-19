const StatusBadge = ({ tone = 'neutral', children }) => {
  const tones = {
    online: {
      bg: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.06))',
      fg: '#059669',
      border: 'rgba(16,185,129,0.28)',
    },
    neutral: {
      bg: 'var(--bg-elevated)',
      fg: 'var(--text-secondary)',
      border: 'var(--border-subtle)',
    },
    info: {
      bg: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.06))',
      fg: '#2563EB',
      border: 'rgba(59,130,246,0.28)',
    },
    warn: {
      bg: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(245,158,11,0.06))',
      fg: '#D97706',
      border: 'rgba(245,158,11,0.28)',
    },
    danger: {
      bg: 'linear-gradient(135deg, rgba(239,68,68,0.12), rgba(239,68,68,0.06))',
      fg: '#DC2626',
      border: 'rgba(239,68,68,0.28)',
    },
    privacy: {
      bg: 'linear-gradient(135deg, rgba(13,148,136,0.12), rgba(13,148,136,0.06))',
      fg: '#0D9488',
      border: 'rgba(13,148,136,0.28)',
    },
    critical: {
      bg: 'linear-gradient(135deg, rgba(139,44,110,0.16), rgba(139,44,110,0.08))',
      fg: '#9D174D',
      border: 'rgba(139,44,110,0.35)',
    },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        borderRadius: 999,
        fontSize: 11.5,
        fontWeight: 600,
        letterSpacing: 0.02,
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.border}`,
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        aria-hidden
        style={{
          width: 5,
          height: 5,
          borderRadius: 999,
          background: t.fg,
          boxShadow: `0 0 0 3px ${t.border}`,
        }}
      />
      {children}
    </span>
  );
};

export default StatusBadge;
