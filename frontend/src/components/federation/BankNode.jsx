import { regionColor } from '../../data/labels.js';
import StatusBadge from '../ui/StatusBadge.jsx';
import { formatCompact, formatLatency, formatPercent } from '../../utils/formatters.js';

const BankNode = ({ bank, localF1, samples, highlight = false, compact = false }) => {
  if (!bank) return null;
  const accent = regionColor(bank.region);
  return (
    <div
      style={{
        width: compact ? 170 : 220,
        background: 'var(--bg-surface)',
        border: `1px solid ${highlight ? accent : 'var(--border-strong)'}`,
        borderRadius: 'var(--radius-lg)',
        boxShadow: highlight
          ? `0 0 0 3px ${accent}22, var(--shadow-md)`
          : 'var(--shadow-sm)',
        padding: 12,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: accent,
        }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          marginBottom: 8,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: `${accent}22`,
              border: `1px solid ${accent}55`,
              display: 'grid',
              placeItems: 'center',
              fontSize: 10,
              fontWeight: 700,
              color: accent,
            }}
          >
            🏦
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 120,
              }}
              title={bank.name}
            >
              {bank.name}
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>
              {bank.location} · {bank.regionName}
            </div>
          </div>
        </div>
        <StatusBadge tone={bank.status === 'online' ? 'online' : 'neutral'}>
          {bank.status}
        </StatusBadge>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 6,
          fontSize: 11,
          marginTop: 6,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <span style={{ color: 'var(--text-muted)' }}>Local F1</span>
          <span
            style={{
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {formatPercent(localF1)}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <span style={{ color: 'var(--text-muted)' }}>Samples</span>
          <span
            style={{
              color: 'var(--text-primary)',
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {formatCompact(samples)}
          </span>
        </div>
        {!compact && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ color: 'var(--text-muted)' }}>Latency</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                {formatLatency(bank.latencyMs)}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{ color: 'var(--text-muted)' }}>Epochs</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                {bank.localEpochs}
              </span>
            </div>
          </>
        )}
      </div>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 8,
          border: '1px dashed rgba(14,165,160,0.35)',
          borderRadius: 'var(--radius-md)',
          pointerEvents: 'none',
          opacity: highlight ? 1 : 0.4,
        }}
      />
    </div>
  );
};

export default BankNode;
