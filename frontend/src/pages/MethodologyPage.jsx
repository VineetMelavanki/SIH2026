import { useState } from 'react';
import demoData from '../data/demo-data.js';
import { formatCompact, formatPercent } from '../utils/formatters.js';
import { CLASS_LABELS, classColor, SEVERITY_COLORS } from '../data/labels.js';

const SEVERITY_BG = {
  Info: 'rgba(14,165,160,0.1)',
  Low: 'rgba(36,138,61,0.1)',
  Medium: 'rgba(167,101,0,0.1)',
  High: 'rgba(194,108,44,0.1)',
  Critical: 'rgba(215,0,21,0.1)',
};

const FEATURE_ICONS = ['⏱', '📦', '⚡', '📐', '🚩', '🌊', '🪟', '🕰', '🔌'];

const FUTURE_WORK_META = [
  { icon: '🔐', color: '#8B5CF6', desc: 'Verifiable cryptographic guarantees using MPC-style secure aggregation — eliminates trusted aggregator requirement.' },
  { icon: '🛡', color: '#DB2777', desc: 'Byzantine-robust aggregation rules (Krum, coordinate-wise median) to withstand gradient poisoning attacks.' },
  { icon: '📜', color: '#0EA5A0', desc: 'Formal DP proofs via Rényi differential privacy and moments accountant for tighter epsilon bounds.' },
  { icon: '🌐', color: '#2563EB', desc: 'Real-time multi-party deployment with async client participation and heterogeneous infrastructure support.' },
];

const MethodologyPage = () => {
  const attack = demoData.attackClasses;
  const meta = demoData.meta;
  const banks = demoData.banks.banks;
  const classes = attack.attackClasses;
  const scope = meta?.scope;
  const [activeClass, setActiveClass] = useState(null);

  const activeCls = activeClass ? classes.find((c) => c.id === activeClass) : null;
  const activeMetrics = activeClass
    ? demoData.metrics.perClass.find((m) => m.classId === activeClass)
    : null;

  const totalAttackSamples = classes
    .filter((c) => c.id !== 'BENIGN')
    .reduce((s, c) => s + c.samples, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: 60 }}>

      {/* ── HERO ── */}
      <div style={{
        background: 'linear-gradient(135deg,#0f172a 0%,#1a2744 60%,#0a1a2e 100%)',
        padding: '40px 40px 32px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{
          position: 'absolute', bottom: -120, right: -80, width: 500, height: 500,
          borderRadius: '50%', background: 'radial-gradient(circle,rgba(37,99,235,0.18) 0%,transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{
              fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#2563EB', padding: '3px 10px', borderRadius: 99,
              border: '1px solid rgba(37,99,235,0.4)', background: 'rgba(37,99,235,0.1)',
            }}>Methodology & Scope</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
              CICIDS2017 · Network IDS Only
            </span>
          </div>
          <h1 style={{ color: '#f1f5f9', fontSize: 'clamp(20px,2.8vw,34px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 10, letterSpacing: '-0.03em', maxWidth: 800 }}>
            Six banks. Benign + six attack classes.<br />
            <span style={{ color: '#2563EB' }}>Network intrusion detection</span> only.
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 13.5, lineHeight: 1.65, maxWidth: 640 }}>
            Scope is intentionally narrow. We do not claim fraud detection, transaction analytics, or blockchain. Future work is labelled honestly so reviewers can separate shipped from roadmap.
          </p>
        </div>

        {/* Dataset stat row */}
        <div style={{ display: 'flex', gap: 28, marginTop: 28, flexWrap: 'wrap', position: 'relative' }}>
          {[
            { label: 'Labelled Samples', value: '2.47M', sub: 'CICIDS2017' },
            { label: 'Flow Features', value: '78', sub: '9 categories' },
            { label: 'Attack Classes', value: '7', sub: 'Benign + 6' },
            { label: 'Simulated Banks', value: '6', sub: '3 regions' },
          ].map((s) => (
            <div key={s.label} style={{ color: '#f1f5f9' }}>
              <div style={{ fontSize: 28, fontWeight: 900, lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', marginTop: 3 }}>{s.label}</div>
              <div style={{ fontSize: 10.5, color: '#64748b' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ATTACK CLASS EXPLORER ── */}
      <div style={{ padding: '28px 40px 0' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Attack Classes</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Seven-class Label Vocabulary</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Labels follow CICIDS2017 convention. Click any card to explore it. Severity reflects operational bank impact, not dataset imbalance.</p>
        </div>

        {/* Class proportion bar */}
        <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: '16px 20px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Dataset class distribution</div>
          <div style={{ display: 'flex', height: 24, borderRadius: 99, overflow: 'hidden', gap: 1 }}>
            {classes.map((cls) => {
              const pct = (cls.samples / attack.totalSamples) * 100;
              return (
                <div
                  key={cls.id}
                  title={`${CLASS_LABELS[cls.id]}: ${pct.toFixed(1)}%`}
                  onClick={() => setActiveClass(activeClass === cls.id ? null : cls.id)}
                  style={{
                    flex: cls.samples, background: classColor(cls.id),
                    cursor: 'pointer', transition: 'flex 0.4s ease',
                    opacity: activeClass && activeClass !== cls.id ? 0.35 : 1,
                    minWidth: pct < 1 ? 4 : 0,
                  }}
                />
              );
            })}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px', marginTop: 10 }}>
            {classes.map((cls) => {
              const pct = (cls.samples / attack.totalSamples) * 100;
              return (
                <div key={cls.id} style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}
                  onClick={() => setActiveClass(activeClass === cls.id ? null : cls.id)}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: classColor(cls.id), flexShrink: 0 }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: activeClass === cls.id ? classColor(cls.id) : 'var(--text-muted)' }}>
                    {CLASS_LABELS[cls.id]} {pct.toFixed(1)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Class cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
          {classes.map((cls) => {
            const metrics = demoData.metrics.perClass.find((m) => m.classId === cls.id);
            const color = classColor(cls.id);
            const sevColor = SEVERITY_COLORS[cls.severity] || '#64748b';
            const isActive = activeClass === cls.id;
            const pct = (cls.samples / attack.totalSamples * 100).toFixed(1);

            return (
              <div
                key={cls.id}
                onClick={() => setActiveClass(isActive ? null : cls.id)}
                style={{
                  background: isActive ? `${color}08` : '#fff',
                  border: `1.5px solid ${isActive ? color + '55' : 'var(--border-subtle)'}`,
                  borderRadius: 16, padding: '18px 20px', cursor: 'pointer',
                  transition: 'all 0.22s ease',
                  boxShadow: isActive ? `0 8px 28px -8px ${color}33` : '0 1px 4px rgba(0,0,0,0.04)',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: color }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12, marginTop: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 9, display: 'grid', placeItems: 'center',
                      background: `${color}18`, border: `1px solid ${color}33`,
                      fontWeight: 800, fontSize: 10.5, color: color,
                    }}>
                      {cls.id.slice(0, 2)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14.5, color: '#0f172a' }}>{CLASS_LABELS[cls.id] || cls.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>
                        {formatCompact(cls.samples)} samples · {pct}%
                      </div>
                    </div>
                  </div>
                  <span style={{
                    padding: '3px 9px', borderRadius: 99, fontSize: 10.5, fontWeight: 700,
                    color: sevColor, background: SEVERITY_BG[cls.severity || 'Info'],
                    border: `1px solid ${sevColor}33`, flexShrink: 0,
                  }}>
                    {cls.severity}
                  </span>
                </div>

                <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 12 }}>
                  {cls.description}
                </p>

                {/* F1 if we have metrics */}
                {metrics && (
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>F1 (balanced scenario)</span>
                      <span style={{ fontSize: 11, fontWeight: 800, color: color }}>{formatPercent(metrics.f1)}</span>
                    </div>
                    <div style={{ height: 5, background: 'var(--bg-elevated)', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ width: `${metrics.f1 * 100}%`, height: '100%', background: color, borderRadius: 99, transition: 'width 0.5s ease' }} />
                    </div>
                  </div>
                )}

                {/* Examples */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {cls.examples.map((ex) => (
                    <span key={ex} style={{
                      padding: '3px 9px', borderRadius: 99, fontSize: 11,
                      background: `${color}10`, color: color,
                      border: `1px solid ${color}28`, fontWeight: 600,
                    }}>{ex}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active class deep-dive */}
        {activeCls && activeMetrics && (
          <div style={{
            marginTop: 16,
            background: `linear-gradient(135deg, ${classColor(activeCls.id)}08, #fff)`,
            border: `1.5px solid ${classColor(activeCls.id)}44`,
            borderRadius: 20, padding: '24px 28px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.07)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: classColor(activeCls.id), textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Deep Dive</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>{CLASS_LABELS[activeCls.id] || activeCls.name}</h3>
              </div>
              <button onClick={() => setActiveClass(null)} style={{
                width: 32, height: 32, borderRadius: 99, border: '1px solid var(--border-subtle)',
                background: '#fff', cursor: 'pointer', fontSize: 16, color: 'var(--text-muted)',
              }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Performance Metrics</div>
                {[
                  { label: 'F1 Score', value: formatPercent(activeMetrics.f1), color: classColor(activeCls.id), v: activeMetrics.f1 },
                  { label: 'Precision', value: formatPercent(activeMetrics.precision), color: '#2563EB', v: activeMetrics.precision },
                  { label: 'Recall', value: formatPercent(activeMetrics.recall), color: '#0EA5A0', v: activeMetrics.recall },
                ].map((m) => (
                  <div key={m.label} style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{m.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: m.color }}>{m.value}</span>
                    </div>
                    <div style={{ height: 8, background: 'var(--bg-elevated)', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ width: `${m.v * 100}%`, height: '100%', background: m.color, borderRadius: 99, transition: 'width 0.5s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Dataset Presence</div>
                <div style={{ fontSize: 36, fontWeight: 900, color: classColor(activeCls.id), lineHeight: 1 }}>{formatCompact(activeCls.samples)}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>samples in CICIDS2017</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                  {(activeCls.samples / attack.totalSamples * 100).toFixed(2)}% of total dataset
                </div>
                <div style={{ marginTop: 12, height: 8, background: 'var(--bg-elevated)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ width: `${activeCls.samples / attack.totalSamples * 100}%`, height: '100%', background: classColor(activeCls.id), borderRadius: 99 }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── FEATURE ENGINEERING ── */}
      <div style={{ padding: '28px 40px 0' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0EA5A0', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Feature Engineering</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>78 Flow-level Features Across 9 Families</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>No packet payload inspection. All features derived from headers, timing, sizes, and flags — works with encrypted traffic.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
          {attack.featureCategories.map((cat, i) => (
            <div key={cat} style={{
              background: '#fff', border: '1px solid var(--border-subtle)',
              borderRadius: 14, padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 12,
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, display: 'grid', placeItems: 'center',
                background: 'linear-gradient(135deg, rgba(14,165,160,0.12), rgba(37,99,235,0.08))',
                fontSize: 18, flexShrink: 0,
              }}>
                {FEATURE_ICONS[i] || '📊'}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#0EA5A0', marginBottom: 2 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', lineHeight: 1.3 }}>{cat}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SCOPE MATRIX ── */}
      <div style={{ padding: '28px 40px 0' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#C26C2C', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Scope</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>What We Ship vs. What We Don't</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Explicit scope prevents over-claiming. Reviewers can separate shipped from roadmap.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
          {/* In scope */}
          <div style={{
            background: '#fff', border: '1px solid rgba(5,150,105,0.2)',
            borderRadius: 18, overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(5,150,105,0.07)',
          }}>
            <div style={{ background: 'linear-gradient(135deg,rgba(5,150,105,0.1),rgba(14,165,160,0.06))', padding: '16px 20px', borderBottom: '1px solid rgba(5,150,105,0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#059669' }}>✓ In Scope</div>
                <span style={{ padding: '3px 10px', borderRadius: 99, fontSize: 10.5, fontWeight: 800, background: 'rgba(5,150,105,0.12)', color: '#059669', border: '1px solid rgba(5,150,105,0.25)' }}>Shipped</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginTop: 4 }}>What we ship and will defend</div>
            </div>
            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '🏦', text: scope?.privacyBoundary || 'Local data stays inside each bank. Only protected model updates leave.' },
                { icon: '🔗', text: scope?.aggregation || 'Fixed regional → global trusted aggregation.' },
                { icon: '📊', text: `${banks.length} simulated banks across ${demoData.banks.regions.length} regions.` },
                { icon: '🎲', text: 'Differential privacy via gradient clipping + Gaussian noise.' },
                { icon: '🏷', text: `${classes.length}-class detection on CICIDS2017 labels.` },
                { icon: '▶', text: 'Round playback for live presentation (no live ML inference).' },
              ].map((item) => (
                <div key={item.text} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, display: 'grid', placeItems: 'center', background: 'rgba(5,150,105,0.1)', fontSize: 14, flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, paddingTop: 4 }}>{item.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Out of scope */}
          <div style={{
            background: '#fff', border: '1px solid rgba(220,38,38,0.2)',
            borderRadius: 18, overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(220,38,38,0.06)',
          }}>
            <div style={{ background: 'linear-gradient(135deg,rgba(220,38,38,0.08),rgba(245,158,11,0.05))', padding: '16px 20px', borderBottom: '1px dashed rgba(220,38,38,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#DC2626' }}>✗ Out of Scope</div>
                <span style={{ padding: '3px 10px', borderRadius: 99, fontSize: 10.5, fontWeight: 800, background: 'rgba(220,38,38,0.1)', color: '#DC2626', border: '1px solid rgba(220,38,38,0.25)' }}>Not Claimed</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginTop: 4 }}>What we don't claim — please don't ask</div>
            </div>
            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '💳', text: 'Fraud detection, mule-account analytics, transaction scoring.' },
                { icon: '₿', text: 'Blockchain, crypto-assets, or anti-money-laundering use cases.' },
                { icon: '🚫', text: 'Live model training endpoint or database of any kind.' },
                { icon: '🔑', text: 'Authentication, user accounts, or role-based access control.' },
                { icon: '🧮', text: 'Cryptographic secure aggregation (roadmap, not shipped).' },
                { icon: '☠', text: 'Poisoning / backdoor robustness mechanisms (roadmap).' },
              ].map((item) => (
                <div key={item.text} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, display: 'grid', placeItems: 'center', background: 'rgba(220,38,38,0.08)', fontSize: 14, flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, paddingTop: 4 }}>{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── ROADMAP ── */}
      <div style={{ padding: '28px 40px 0' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Roadmap</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Future Work — Labelled Honestly</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Items we deliberately label as future work rather than over-claim.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
          {(scope?.futureWork || []).map((fw, i) => {
            const meta = FUTURE_WORK_META[i] || { icon: '🔬', color: '#64748b', desc: '' };
            return (
              <div key={fw} style={{
                background: '#fff', border: '1px solid var(--border-subtle)',
                borderRadius: 16, padding: '18px 20px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                borderLeft: `4px solid ${meta.color}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, display: 'grid', placeItems: 'center',
                    background: `${meta.color}15`, fontSize: 18,
                  }}>
                    {meta.icon}
                  </div>
                  <div style={{
                    fontSize: 10.5, fontWeight: 800, color: meta.color,
                    textTransform: 'uppercase', letterSpacing: '0.07em',
                  }}>
                    F{String(i + 1).padStart(2, '0')}
                  </div>
                </div>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: '#0f172a', marginBottom: 8, lineHeight: 1.3 }}>{fw}</div>
                <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{meta.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CLOSING STATEMENT ── */}
      <div style={{ padding: '28px 40px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg,#0f172a,#1a2744)',
          borderRadius: 24, padding: '32px 36px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -60, right: -60, width: 300, height: 300,
            borderRadius: '50%', background: 'radial-gradient(circle,rgba(14,165,160,0.25) 0%,transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 800, color: '#0EA5A0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
                Consilience · Closing Statement
              </div>
              <h2 style={{ fontSize: 'clamp(18px,2vw,26px)', fontWeight: 800, color: '#f1f5f9', lineHeight: 1.3, marginBottom: 12, letterSpacing: '-0.02em' }}>
                Consilience helps banks learn from wider cyberattack patterns without pooling raw network traffic.
              </h2>
              <p style={{ fontSize: 13.5, color: '#94a3b8', lineHeight: 1.65, maxWidth: 560 }}>
                We federate the model, not the data. Judge us on workflow clarity, honest scope claims, and the transparent treatment of privacy-utility trade-offs — not on a single hero metric.
              </p>
            </div>

            <div style={{
              background: 'rgba(14,165,160,0.08)',
              border: '1px solid rgba(14,165,160,0.3)',
              borderLeft: '4px solid #0EA5A0',
              borderRadius: 16, padding: '20px 24px',
              minWidth: 240, flexShrink: 0,
            }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: '#0EA5A0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Core Tagline</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#f1f5f9', fontStyle: 'italic', lineHeight: 1.4, marginBottom: 10 }}>
                "We federate the model, not the data."
              </div>
              <div style={{ fontSize: 11.5, color: '#64748b', lineHeight: 1.5 }}>
                Use this on every slide, every chart footnote, and at the start of both presenter scripts.
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MethodologyPage;
