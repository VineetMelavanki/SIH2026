import { Link } from 'react-router-dom';
import ProjectIdentity from '../components/brand/ProjectIdentity.jsx';

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: '100%',
        display: 'grid',
        placeItems: 'center',
        padding: '40px 28px',
      }}
    >
      <div
        style={{
          maxWidth: 540,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 18,
        }}
      >
        <ProjectIdentity />
        <div
          style={{
            fontSize: 120,
            fontWeight: 800,
            letterSpacing: -0.04,
            lineHeight: 1,
            background:
              'linear-gradient(135deg, var(--accent-teal), var(--accent-violet))',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          404
        </div>
        <h1 style={{ fontSize: 24 }}>This route isn't in the federation.</h1>
        <p style={{ fontSize: 14 }}>
          The presenter click path is: Home → Federation → Privacy → Performance → Methodology.
          No login, no settings, no database routes are part of this in-scope demo.
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          <Link
            to="/"
            style={{
              padding: '10px 16px',
              borderRadius: 10,
              background: 'linear-gradient(135deg, #0EA5A0, #2563EB)',
              color: '#052223',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: 13.5,
            }}
          >
            ← Back to Home
          </Link>
          <Link
            to="/federation"
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: 13,
              border: '1px solid var(--border-strong)',
            }}
          >
            Open Federation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
