import EpsilonTimeline from '../components/charts/EpsilonTimeline.jsx';
import UtilityPrivacyChart from '../components/charts/UtilityPrivacyChart.jsx';
import PerClassF1Chart from '../components/charts/PerClassF1Chart.jsx';
import usePrivacyScenario from '../hooks/use-privacy-scenario.js';
import demoData from '../data/demo-data.js';
import { formatPercent, formatRatio, formatDelta } from '../utils/formatters.js';
import { computeBudgetStatus, describeScenario } from '../utils/privacy-utils.js';
import { CLASS_LABELS, classColor } from '../data/labels.js';

const BUDGET = 10;

const SCENARIO_META = {
  scenario_low:      { color: '#059669', icon: '⚡', accentBg: 'rgba(5,150,105,0.08)',  border: 'rgba(5,150,105,0.25)',  recommendation: 'Internal pilot only' },
  scenario_balanced: { color: '#0EA5A0', icon: '⚖', accentBg: 'rgba(14,165,160,0.08)', border: 'rgba(14,165,160,0.35)', recommendation: 'Consortium default ✓' },
  scenario_high:     { color: '#F59E0B', icon: '🛡', accentBg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', recommendation: 'Regulatory environment' },
  scenario_strict:   { color: '#DC2626', icon: '🔒', accentBg: 'rgba(220,38,38,0.08)',  border: 'rgba(220,38,38,0.25)', recommendation: 'Maximum guarantee' },
};

const MECHANISM_META = [
  {
    key: 'clipping',
    icon: '✂',
    color: '#0EA5A0',
    title: 'Gradient Clipping',
    badge: (s) => `C = ${s?.clipNorm ?? 1.0}`,
    detail: 'Bounds the L2 norm of each per-sample gradient, preventing any single traffic record from dominating the update.',
    formula: '‖g‖₂ ← min(‖g‖₂, C)',
  },
  {
    key: 'noise',
    icon: '🌊',
    color: '#8B5CF6',
    title: 'Gaussian Noise',
    badge: (s) => `σ = ${s?.noiseMultiplier ?? 1.0}`,
    detail: 'Zero-mean Gaussian noise scaled to the clip norm is added to the clipped gradient before it leaves the bank.',
    formula: 'g̃ ← g + 𝒩(0, σ²C²𝐈)',
  },
  {
    key: 'aggregation',
    icon: '↻',
    color: '#2563EB',
    title: 'Trusted Aggregator',
    badge: () => 'SecAgg = future work',
    detail: 'A neutral trusted party performs regional then global weighted averaging. Cryptographic secure aggregation is roadmap.',
    formula: 'w_global ← Σ nᵢ·wᵢ / Σ nᵢ',
  },
];

const PrivacyPage = () => {
  const { scenarios, mechanisms, scenario, scenarioId, select, epsilonTimeline } = usePrivacyScenario();
  const budget = computeBudgetStatus(scenario?.epsilonCumulative || 0, BUDGET);
  const curve = demoData.bankComparison.privacyUtilityCurve;
  const meta = SCENARIO_META[scenarioId] || SCENARIO_META.scenario_balanced;

  const budgetPct = Math.min(1, (scenario?.epsilonCumulative || 0) / BUDGET);
  const budgetColor = budget.status === 'healthy' ? '#059669' : budget.status === 'warning' ? '#F59E0B' : '#DC2626';

  const perClassData = Object.entries(scenario?.classF1 || {}).map(([classId, f1]) => ({
    classId,
    label: CLASS_LABELS[classId] || classId,
    f1,
    precision: Math.max(0.4, f1 * 1.02),
    recall: Math.max(0.4, f1 * 0.98),
  }));

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: 60 }}>

      {/* ── HERO ── */}
      <div style={{
        background: 'linear-gradient(135deg,#0f172a 0%,#1a0f3c 60%,#0a0f28 100%)',
        padding: '40px 40px 32px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'radial-gradient(circle,#fff 1px,transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
        <div style={{
          position: 'absolute', top: -100, right: -100, width: 600, height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(139,92,246,0.2) 0%,transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <span style={{
                fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: '#8B5CF6', padding: '3px 10px', borderRadius: 99,
                border: '1px solid rgba(139,92,246,0.4)', background: 'rgba(139,92,246,0.1)',
              }}>Privacy & Trust</span>
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: '#475569',
              }}>Differential Privacy · Illustrated</span>
            </div>
            <h1 style={{ color: '#f1f5f9', fontSize: 'clamp(20px,2.8vw,32px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 10, letterSpacing: '-0.03em', maxWidth: 700 }}>
              Clipping, noise, and cumulative epsilon<br />
              <span style={{ color: '#8B5CF6' }}>bound the influence</span> of any single traffic record.
            </h1>
            <p style={{ color: '#94a3b8', fontSize: 13.5, lineHeight: 1.65, maxWidth: 580 }}>
              Consilience uses a trusted aggregator today. Cryptographic secure aggregation and poisoning robustness are explicit future work. Select a scenario to compare privacy-utility trade-offs.
            </p>
          </div>

          {/* Scenario selector */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Privacy Scenario</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {scenarios.map((s) => {
                const sm = SCENARIO_META[s.id] || {};
                const isSelected = scenarioId === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => select(s.id)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      gap: 14, padding: '10px 14px', borderRadius: 12,
                      background: isSelected ? `${sm.color}18` : 'rgba(255,255,255,0.05)',
                      border: `1.5px solid ${isSelected ? sm.color : 'rgba(255,255,255,0.1)'}`,
                      cursor: 'pointer', width: '100%', minWidth: 240,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 16 }}>{sm.icon}</span>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: isSelected ? sm.color : '#94a3b8' }}>{s.name}</div>
                        <div style={{ fontSize: 10.5, color: '#64748b' }}>ε = {s.epsilonCumulative} · F1 {formatPercent(s.globalMacroF1, 0)}</div>
                      </div>
                    </div>
                    {isSelected && (
                      <span style={{
                        fontSize: 10, fontWeight: 800, color: sm.color,
                        background: `${sm.color}20`, padding: '2px 8px', borderRadius: 99,
                        border: `1px solid ${sm.color}40`,
                      }}>ACTIVE</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── ACTIVE SCENARIO SUMMARY ── */}
      <div style={{ padding: '24px 40px 0' }}>
        <div style={{
          background: `linear-gradient(135deg, ${meta.accentBg}, #fff)`,
          border: `1.5px solid ${meta.border}`,
          borderRadius: 20, padding: '24px 28px',
          boxShadow: `0 4px 24px ${meta.color}15`,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: meta.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                {meta.icon} Active Scenario
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{scenario?.name}</h2>
              <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.55 }}>{scenario?.description}</p>
            </div>
            <div style={{
              padding: '14px 20px', borderRadius: 16,
              background: '#fff', border: '1px solid var(--border-subtle)',
              textAlign: 'center', minWidth: 120,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Budget Status</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: budgetColor }}>{scenario?.epsilonCumulative}</div>
              <div style={{ fontSize: 10.5, color: '#94a3b8', marginBottom: 8 }}>ε of {BUDGET} budget</div>
              <div style={{ height: 6, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ width: `${budgetPct * 100}%`, height: '100%', background: budgetColor, borderRadius: 99, transition: 'width 0.5s ease' }} />
              </div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: budgetColor, marginTop: 6 }}>{budget.label}</div>
            </div>
          </div>

          {/* 4 KPI cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
            {[
              { label: 'Clip Norm C', value: scenario?.clipNorm, unit: '', icon: '✂', color: '#0EA5A0', hint: 'L2 bound on per-sample gradient' },
              { label: 'Noise Multiplier σ', value: scenario?.noiseMultiplier, unit: '', icon: '🌊', color: '#8B5CF6', hint: 'σ · noiseStdBase added to update' },
              { label: 'ε per Round', value: scenario?.epsilonPerRound, unit: '', icon: '⚡', color: meta.color, hint: 'Privacy cost per federation round' },
              { label: 'Global Macro F1', value: formatPercent(scenario?.globalMacroF1), unit: '', icon: '🎯', color: '#2563EB', hint: describeScenario(scenario?.clipNorm, scenario?.noiseMultiplier) },
            ].map((k) => (
              <div key={k.label} style={{
                background: '#fff', border: '1px solid var(--border-subtle)',
                borderRadius: 14, padding: '14px 16px',
                borderTop: `3px solid ${k.color}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <span style={{ fontSize: 14 }}>{k.icon}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{k.label}</span>
                </div>
                <div style={{ fontSize: 24, fontWeight: 900, color: k.color, lineHeight: 1, marginBottom: 4 }}>
                  {typeof k.value === 'number' ? formatRatio(k.value, 2) : k.value}
                </div>
                <div style={{ fontSize: 10.5, color: '#94a3b8', lineHeight: 1.4 }}>{k.hint}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── DP MECHANISM CARDS ── */}
      <div style={{ padding: '28px 40px 0' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#0EA5A0', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Mechanisms</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>How Differential Privacy Is Applied</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Three layers stack together to provide the formal privacy guarantee at each federation round.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {MECHANISM_META.map((m) => {
            const mData = mechanisms[m.key];
            return (
              <div key={m.key} style={{
                background: '#fff', border: '1px solid var(--border-subtle)',
                borderRadius: 18, padding: '22px 22px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                borderTop: `3px solid ${m.color}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 11, display: 'grid', placeItems: 'center',
                      background: `${m.color}15`, border: `1px solid ${m.color}30`, fontSize: 18,
                    }}>{m.icon}</div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{m.title}</h3>
                  </div>
                  <span style={{
                    padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700,
                    color: m.color, background: `${m.color}12`, border: `1px solid ${m.color}30`,
                    whiteSpace: 'nowrap',
                  }}>
                    {m.badge(scenario)}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, marginBottom: 14 }}>{m.detail}</p>
                <div style={{
                  padding: '8px 12px', borderRadius: 9,
                  background: `${m.color}08`, border: `1px solid ${m.color}18`,
                  fontSize: 13, fontWeight: 700, color: m.color,
                  fontFamily: 'monospace', letterSpacing: '0.02em',
                }}>
                  {m.formula}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── EPSILON TIMELINE ── */}
      <div style={{ padding: '28px 40px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Budget Tracking</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Cumulative ε Across 12 Rounds</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
              Each round consumes a slice of the privacy budget. The amber threshold marks the consortium policy limit (ε = {BUDGET}).
            </p>
          </div>
          <span style={{
            padding: '6px 14px', borderRadius: 99, fontSize: 12, fontWeight: 700,
            background: `${budgetColor}12`, color: budgetColor, border: `1px solid ${budgetColor}30`,
            alignSelf: 'flex-start',
          }}>
            {budget.label} · {(budgetPct * 100).toFixed(0)}% of budget
          </span>
        </div>

        {/* Per-round epsilon cards */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
          {epsilonTimeline.map((pt, i) => {
            const pct = pt.epsilon / BUDGET;
            const col = pct < 0.5 ? '#059669' : pct < 1.0 ? '#F59E0B' : '#DC2626';
            return (
              <div key={i} title={`Round ${i + 1}: ε = ${pt.epsilon}`} style={{
                flex: '0 0 auto', width: 48, padding: '6px 4px',
                borderRadius: 10, textAlign: 'center',
                background: '#fff', border: `1.5px solid ${col}30`,
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}>
                <div style={{ fontSize: 9.5, fontWeight: 700, color: '#94a3b8', marginBottom: 3 }}>R{i + 1}</div>
                <div style={{ fontSize: 11.5, fontWeight: 800, color: col }}>{pt.epsilon.toFixed(2)}</div>
              </div>
            );
          })}
        </div>

        <div style={{
          background: '#fff', border: '1px solid var(--border-subtle)',
          borderRadius: 18, padding: '20px 22px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        }}>
          <EpsilonTimeline timeline={epsilonTimeline} budget={BUDGET} />
        </div>
      </div>

      {/* ── SIDE BY SIDE CHARTS ── */}
      <div style={{ padding: '28px 40px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          {/* Privacy–Utility curve */}
          <div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#DB2777', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Privacy–Utility</div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Utility Falls as Privacy Strengthens</h2>
              <p style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 4 }}>Rare classes (Infiltration, Web Attack) degrade fastest under noise.</p>
            </div>
            <div style={{
              background: '#fff', border: '1px solid var(--border-subtle)',
              borderRadius: 18, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
            }}>
              <UtilityPrivacyChart curve={curve} />
            </div>

            {/* Scenario toggle pills below chart */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginTop: 12 }}>
              {scenarios.map((s) => {
                const sm = SCENARIO_META[s.id] || {};
                const isActive = scenarioId === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => select(s.id)}
                    style={{
                      padding: '10px 12px', borderRadius: 12,
                      background: isActive ? `${sm.color}12` : '#fff',
                      color: '#0f172a',
                      border: `1.5px solid ${isActive ? sm.color : 'var(--border-subtle)'}`,
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 700, color: isActive ? sm.color : '#0f172a' }}>{s.name}</div>
                    <div style={{ fontSize: 10.5, color: '#94a3b8', marginTop: 2 }}>
                      ε = {s.epsilonCumulative} · F1 {formatPercent(s.globalMacroF1, 0)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Per-class F1 chart */}
          <div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#0EA5A0', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>
                Per Class · {scenario?.name}
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Per-class F1 Under This Scenario</h2>
              <p style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 4 }}>{scenario?.description}</p>
            </div>
            <div style={{
              background: '#fff', border: '1px solid var(--border-subtle)',
              borderRadius: 18, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
            }}>
              <PerClassF1Chart perClass={perClassData} height={300} />
            </div>

            {/* Per-class bars */}
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 7 }}>
              {perClassData.map((d) => (
                <div key={d.classId} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 78, fontSize: 11, fontWeight: 600, color: classColor(d.classId), flexShrink: 0 }}>
                    {CLASS_LABELS[d.classId] || d.classId}
                  </div>
                  <div style={{ flex: 1, height: 7, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{
                      width: `${d.f1 * 100}%`, height: '100%',
                      background: classColor(d.classId),
                      borderRadius: 99, transition: 'width 0.5s ease',
                    }} />
                  </div>
                  <div style={{ width: 42, fontSize: 11, fontWeight: 800, color: classColor(d.classId), textAlign: 'right', flexShrink: 0 }}>
                    {formatPercent(d.f1)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SCENARIO COMPARISON TABLE ── */}
      <div style={{ padding: '28px 40px 0' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Comparison</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>All Four Scenarios Side by Side</h2>
        </div>
        <div style={{
          background: '#fff', border: '1px solid var(--border-subtle)',
          borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        }}>
          {/* Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr 1.4fr',
            padding: '12px 20px', background: '#f8fafc',
            borderBottom: '1px solid var(--border-subtle)',
            fontSize: 10.5, fontWeight: 700, color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '0.07em',
          }}>
            <div>Scenario</div>
            <div>Clip C</div>
            <div>Noise σ</div>
            <div>ε / round</div>
            <div>ε total</div>
            <div>Macro F1</div>
          </div>
          {scenarios.map((s) => {
            const sm = SCENARIO_META[s.id] || {};
            const isActive = scenarioId === s.id;
            return (
              <div
                key={s.id}
                onClick={() => select(s.id)}
                style={{
                  display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr 1.4fr',
                  padding: '16px 20px', alignItems: 'center',
                  background: isActive ? `${sm.color}07` : 'transparent',
                  borderBottom: '1px solid var(--border-subtle)',
                  cursor: 'pointer', transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => !isActive && (e.currentTarget.style.background = '#f8fafc')}
                onMouseLeave={(e) => !isActive && (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 16 }}>{sm.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13.5, color: isActive ? sm.color : '#0f172a' }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{sm.recommendation}</div>
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{s.clipNorm}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{s.noiseMultiplier}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{s.epsilonPerRound}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: sm.color }}>{s.epsilonCumulative}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1, height: 6, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ width: `${s.globalMacroF1 * 100}%`, height: '100%', background: sm.color, borderRadius: 99 }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 800, color: sm.color, width: 44, textAlign: 'right' }}>
                    {formatPercent(s.globalMacroF1)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── DISCLOSURES ── */}
      <div style={{ padding: '28px 40px 0' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Disclosures</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Limitations We Disclose On-Stage</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
          {[
            {
              icon: '⚠',
              color: '#F59E0B',
              title: 'Trusted Aggregator',
              body: 'This demonstration uses a trusted neutral aggregator. In production, this is a meaningful trust assumption that requires vetting.',
              tag: 'Current limitation',
            },
            {
              icon: '🔮',
              color: '#8B5CF6',
              title: 'Cryptographic SecAgg',
              body: 'Verifiable cryptographic secure aggregation (MPC-style) would remove the trusted aggregator requirement. It is explicitly roadmap.',
              tag: 'Future work',
            },
            {
              icon: '📜',
              color: '#0EA5A0',
              title: 'Budget Semantics',
              body: `ε is the RDP-composed upper bound; δ = ${formatDelta(scenario?.delta)}. The consortium treats ε ≤ ${BUDGET} as an acceptable pilot threshold.`,
              tag: 'Formal definition',
            },
            {
              icon: '🧪',
              color: '#2563EB',
              title: 'Demo-data Disclosure',
              body: 'These epsilon values, F1 scores, and scenario data are demo fixtures that illustrate the workflow. They are not live bank results.',
              tag: 'Demo mode',
            },
          ].map((d) => (
            <div key={d.title} style={{
              background: '#fff', border: '1px solid var(--border-subtle)',
              borderRadius: 16, padding: '18px 20px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              borderLeft: `4px solid ${d.color}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 10, display: 'grid', placeItems: 'center',
                  background: `${d.color}14`, fontSize: 17,
                }}>{d.icon}</div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>{d.title}</div>
                  <span style={{ fontSize: 10.5, color: d.color, fontWeight: 700 }}>{d.tag}</span>
                </div>
              </div>
              <p style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.6 }}>{d.body}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PrivacyPage;
