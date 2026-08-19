import { Link } from 'react-router-dom';
import demoData from '../data/demo-data.js';
import useDemoMode from '../hooks/use-demo-mode.js';
import { REGION_COLORS } from '../constants.js';
import { formatCompact, formatPercent } from '../utils/formatters.js';

const ROUTES_META = [
  {
    path: '/federation',
    label: 'Federation',
    icon: '🔗',
    color: '#0EA5A0',
    gradient: 'linear-gradient(135deg,#0EA5A022,#0EA5A008)',
    border: 'rgba(14,165,160,0.25)',
    desc: 'Watch 12 federated rounds animate in real time. See how protected updates flow from banks to regional and global aggregators.',
    cta: 'Explore federation →',
  },
  {
    path: '/privacy',
    label: 'Privacy & Trust',
    icon: '🛡',
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg,#8B5CF622,#8B5CF608)',
    border: 'rgba(139,92,246,0.25)',
    desc: 'Compare 4 differential privacy scenarios. Inspect cumulative epsilon budget, per-class F1 impact, and privacy–utility trade-offs.',
    cta: 'View privacy controls →',
  },
  {
    path: '/performance',
    label: 'Detection Performance',
    icon: '📈',
    color: '#DB2777',
    gradient: 'linear-gradient(135deg,#DB277722,#DB277708)',
    border: 'rgba(219,39,119,0.25)',
    desc: 'Per-class precision, recall, F1. Interactive confusion matrix. Bank-level comparison. No misleading single-number hero metric.',
    cta: 'See metrics →',
  },
  {
    path: '/methodology',
    label: 'Methodology & Scope',
    icon: '📋',
    color: '#2563EB',
    gradient: 'linear-gradient(135deg,#2563EB22,#2563EB08)',
    border: 'rgba(37,99,235,0.25)',
    desc: "CICIDS2017 dataset. 7-class attack vocabulary. What's in scope, what's not, and what's labelled honestly as future work.",
    cta: 'Read methodology →',
  },
];

const FLOW_STEPS = [
  {
    num: '01',
    title: 'Train Locally',
    icon: '🧠',
    color: '#2563EB',
    desc: 'Each bank learns from its own private network traffic. Raw data never leaves the on-prem perimeter.',
    detail: '5–6 local epochs · batch size 160–320 · GPU cluster',
  },
  {
    num: '02',
    title: 'Protect the Update',
    icon: '🔐',
    color: '#0EA5A0',
    desc: 'Gradients are L2-clipped and Gaussian noise is applied before the tiny update packet is allowed to cross the boundary.',
    detail: 'Clip norm C = 1.0 · noise σ = 1.0 · ε/round = 0.67',
  },
  {
    num: '03',
    title: 'Regional Aggregation',
    icon: '🌐',
    color: '#8B5CF6',
    desc: 'Trusted aggregator collects protected updates from banks in the same region and computes a weighted regional model.',
    detail: 'North · West · South — 2 banks each · sample-weighted',
  },
  {
    num: '04',
    title: 'Global Aggregation',
    icon: '✅',
    color: '#DB2777',
    desc: 'Regional models are aggregated into a global model that every bank downloads and uses as its next local starting point.',
    detail: 'Global Macro F1 = 83.8% after 12 rounds (balanced ε)',
  },
];

const Home = () => {
  const { tagline, track, dataset } = useDemoMode();
  const { banks, regions } = demoData.banks;
  const allRounds = demoData.rounds.rounds;
  const finalRound = allRounds.at(-1);
  const dailySamples = banks.reduce((t, b) => t + b.dailyTrafficSamples, 0);
  const totalCustomers = banks.reduce((t, b) => t + b.customerCount, 0);

  const REGION_NAMES = { north: 'Northern', west: 'Western', south: 'Southern' };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: 60 }}>

      {/* ══ HERO ══ */}
      <div style={{
        background: 'linear-gradient(135deg,#060d1e 0%,#0d1f3c 50%,#0a1628 100%)',
        padding: '56px 40px 48px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        {/* Teal glow */}
        <div style={{
          position: 'absolute', top: -120, right: -80, width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(14,165,160,0.22) 0%,transparent 65%)',
          pointerEvents: 'none',
        }} />
        {/* Violet glow */}
        <div style={{
          position: 'absolute', bottom: -160, left: -80, width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(139,92,246,0.15) 0%,transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: 820 }}>
          {/* Track badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <span style={{
              fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#0EA5A0', padding: '4px 12px', borderRadius: 99,
              border: '1px solid rgba(14,165,160,0.4)', background: 'rgba(14,165,160,0.1)',
            }}>Private Intelligence Network</span>
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase',
              color: '#475569',
            }}>{track}</span>
          </div>

          {/* Main headline */}
          <h1 style={{
            color: '#f1f5f9', fontSize: 'clamp(26px,4vw,54px)', fontWeight: 800,
            lineHeight: 1.1, letterSpacing: '-0.04em', marginBottom: 18,
          }}>
            Learn from shared<br />
            attack patterns,<br />
            <span style={{
              background: 'linear-gradient(90deg,#0EA5A0,#2563EB)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>without sharing raw traffic.</span>
          </h1>

          <p style={{
            color: '#94a3b8', fontSize: 16, lineHeight: 1.7,
            maxWidth: 580, marginBottom: 32,
          }}>
            {tagline} — Consilience runs a federated learning consortium across {banks.length} banks in {regions.length} regions, keeping every byte of network traffic inside its originating institution.
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/federation" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', borderRadius: 99,
              background: 'linear-gradient(135deg,#0EA5A0,#2563EB)',
              color: '#fff', fontWeight: 700, fontSize: 14,
              textDecoration: 'none',
              boxShadow: '0 4px 24px -4px rgba(14,165,160,0.6)',
              transition: 'all 0.2s ease',
            }}>
              <span>▶ Watch Federation Live</span>
            </Link>
            <Link to="/performance" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', borderRadius: 99,
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#e2e8f0', fontWeight: 600, fontSize: 14,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}>
              See detection metrics →
            </Link>
          </div>
        </div>

        {/* Floating stat strip */}
        <div style={{
          position: 'relative', marginTop: 48,
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12,
        }}>
          {[
            { label: 'Participating banks', value: banks.length, sub: `${regions.length} regional groups`, color: '#0EA5A0' },
            { label: 'Protected samples / day', value: formatCompact(dailySamples), sub: 'Raw traffic stays on-prem', color: '#2563EB' },
            { label: 'Global Macro F1', value: formatPercent(finalRound.globalMacroF1), sub: 'After 12 federated rounds', color: '#8B5CF6' },
            { label: 'Total customers covered', value: formatCompact(totalCustomers), sub: 'Across all 6 simulated banks', color: '#DB2777' },
            { label: 'Dataset', value: dataset, sub: '2.47M labelled samples', color: '#C26C2C' },
          ].map((s) => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 14, padding: '16px 18px',
              backdropFilter: 'blur(8px)',
            }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: 5 }}>{s.value}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 10.5, color: '#475569' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ HOW IT WORKS ══ */}
      <div style={{ padding: '40px 40px 0' }}>
        <div style={{ marginBottom: 28, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#0EA5A0', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>The Essential Flow</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1.2 }}>Data stays put.<br />Intelligence improves.</h2>
          </div>
          <p style={{ fontSize: 13.5, color: '#64748b', maxWidth: 360, lineHeight: 1.65 }}>
            Four stages make the privacy boundary easy to explain to reviewers, auditors, and technical judges.
          </p>
        </div>

        {/* Flow steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, position: 'relative' }}>
          {FLOW_STEPS.map((step, i) => (
            <div key={step.num} style={{ position: 'relative' }}>
              {/* Connector line */}
              {i < FLOW_STEPS.length - 1 && (
                <div style={{
                  position: 'absolute', top: 28, right: -8, width: 16, height: 2,
                  background: `linear-gradient(90deg,${step.color},${FLOW_STEPS[i+1].color})`,
                  zIndex: 1,
                  display: 'none', // hidden on mobile-style wrapping
                }} />
              )}
              <div style={{
                background: '#fff',
                border: `1.5px solid ${step.color}22`,
                borderRadius: 18, padding: '22px 22px',
                height: '100%',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                borderTop: `3px solid ${step.color}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 12, display: 'grid', placeItems: 'center',
                    background: `${step.color}15`, border: `1px solid ${step.color}33`,
                    fontSize: 20,
                  }}>{step.icon}</div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: step.color, letterSpacing: '0.08em' }}>{step.num}</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a' }}>{step.title}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, marginBottom: 14 }}>{step.desc}</p>
                <div style={{
                  padding: '8px 12px', borderRadius: 8,
                  background: `${step.color}08`, border: `1px solid ${step.color}18`,
                  fontSize: 11.5, color: step.color, fontWeight: 600, fontFamily: 'monospace',
                }}>
                  {step.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ CONSORTIUM ══ */}
      <div style={{ padding: '40px 40px 0' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Consortium</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>One network, three regions.</h2>
          <p style={{ fontSize: 13.5, color: '#64748b', marginTop: 6 }}>{dataset} data is represented through six simulated banks.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {regions.map((region) => {
            const rc = REGION_COLORS[region.id] || '#64748b';
            const regionBanks = banks.filter((b) => b.region === region.id);
            const regionSamples = regionBanks.reduce((t, b) => t + b.dailyTrafficSamples, 0);
            return (
              <div key={region.id} style={{
                background: '#fff', border: '1px solid var(--border-subtle)',
                borderRadius: 18, overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
              }}>
                {/* Region header */}
                <div style={{
                  background: `${rc}10`,
                  borderBottom: `1px solid ${rc}20`,
                  padding: '14px 18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: rc }} />
                    <span style={{ fontSize: 13, fontWeight: 800, color: rc }}>{REGION_NAMES[region.id] || region.id} Region</span>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: rc,
                    background: `${rc}12`, padding: '2px 8px', borderRadius: 99,
                    border: `1px solid ${rc}25`,
                  }}>
                    {region.banks.length} banks
                  </span>
                </div>

                {/* Bank rows */}
                <div style={{ padding: '8px 0' }}>
                  {regionBanks.map((bank, idx) => (
                    <div key={bank.id} style={{
                      padding: '10px 18px',
                      borderBottom: idx < regionBanks.length - 1 ? '1px solid #f1f5f9' : 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: 8, display: 'grid', placeItems: 'center',
                          background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: 14,
                        }}>🏦</div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{bank.name}</div>
                          <div style={{ fontSize: 11, color: '#94a3b8' }}>{bank.location}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{formatCompact(bank.dailyTrafficSamples)}</div>
                        <div style={{ fontSize: 10.5, color: '#94a3b8' }}>samples/day</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Region footer */}
                <div style={{
                  padding: '10px 18px', borderTop: '1px solid #f1f5f9',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontSize: 11.5, color: '#64748b' }}>Regional daily total</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: rc }}>{formatCompact(regionSamples)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══ NAVIGATION CARDS ══ */}
      <div style={{ padding: '40px 40px 0' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Explore</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>What's inside the demo.</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
          {ROUTES_META.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div style={{
                background: route.gradient,
                border: `1.5px solid ${route.border}`,
                borderRadius: 18, padding: '22px 22px',
                height: '100%', cursor: 'pointer',
                transition: 'all 0.22s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 8px 30px ${route.color}30`;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 14 }}>{route.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: route.color, marginBottom: 8 }}>{route.label}</div>
                <p style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.6, marginBottom: 16 }}>{route.desc}</p>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: route.color }}>{route.cta}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ══ F1 PROGRESS STRIP ══ */}
      <div style={{ padding: '40px 40px 0' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#C26C2C', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Model Progression</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>Global F1 improves with every round.</h2>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 6 }}>From 58.2% at initialization to 83.8% after 12 federated rounds — purely through shared protected updates.</p>
        </div>

        <div style={{
          background: '#fff', border: '1px solid var(--border-subtle)',
          borderRadius: 18, padding: '20px 24px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80 }}>
            {allRounds.map((r, i) => {
              const f1 = r.globalMacroF1;
              const minF1 = 0.55; const maxF1 = 0.85;
              const heightPct = ((f1 - minF1) / (maxF1 - minF1)) * 100;
              const isLast = i === allRounds.length - 1;
              const PHASE_COLOR_MAP = { init: '#64748b', local: '#2563EB', protected: '#0EA5A0', regional: '#8B5CF6', global: '#DB2777' };
              const col = PHASE_COLOR_MAP[r.phase] || '#0EA5A0';
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: isLast ? '#0EA5A0' : 'transparent' }}>
                    {isLast ? formatPercent(f1) : ''}
                  </div>
                  <div
                    title={`Round ${i + 1} (${r.phaseLabel}): ${formatPercent(f1)}`}
                    style={{
                      width: '100%', borderRadius: '4px 4px 0 0',
                      height: `${Math.max(8, heightPct)}%`,
                      background: isLast ? 'linear-gradient(180deg,#0EA5A0,#2563EB)' : col,
                      opacity: isLast ? 1 : 0.55 + (i / allRounds.length) * 0.45,
                      transition: 'height 0.3s ease',
                    }}
                  />
                  <div style={{ fontSize: 8.5, color: '#94a3b8', fontWeight: 600 }}>{String(i + 1).padStart(2, '0')}</div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTop: '1px solid #f1f5f9' }}>
            <div>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>Start (Round 1): </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>{formatPercent(allRounds[0].globalMacroF1)}</span>
            </div>
            <div>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>After 12 Rounds: </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#0EA5A0' }}>{formatPercent(finalRound.globalMacroF1)}</span>
            </div>
            <div>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>Improvement: </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#059669' }}>+{formatPercent(finalRound.globalMacroF1 - allRounds[0].globalMacroF1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ CLOSING TAGLINE ══ */}
      <div style={{ padding: '40px 40px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg,#060d1e,#0d1f3c)',
          borderRadius: 24, padding: '36px 40px',
          position: 'relative', overflow: 'hidden',
          textAlign: 'center',
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 600, height: 300, borderRadius: '50%',
            background: 'radial-gradient(circle,rgba(14,165,160,0.18) 0%,transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: '#0EA5A0', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>Consilience</div>
            <div style={{
              fontSize: 'clamp(20px,3vw,40px)', fontWeight: 900, color: '#f1f5f9',
              letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 20, fontStyle: 'italic',
            }}>
              "We federate the model, not the data."
            </div>
            <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.65, maxWidth: 500, margin: '0 auto 28px' }}>
              Banks benefit from consortium intelligence without exposing a single byte of their raw network traffic to any other institution.
            </p>
            <Link to="/federation" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 28px', borderRadius: 99,
              background: 'linear-gradient(135deg,#0EA5A0,#2563EB)',
              color: '#fff', fontWeight: 700, fontSize: 14,
              textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(14,165,160,0.4)',
            }}>
              Start the demo →
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
