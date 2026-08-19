const SectionLabel = ({ title, subtitle, right, eyebrow }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 18,
        marginBottom: 16,
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {eyebrow && (
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 0.1,
              textTransform: 'uppercase',
              color: 'var(--accent-teal)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            {eyebrow}
            <span
              aria-hidden
              style={{
                width: 14,
                height: 1.5,
                borderRadius: 999,
                background: 'linear-gradient(90deg, var(--accent-teal), transparent)',
                opacity: 0.5,
              }}
            />
          </span>
        )}
        <h2 style={{ fontSize: 19, letterSpacing: -0.015, lineHeight: 1.3 }}>{title}</h2>
        {subtitle && <p style={{ fontSize: 13.5, maxWidth: 660, lineHeight: 1.6 }}>{subtitle}</p>}
      </div>
      {right && <div>{right}</div>}
    </div>
  );
};

export default SectionLabel;
