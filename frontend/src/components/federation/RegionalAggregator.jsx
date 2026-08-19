import { regionColor } from '../../data/labels.js';
import { formatPercent } from '../../utils/formatters.js';

const RegionalAggregator = ({ region, regionalF1, highlight = false }) => {
  const accent = regionColor(region.id);
  return (
    <div
      style={{
        width: 230,
        background: `linear-gradient(135deg, ${accent}18, var(--bg-surface))`,
        border: `1px solid ${highlight ? accent : 'var(--border-strong)'}`,
        borderRadius: 'var(--radius-lg)',
        boxShadow: highlight ? `0 0 0 3px ${accent}22, var(--shadow-md)` : 'var(--shadow-sm)',
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 999,
            background: `${accent}22`,
            border: `1px solid ${accent}66`,
            display: 'grid',
            placeItems: 'center',
            color: accent,
            fontSize: 14,
          }}
        >
          ↻
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
            {region.name} Aggregator
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            {region.banks.length} banks · weighted averaging
          </span>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 8,
          fontSize: 11,
          background: 'rgba(0,0,0,0.18)',
          borderRadius: 'var(--radius-sm)',
          padding: 8,
        }}
      >
        <div>
          <div style={{ color: 'var(--text-muted)' }}>Regional F1</div>
          <div
            style={{
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: 14,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {formatPercent(regionalF1)}
          </div>
        </div>
        <div>
          <div style={{ color: 'var(--text-muted)' }}>Trusted role</div>
          <div style={{ color: accent, fontWeight: 700, fontSize: 12 }}>Regional fusion</div>
        </div>
      </div>
    </div>
  );
};

export default RegionalAggregator;
