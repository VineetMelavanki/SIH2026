import useDemoMode from '../../hooks/use-demo-mode.js';

const DemoDataBanner = () => {
  const { label, tagline } = useDemoMode();
  return (
    <div
      style={{
        minHeight: 'var(--banner-h)',
        padding: '9px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        background: '#eef6f5',
        borderBottom: '1px solid #d8e9e6',
        color: 'var(--text-secondary)',
        fontSize: 12.5,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
        <span
          style={{
            display: 'grid',
            placeItems: 'center',
            width: 20,
            height: 20,
            borderRadius: 999,
            background: '#ffffff',
            color: 'var(--accent-teal)',
            fontSize: 11,
            fontWeight: 700,
            border: '1px solid rgba(13,148,136,0.22)',
          }}
        >
          i
        </span>
        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{tagline}</span>
        <span style={{ color: 'var(--text-muted)', opacity: 0.6 }}>·</span>
        <span>{label}</span>
      </div>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 11,
          padding: '4px 10px',
          borderRadius: 999,
          background: '#ffffff',
          border: '1px solid rgba(13,148,136,0.20)',
          color: 'var(--accent-teal)',
          fontWeight: 700,
          letterSpacing: 0.05,
          position: 'relative',
        }}
      >
        <span
          aria-hidden
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: 'var(--accent-teal)',
            boxShadow: '0 0 0 3px rgba(13,148,136,0.18)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
        DEMO MODE
      </span>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
};

export default DemoDataBanner;
