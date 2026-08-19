import ConsilienceLogo from './ConsilienceLogo.jsx';
import TrackBadge from './TrackBadge.jsx';
import useDemoMode from '../../hooks/use-demo-mode.js';

const ProjectIdentity = ({ compact = false }) => {
  const { tagline, track } = useDemoMode();
  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <ConsilienceLogo size={26} showText={true} />
        <TrackBadge track={track} />
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <ConsilienceLogo size={34} showText={false} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.01 }}>Consilience</span>
          <span style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>{tagline}</span>
        </div>
      </div>
      <div style={{ marginTop: 2 }}>
        <TrackBadge track={track} />
      </div>
    </div>
  );
};

export default ProjectIdentity;
