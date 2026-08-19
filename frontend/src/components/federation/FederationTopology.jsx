import demoData from '../../data/demo-data.js';
import BankNode from './BankNode.jsx';
import RegionalAggregator from './RegionalAggregator.jsx';
import GlobalAggregator from './GlobalAggregator.jsx';
import ProtectedUpdatePacket from './ProtectedUpdatePacket.jsx';

const regionalF1FromRound = (round, region) => {
  if (!round?.bankUpdates) return 0;
  const regionBanks = demoData.banks.regions.find((r) => r.id === region.id)?.banks || [];
  const relevant = round.bankUpdates.filter((u) => regionBanks.includes(u.bankId));
  if (!relevant.length) return 0;
  return relevant.reduce((s, u) => s + Number(u.localF1 || 0), 0) / relevant.length;
};

const updateActiveForPhase = (phase) =>
  phase === 'protected' || phase === 'regional' || phase === 'global';

const FederationTopology = ({ round }) => {
  const regions = demoData.banks.regions;
  const allBanks = demoData.banks.banks;
  const phase = round?.phase;
  const updatesMoving = updateActiveForPhase(phase);

  return (
    <div
      style={{
        background:
          'radial-gradient(60% 60% at 50% 0%, rgba(14,165,160,0.08), transparent 70%), var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding: 22,
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <GlobalAggregator
          macroF1={round?.globalMacroF1 ?? 0}
          accuracy={round?.globalAccuracy ?? 0}
          highlight={phase === 'global'}
        />
      </div>

      <div
        aria-hidden
        style={{
          position: 'relative',
          height: 28,
          margin: '-4px 0 -10px',
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 100 28" preserveAspectRatio="none">
          <defs>
            <linearGradient id="csl-global-arc" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#0EA5A0" stopOpacity="0.0" />
              <stop offset="50%" stopColor="#0EA5A0" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M2,26 C 20,0 80,0 98,26"
            stroke="url(#csl-global-arc)"
            strokeWidth="1.5"
            strokeDasharray={updatesMoving ? '' : '4 4'}
            fill="none"
          />
        </svg>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${regions.length}, 1fr)`,
          gap: 18,
        }}
      >
        {regions.map((region) => (
          <div
            key={region.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
              padding: 16,
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-surface-2)',
              border: '1px solid var(--border-subtle)',
              position: 'relative',
            }}
          >
            <RegionalAggregator
              region={region}
              regionalF1={regionalF1FromRound(round, region)}
              highlight={phase === 'regional'}
            />

            <div style={{ display: 'flex', gap: 8 }}>
              <ProtectedUpdatePacket
                from="Banks"
                to="Region"
                active={updatesMoving}
                size="S"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {region.banks.map((bankId) => {
                const bank = allBanks.find((b) => b.id === bankId);
                const upd = round?.bankUpdates?.find((u) => u.bankId === bankId);
                return (
                  <BankNode
                    key={bankId}
                    bank={bank}
                    localF1={upd?.localF1 ?? 0}
                    samples={upd?.samples ?? bank?.dailyTrafficSamples ?? 0}
                    compact
                    highlight={phase === 'local'}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FederationTopology;
