const TrackBadge = ({ track = 'Finance & AI' }) => {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '5px 12px',
        borderRadius: 999,
        fontSize: 11.5,
        fontWeight: 600,
        letterSpacing: 0.02,
        color: '#0D9488',
        background: 'linear-gradient(135deg, rgba(13,148,136,0.10), rgba(13,148,136,0.05))',
        border: '1px solid rgba(13,148,136,0.22)',
        transition: 'all 0.25s ease',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: 999,
          background: 'linear-gradient(135deg, #0D9488, #14B8A6)',
          boxShadow: '0 0 0 3px rgba(13,148,136,0.15), 0 0 12px -2px rgba(13,148,136,0.5)',
        }}
      />
      {track}
    </span>
  );
};

export default TrackBadge;
