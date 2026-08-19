import { formatPercent } from '../../utils/formatters.js';

const GlobalAggregator = ({ macroF1, accuracy, highlight = false }) => {
  return (
    <div
      style={{
        width: 280,
        background:
          'linear-gradient(135deg, rgba(14,165,160,0.18), rgba(139,92,246,0.14))',
        border: `1px solid ${highlight ? 'var(--accent-teal)' : 'rgba(14,165,160,0.35)'}`,
        borderRadius: 'var(--radius-xl)',
        boxShadow: highlight
          ? '0 0 0 3px rgba(14,165,160,0.2), var(--shadow-lg)'
          : 'var(--shadow-md)',
        padding: 16,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: -80,
          background:
            'radial-gradient(closest-side, rgba(14,165,160,0.22), transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 999,
            background:
              'conic-gradient(from 90deg, #0EA5A0, #2563EB, #8B5CF6, #0EA5A0)',
            display: 'grid',
            placeItems: 'center',
            color: '#fff',
            fontWeight: 800,
            boxShadow: '0 0 0 3px rgba(255,255,255,0.06)',
          }}
        >
          G
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: -0.01,
            }}
          >
            Global Aggregator
          </span>
          <span style={{ fontSize: 11.5, color: 'var(--text-secondary)' }}>
            Fuses regional models → returns updated global weights
          </span>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
          marginTop: 14,
        }}
      >
        <div
          style={{
            padding: 10,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(0,0,0,0.22)',
          }}
        >
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Global Macro F1</div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: 'var(--accent-teal)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {formatPercent(macroF1)}
          </div>
        </div>
        <div
          style={{
            padding: 10,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(0,0,0,0.22)',
          }}
        >
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Accuracy</div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: 'var(--accent-violet)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {formatPercent(accuracy)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalAggregator;
