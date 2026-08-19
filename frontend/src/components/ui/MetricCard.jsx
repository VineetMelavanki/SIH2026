import StatusBadge from './StatusBadge.jsx';
import { formatRatio, formatPercent, formatCompact } from '../../utils/formatters.js';

const toneFromTone = (tone) =>
  ({
    teal: {
      fg: 'var(--accent-teal)',
      bg: 'linear-gradient(135deg, rgba(13,148,136,0.12), rgba(13,148,136,0.06))',
      border: 'rgba(13,148,136,0.22)',
      glow: '0 2px 12px -4px rgba(13,148,136,0.25)',
    },
    blue: {
      fg: 'var(--accent-blue)',
      bg: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.06))',
      border: 'rgba(59,130,246,0.22)',
      glow: '0 2px 12px -4px rgba(59,130,246,0.25)',
    },
    violet: {
      fg: 'var(--accent-violet)',
      bg: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(139,92,246,0.06))',
      border: 'rgba(139,92,246,0.22)',
      glow: '0 2px 12px -4px rgba(139,92,246,0.25)',
    },
    pink: {
      fg: 'var(--accent-pink)',
      bg: 'linear-gradient(135deg, rgba(236,72,153,0.12), rgba(236,72,153,0.06))',
      border: 'rgba(236,72,153,0.22)',
      glow: '0 2px 12px -4px rgba(236,72,153,0.25)',
    },
    amber: {
      fg: 'var(--accent-amber)',
      bg: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(245,158,11,0.06))',
      border: 'rgba(245,158,11,0.22)',
      glow: '0 2px 12px -4px rgba(245,158,11,0.25)',
    },
    neutral: {
      fg: 'var(--text-secondary)',
      bg: 'var(--bg-elevated)',
      border: 'var(--border-subtle)',
      glow: 'none',
    },
  }[tone] || {
    fg: 'var(--accent-teal)',
    bg: 'linear-gradient(135deg, rgba(13,148,136,0.12), rgba(13,148,136,0.06))',
    border: 'rgba(13,148,136,0.22)',
    glow: '0 2px 12px -4px rgba(13,148,136,0.25)',
  });

const MetricCard = ({
  label,
  value,
  valueType = 'ratio',
  delta,
  tone = 'teal',
  badge,
  hint,
  icon,
}) => {
  const t = toneFromTone(tone);
  const displayValue =
    valueType === 'percent'
      ? formatPercent(value)
      : valueType === 'integer'
      ? formatCompact(value)
      : valueType === 'ratio'
      ? formatRatio(value, 3)
      : String(value ?? '—');

  return (
    <div
      className="metric-card"
      style={{
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 18,
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        minHeight: 138,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = t.border;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {icon && (
            <span
              style={{
                display: 'grid',
                placeItems: 'center',
                width: 34,
                height: 34,
                borderRadius: 10,
                background: t.bg,
                border: `1px solid ${t.border}`,
                color: t.fg,
                fontSize: 16,
                boxShadow: t.glow,
                transition: 'all 0.3s ease',
              }}
            >
              {icon}
            </span>
          )}
          <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: -0.005 }}>
            {label}
          </span>
        </div>
        {badge && typeof badge === 'string' ? <StatusBadge tone="privacy">{badge}</StatusBadge> : badge}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, position: 'relative' }}>
        <span
          style={{
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: -0.025,
            color: 'var(--text-primary)',
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 1.1,
          }}
        >
          {displayValue}
        </span>
        {delta != null && (
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: Number(delta) >= 0 ? 'var(--accent-green)' : 'var(--accent-red)',
              padding: '3px 8px',
              borderRadius: 999,
              background: Number(delta) >= 0
                ? 'rgba(16,185,129,0.10)'
                : 'rgba(239,68,68,0.10)',
            }}
          >
            {Number(delta) >= 0 ? '▲' : '▼'} {formatPercent(Math.abs(Number(delta)), 1)}
          </span>
        )}
      </div>
      {hint && (
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 'auto', lineHeight: 1.45, position: 'relative' }}>{hint}</p>
      )}
    </div>
  );
};

export default MetricCard;
