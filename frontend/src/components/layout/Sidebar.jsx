import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants.js';
import ProjectIdentity from '../brand/ProjectIdentity.jsx';

const ICONS = {
  home: <><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></>,
  network: <><circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7.5V14M10.5 15 6 18M13.5 15l4.5 3"/></>,
  shield: <><path d="m12 3 8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3Z"/><path d="m9 12 2 2 4-4"/></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
  book: <><path d="M4 4h11a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4Z"/><path d="M4 16a4 4 0 0 1 4-4h11"/></>,
};

const SidebarIcon = ({ name }) => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {ICONS[name]}
  </svg>
);

const Sidebar = () => (
  <aside className="sidebar" aria-label="Primary navigation">
    <div className="project-identity-copy"><ProjectIdentity compact={false} /></div>
    <div>
      <div className="sidebar-nav-label">Workspace</div>
      <nav className="sidebar-nav">
        {ROUTES.map((route) => (
          <NavLink key={route.path} to={route.path} className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`} title={route.label}>
            <span className="sidebar-link-icon"><SidebarIcon name={route.icon} /></span>
            <span className="sidebar-link-label">{route.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
    <div className="sidebar-footer">
      <span style={{ color: 'var(--accent-green)', fontSize: 12 }}>●</span>
      <div className="sidebar-footer-copy" style={{ marginTop: 7 }}>
        <div style={{ fontSize: 12.5, fontWeight: 650 }}>Demo workspace</div>
        <p style={{ fontSize: 11.5, marginTop: 2 }}>All systems ready</p>
      </div>
    </div>
  </aside>
);

export default Sidebar;
