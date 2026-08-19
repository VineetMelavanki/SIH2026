const ProtectedUpdatePacket = ({ from, to, active = false, size = 'M' }) => {
  const sizeMap = { S: 8, M: 12, L: 16 };
  const dim = sizeMap[size] || 12;
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        opacity: active ? 1 : 0.35,
        transition: 'opacity 300ms ease',
      }}
      title={`Protected update: ${from} → ${to}`}
    >
      <div
        style={{
          width: dim,
          height: dim,
          borderRadius: 4,
          background: 'var(--accent-teal)',
          boxShadow: active
            ? '0 0 16px rgba(14,165,160,0.6), inset 0 0 0 1px rgba(255,255,255,0.2)'
            : 'inset 0 0 0 1px rgba(255,255,255,0.1)',
          animation: active ? 'csl-pulse 1.4s ease-in-out infinite' : 'none',
        }}
      />
      <span
        style={{
          fontSize: 10.5,
          color: active ? 'var(--accent-teal)' : 'var(--text-muted)',
          fontWeight: 600,
          letterSpacing: 0.02,
        }}
      >
        {from} → {to}
      </span>
      <style>
        {`
          @keyframes csl-pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.25); opacity: 0.7; }
          }
        `}
      </style>
    </div>
  );
};

export default ProtectedUpdatePacket;
