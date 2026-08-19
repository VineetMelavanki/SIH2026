const DataBoundaryLegend = () => {
  const items = [
    {
      color: 'rgba(14,165,160,0.16)',
      stroke: 'rgba(14,165,160,0.45)',
      label: 'Inside the bank',
      detail: 'Raw traffic, local training, features. Never leaves premises.',
      pattern: 'dashed',
    },
    {
      color: 'rgba(14,165,160,0.25)',
      stroke: 'var(--accent-teal)',
      label: 'Protected update',
      detail: 'Clipped gradients + calibrated Gaussian noise. What actually travels.',
      pattern: 'solid',
    },
    {
      color: 'rgba(139,92,246,0.14)',
      stroke: 'rgba(139,92,246,0.45)',
      label: 'Trusted aggregator',
      detail: 'Regional then global weighted averaging. Cryptographic secagg is future work.',
      pattern: 'solid',
    },
  ];
  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div style={{ fontSize: 11, letterSpacing: 0.06, fontWeight: 700, color: 'var(--text-muted)' }}>
        DATA BOUNDARIES · LEGEND
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {items.map((it) => (
          <div
            key={it.label}
            style={{
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
              padding: 10,
              background: 'var(--bg-surface-2)',
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${it.stroke}`,
            }}
          >
            <div
              aria-hidden
              style={{
                width: 28,
                height: 28,
                flexShrink: 0,
                borderRadius: 6,
                background: it.color,
                border: `1.5px ${it.pattern} ${it.stroke}`,
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)' }}>
                {it.label}
              </span>
              <p style={{ fontSize: 11.5 }}>{it.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataBoundaryLegend;
