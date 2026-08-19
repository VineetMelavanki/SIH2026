const ConsilienceLogo = ({ size = 28, showText = true }) => {
  return (
    <div className="csl-logo" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Consilience logo"
      >
        <defs>
          <linearGradient id="csl-g" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0EA5A0" />
            <stop offset="55%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#csl-g)" opacity="0.16" />
        <path
          d="M20 7 L31 14 V26 L20 33 L9 26 V14 Z"
          fill="none"
          stroke="url(#csl-g)"
          strokeWidth="2.2"
        />
        <circle cx="20" cy="20" r="3.6" fill="url(#csl-g)" />
        <circle cx="12.5" cy="15.5" r="1.8" fill="#0EA5A0" />
        <circle cx="27.5" cy="15.5" r="1.8" fill="#2563EB" />
        <circle cx="20" cy="29" r="1.8" fill="#8B5CF6" />
      </svg>
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: -0.01,
              color: 'var(--text-primary)',
            }}
          >
            Consilience
          </span>
          <span style={{ fontSize: 10.5, color: 'var(--text-muted)', letterSpacing: 0.04 }}>
            Federated IDS Console
          </span>
        </div>
      )}
    </div>
  );
};

export default ConsilienceLogo;
