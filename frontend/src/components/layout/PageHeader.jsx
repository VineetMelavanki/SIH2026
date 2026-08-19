import StatusBadge from '../ui/StatusBadge.jsx';

const PageHeader = ({ eyebrow, title, subtitle, primaryAction, secondaryActions, badges, right }) => (
  <div className="page-header">
    <div className="page-header-copy">
      {eyebrow && <div className="page-eyebrow">{eyebrow}</div>}
      <div className="page-header-title-row">
        <h1 className="page-header-title">{title}</h1>
        {badges?.map((badge, index) => typeof badge === 'string'
          ? <StatusBadge key={index} tone="privacy">{badge}</StatusBadge>
          : <span key={index}>{badge}</span>)}
      </div>
      {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
    </div>
    {(secondaryActions || primaryAction || right) && (
      <div className="page-header-actions">
        {secondaryActions}{primaryAction}{right}
      </div>
    )}
  </div>
);

export default PageHeader;
