import { useLocation } from 'react-router-dom';
import TrackBadge from '../brand/TrackBadge.jsx';
import useDemoMode from '../../hooks/use-demo-mode.js';
import { ROUTES } from '../../constants.js';

const TopBar = () => {
  const { pathname } = useLocation();
  const { track } = useDemoMode();
  const current = ROUTES.find((route) => route.path === pathname) || ROUTES[0];

  return (
    <header className="topbar">
      <div className="topbar-context">
        <h1 className="topbar-title">{current.label}</h1>
        <span aria-hidden="true" style={{ color: 'var(--border-strong)' }}>•</span>
        <span className="topbar-description">{current.description}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <TrackBadge track={track} />
        <div className="topbar-user" aria-label="Current user: Presenter">
          <span className="topbar-avatar">P</span>
          <span className="topbar-user-copy" style={{ fontSize: 12.5, fontWeight: 600 }}>Presenter</span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
