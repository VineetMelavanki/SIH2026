const EmptyState = ({ title, description, action }) => {
  return (
    <div
      style={{
        padding: 32,
        borderRadius: 'var(--radius-lg)',
        border: '1.5px dashed var(--border-strong)',
        background: 'linear-gradient(145deg, #FFFFFF, #FAFBFC)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 10,
        minHeight: 160,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(600px 400px at 50% 0%, rgba(13,148,136,0.06), transparent 60%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 999,
          background: 'linear-gradient(135deg, rgba(13,148,136,0.10), rgba(139,92,246,0.08))',
          border: '1px solid rgba(13,148,136,0.18)',
          display: 'grid',
          placeItems: 'center',
          marginBottom: 4,
          position: 'relative',
        }}
      >
        <span style={{ color: 'var(--accent-teal)', fontSize: 20 }}>◇</span>
      </div>
      <h3 style={{ fontSize: 15.5, color: 'var(--text-primary)', fontWeight: 600, position: 'relative' }}>{title}</h3>
      {description && <p style={{ fontSize: 13, maxWidth: 440, lineHeight: 1.6, position: 'relative' }}>{description}</p>}
      {action && <div style={{ marginTop: 8, position: 'relative' }}>{action}</div>}
    </div>
  );
};

export default EmptyState;
