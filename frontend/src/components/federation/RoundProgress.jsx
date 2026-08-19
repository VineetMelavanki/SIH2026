import { phaseColor, PHASE_LABELS } from '../../data/labels.js';
import { formatRoundTitle } from '../../utils/formatters.js';

const RoundProgress = ({
  index,
  total,
  progress,
  round,
  onPlay,
  onPause,
  onReset,
  onBack,
  onStep,
  onGo,
  playing,
  phaseOrder,
  phaseLabels = PHASE_LABELS,
}) => {
  const pct = Math.max(0, Math.min(1, Number(progress ?? 0))) * 100;
  const phase = round?.phase;
  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 16,
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ fontSize: 11.5, color: 'var(--text-muted)', letterSpacing: 0.04 }}>
            FEDERATION PLAYBACK
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.01 }}>
              {formatRoundTitle(index, round?.phaseLabel || 'Initialization')}
            </span>
            <span
              style={{
                padding: '3px 8px',
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                background: phase ? `${phaseColor(phase)}22` : 'var(--bg-elevated)',
                color: phase ? phaseColor(phase) : 'var(--text-secondary)',
                border: `1px solid ${phase ? `${phaseColor(phase)}55` : 'var(--border-subtle)'}`,
              }}
            >
              {round?.phaseLabel || phaseLabels[phase] || phase}
            </span>
          </div>
          <p style={{ fontSize: 12.5 }}>{round?.description || ''}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            onClick={onReset}
            style={buttonReset}
            title="Reset"
          >
            ⏮
          </button>
          <button onClick={onBack} style={buttonStyle} title="Previous round">
            ‹
          </button>
          <button
            onClick={playing ? onPause : onPlay}
            style={{
              ...buttonStyle,
              background: 'var(--accent-teal)',
              color: '#052223',
              borderColor: 'var(--accent-teal)',
              fontWeight: 700,
              padding: '8px 16px',
            }}
            title={playing ? 'Pause' : 'Play'}
          >
            {playing ? '❚❚ Pause' : '▶ Play Round'}
          </button>
          <button onClick={onStep} style={buttonStyle} title="Next round">
            ›
          </button>
        </div>
      </div>

      <div
        style={{
          height: 6,
          background: 'var(--bg-elevated)',
          borderRadius: 999,
          overflow: 'hidden',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background:
              'linear-gradient(90deg, var(--accent-teal), var(--accent-violet))',
            transition: 'width 400ms ease',
          }}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${total}, 1fr)`,
          gap: 4,
        }}
      >
        {Array.from({ length: total }, (_, i) => {
          const isCurrent = i === index;
          const isDone = i < index;
          const rPhase = phaseOrder ? phaseOrder[i % phaseOrder.length] : null;
          return (
            <button
              key={i}
              onClick={() => onGo(i)}
              style={{
                padding: '6px 4px',
                borderRadius: 6,
                fontSize: 10.5,
                fontWeight: 600,
                color: isCurrent
                  ? '#052223'
                  : isDone
                  ? 'var(--accent-teal)'
                  : 'var(--text-muted)',
                background: isCurrent
                  ? 'linear-gradient(135deg, #0EA5A0, #2563EB)'
                  : isDone
                  ? 'rgba(14,165,160,0.1)'
                  : 'var(--bg-elevated)',
                border: `1px solid ${isCurrent ? 'transparent' : isDone ? 'rgba(14,165,160,0.35)' : 'var(--border-subtle)'}`,
                cursor: 'pointer',
                fontVariantNumeric: 'tabular-nums',
              }}
              title={`Go to round ${i + 1}${rPhase ? ` · ${phaseLabels?.[rPhase] || rPhase}` : ''}`}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '8px 12px',
  borderRadius: 'var(--radius-md)',
  background: 'var(--bg-elevated)',
  color: 'var(--text-primary)',
  border: '1px solid var(--border-subtle)',
  fontWeight: 700,
  cursor: 'pointer',
  fontSize: 13,
};
const buttonReset = {
  ...buttonStyle,
  fontSize: 11,
  letterSpacing: 0.02,
  color: 'var(--text-secondary)',
};

export default RoundProgress;
