import { useState } from 'react';
import PerClassF1Chart from '../components/charts/PerClassF1Chart.jsx';
import PrecisionRecallChart from '../components/charts/PrecisionRecallChart.jsx';
import BankComparisonChart from '../components/charts/BankComparisonChart.jsx';
import UtilityPrivacyChart from '../components/charts/UtilityPrivacyChart.jsx';
import demoData from '../data/demo-data.js';
import { formatCompact, formatPercent } from '../utils/formatters.js';
import { CLASS_LABELS, classColor, SEVERITY_COLORS } from '../data/labels.js';

const SEVERITY_RANK = { Info: 0, Low: 1, Medium: 2, High: 3, Critical: 4 };
const SEVERITY_BG = {
  Info: 'rgba(14,165,160,0.1)',
  Low: 'rgba(36,138,61,0.1)',
  Medium: 'rgba(167,101,0,0.1)',
  High: 'rgba(194,108,44,0.1)',
  Critical: 'rgba(215,0,21,0.1)',
};

const PerformancePage = () => {
  const metrics = demoData.metrics;
  const overall = metrics.overall;
  const perClass = metrics.perClass;
  const banks = demoData.bankComparison.banks;
  const curve = demoData.bankComparison.privacyUtilityCurve;
  const attackClasses = demoData.attackClasses.attackClasses;
  const [selectedClass, setSelectedClass] = useState(null);
  const [confusionHover, setConfusionHover] = useState(null);

  const confusionMatrix = metrics.confusionMatrix;
  const classIds = confusionMatrix?.rows || [];

  const maxConfusion = confusionMatrix
    ? Math.max(...confusionMatrix.values.flat().map(Number))
    : 1;

  const selectedCls = selectedClass
    ? attackClasses.find((c) => c.classId === selectedClass || c.id === selectedClass)
    : null;
  const selectedMetrics = selectedClass
    ? perClass.find((r) => r.classId === selectedClass)
    : null;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: 60 }}>

      {/* ── HERO ── */}
      <div style={{
        background: 'linear-gradient(135deg,#0f172a 0%,#1a1f36 60%,#0a1628 100%)',
        padding: '40px 40px 32px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        <div style={{
          position: 'absolute', top: -100, left: -100, width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(139,92,246,0.15) 0%,transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{
              fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#8B5CF6', padding: '3px 10px', borderRadius: 99,
              border: '1px solid rgba(139,92,246,0.4)', background: 'rgba(139,92,246,0.1)',
            }}>Detection Performance</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
              CICIDS2017 · Balanced ε Scenario
            </span>
          </div>
          <h1 style={{ color: '#f1f5f9', fontSize: 'clamp(20px,2.8vw,34px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 10, letterSpacing: '-0.03em', maxWidth: 760 }}>
            Quality reported <span style={{ color: '#8B5CF6' }}>per class</span> and <span style={{ color: '#0EA5A0' }}>per bank</span> —<br/>not as a misleading single-number hero.
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 13.5, lineHeight: 1.65, maxWidth: 620 }}>
            Benign-heavy data makes raw accuracy misleading. We emphasise macro-F1, precision/recall per attack class, and cross-bank comparison.
          </p>
        </div>
      </div>

      {/* ── GLOBAL KPI SCORECARD ── */}
      <div style={{ padding: '24px 40px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px,1fr))', gap: 14 }}>
          {[
            { label: 'Global Accuracy', value: formatPercent(overall.globalAccuracy), sub: 'Benign-heavy — interpret carefully', color: '#0EA5A0', bg: 'rgba(14,165,160,0.08)', icon: '🎯' },
            { label: 'Global Macro F1', value: formatPercent(overall.globalMacroF1), sub: 'Equal weight across 7 classes', color: '#8B5CF6', bg: 'rgba(139,92,246,0.08)', icon: '📈' },
            { label: 'Macro Precision', value: formatPercent(overall.globalMacroPrecision), sub: 'How often predictions are correct', color: '#2563EB', bg: 'rgba(37,99,235,0.08)', icon: '⊡' },
            { label: 'Macro Recall', value: formatPercent(overall.globalMacroRecall), sub: 'How many attacks are caught', color: '#DB2777', bg: 'rgba(219,39,119,0.08)', icon: '⊞' },
            { label: 'Attack-weighted F1', value: formatPercent(overall.attackWeightedF1), sub: 'Excludes benign — real IDS signal', color: '#C26C2C', bg: 'rgba(194,108,44,0.08)', icon: '⚠' },
          ].map((k) => (
            <div key={k.label} style={{
              background: '#fff', border: '1px solid var(--border-subtle)',
              borderRadius: 16, padding: '18px 20px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              borderTop: `3px solid ${k.color}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{k.label}</span>
                <span style={{ width: 28, height: 28, display: 'grid', placeItems: 'center', borderRadius: 8, background: k.bg, fontSize: 13 }}>{k.icon}</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: k.color, lineHeight: 1, marginBottom: 5 }}>{k.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>{k.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PER-CLASS BREAKDOWN ── */}
      <div style={{ padding: '28px 40px 0' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Per Class</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Class-level Performance Breakdown</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Click a class card to inspect it. Rare classes (Infiltration, Web Attack) are hardest under noise.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {perClass.map((row) => {
            const cls = attackClasses.find((c) => c.id === row.classId);
            const color = classColor(row.classId);
            const sevColor = SEVERITY_COLORS[cls?.severity || 'Info'];
            const isSelected = selectedClass === row.classId;
            const f1Pct = row.f1 * 100;

            return (
              <div
                key={row.classId}
                onClick={() => setSelectedClass(isSelected ? null : row.classId)}
                style={{
                  background: isSelected ? `${color}08` : '#fff',
                  border: `1.5px solid ${isSelected ? color + '55' : 'var(--border-subtle)'}`,
                  borderRadius: 16, padding: '18px 20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? `0 8px 24px -8px ${color}33` : '0 1px 4px rgba(0,0,0,0.04)',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Top color bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: color }} />

                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14, marginTop: 4 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a', marginBottom: 2 }}>
                      {CLASS_LABELS[row.classId] || row.classId}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{formatCompact(row.samples)} samples</div>
                  </div>
                  <span style={{
                    padding: '3px 9px', borderRadius: 99, fontSize: 10.5, fontWeight: 700,
                    color: sevColor, background: SEVERITY_BG[cls?.severity || 'Info'],
                    border: `1px solid ${sevColor}33`,
                  }}>
                    {cls?.severity || 'Info'}
                  </span>
                </div>

                {/* F1 big number */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: color, lineHeight: 1 }}>
                    {formatPercent(row.f1)}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>F1 Score</div>
                </div>

                {/* P / R bars */}
                {[
                  { label: 'Precision', value: row.precision },
                  { label: 'Recall', value: row.recall },
                ].map((m) => (
                  <div key={m.label} style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>{m.label}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#0f172a' }}>{formatPercent(m.value)}</span>
                    </div>
                    <div style={{ height: 5, background: 'var(--bg-elevated)', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{
                        width: `${m.value * 100}%`, height: '100%',
                        background: `linear-gradient(90deg, ${color}, ${color}88)`,
                        borderRadius: 99, transition: 'width 0.5s ease',
                      }} />
                    </div>
                  </div>
                ))}

                {/* Sample share pill */}
                <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 4, background: 'var(--bg-elevated)', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(100, row.samplesPercent || 0)}%`, height: '100%', background: color, borderRadius: 99 }} />
                  </div>
                  <span style={{ fontSize: 10.5, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{row.samplesPercent?.toFixed(1)}% of dataset</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expanded class detail */}
        {selectedCls && selectedMetrics && (
          <div style={{
            marginTop: 16,
            background: `linear-gradient(135deg, ${classColor(selectedCls.id)}08, #fff)`,
            border: `1.5px solid ${classColor(selectedCls.id)}44`,
            borderRadius: 20, padding: '24px 28px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.07)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: classColor(selectedCls.id), textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Class Deep-Dive</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>{CLASS_LABELS[selectedCls.id] || selectedCls.name}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6, lineHeight: 1.6, maxWidth: 600 }}>{selectedCls.description}</p>
              </div>
              <button onClick={() => setSelectedClass(null)} style={{
                width: 32, height: 32, borderRadius: 99, border: '1px solid var(--border-subtle)',
                background: '#fff', cursor: 'pointer', fontSize: 16, color: 'var(--text-muted)',
              }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 18 }}>
              {[
                { label: 'F1', value: formatPercent(selectedMetrics.f1), color: classColor(selectedCls.id) },
                { label: 'Precision', value: formatPercent(selectedMetrics.precision), color: '#2563EB' },
                { label: 'Recall', value: formatPercent(selectedMetrics.recall), color: '#0EA5A0' },
                { label: 'Samples', value: formatCompact(selectedMetrics.samples), color: '#64748b' },
              ].map((s) => (
                <div key={s.label} style={{ background: '#fff', borderRadius: 12, padding: '12px 16px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Real-world Examples</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {selectedCls.examples?.map((ex) => (
                  <span key={ex} style={{
                    padding: '5px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600,
                    background: `${classColor(selectedCls.id)}12`,
                    color: classColor(selectedCls.id),
                    border: `1px solid ${classColor(selectedCls.id)}33`,
                  }}>{ex}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── CHARTS ROW ── */}
      <div style={{ padding: '28px 40px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 18 }}>
          {/* F1 Chart */}
          <div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#0EA5A0', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Per Class · F1</div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>F1 Score by Attack Class</h2>
            </div>
            <div style={{
              background: '#fff', border: '1px solid var(--border-subtle)',
              borderRadius: 18, padding: 22, boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
            }}>
              <PerClassF1Chart perClass={perClass} height={300} />
            </div>
          </div>

          {/* Precision-Recall */}
          <div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#DB2777', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Precision vs Recall</div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Precision–Recall Scatter</h2>
            </div>
            <div style={{
              background: '#fff', border: '1px solid var(--border-subtle)',
              borderRadius: 18, padding: 22, boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
            }}>
              <PrecisionRecallChart perClass={perClass} height={300} />
            </div>
          </div>
        </div>
      </div>

      {/* ── CONFUSION MATRIX ── */}
      {confusionMatrix && (
        <div style={{ padding: '28px 40px 0' }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#C26C2C', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Confusion Matrix</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Prediction vs Ground Truth</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Brighter cells = more predictions. Diagonal = correct classifications.</p>
          </div>
          <div style={{
            background: '#fff', border: '1px solid var(--border-subtle)',
            borderRadius: 20, padding: '20px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
            overflowX: 'auto',
          }}>
            <div style={{ display: 'inline-block', minWidth: '100%' }}>
              {/* Header row */}
              <div style={{ display: 'flex', marginBottom: 4, paddingLeft: 100 }}>
                {classIds.map((col) => {
                  const SHORT = { BENIGN:'BE', BRUTE_FORCE:'BF', DOS:'DS', WEB_ATTACK:'WA', INFILTRATION:'IF', BOTNET:'BT', DDOS:'DD' };
                  return (
                    <div key={col} style={{
                      width: 52, textAlign: 'center', fontSize: 10, fontWeight: 700,
                      color: classColor(col), letterSpacing: '0.04em',
                    }}>
                      {SHORT[col] || col.slice(0,2)}
                    </div>
                  );
                })}
              </div>
              {confusionMatrix.values.map((rowVals, ri) => {
                const rowId = classIds[ri];
                const SHORT = { BENIGN:'Benign', BRUTE_FORCE:'BruteForce', DOS:'DoS', WEB_ATTACK:'WebAtk', INFILTRATION:'Infiltr.', BOTNET:'Botnet', DDOS:'DDoS' };
                return (
                  <div key={rowId} style={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
                    <div style={{ width: 95, fontSize: 11, fontWeight: 600, color: classColor(rowId), paddingRight: 8, textAlign: 'right', flexShrink: 0 }}>
                      {SHORT[rowId] || rowId}
                    </div>
                    {rowVals.map((val, ci) => {
                      const colId = classIds[ci];
                      const isDiag = ri === ci;
                      const intensity = val / maxConfusion;
                      const baseColor = isDiag ? classColor(rowId) : '#94a3b8';
                      const hovered = confusionHover?.ri === ri && confusionHover?.ci === ci;
                      return (
                        <div
                          key={ci}
                          onMouseEnter={() => setConfusionHover({ ri, ci, val, rowId, colId })}
                          onMouseLeave={() => setConfusionHover(null)}
                          title={`Actual: ${rowId} → Pred: ${colId}: ${val.toLocaleString('en-IN')}`}
                          style={{
                            width: 52, height: 36, display: 'grid', placeItems: 'center',
                            borderRadius: 6, cursor: 'default',
                            background: isDiag
                              ? `${baseColor}${Math.round(intensity * 200 + 30).toString(16).padStart(2,'0')}`
                              : `rgba(148,163,184,${intensity * 0.6 + 0.02})`,
                            fontSize: 9.5, fontWeight: isDiag ? 700 : 500,
                            color: intensity > 0.4 ? '#fff' : (isDiag ? classColor(rowId) : '#64748b'),
                            border: hovered ? `1.5px solid ${isDiag ? classColor(rowId) : '#94a3b8'}` : '1.5px solid transparent',
                            transition: 'all 0.15s',
                          }}
                        >
                          {val >= 1000 ? `${(val/1000).toFixed(0)}k` : val}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {confusionHover && (
              <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 10, background: 'var(--bg-canvas)', fontSize: 12.5 }}>
                <strong>Actual:</strong> {CLASS_LABELS[confusionHover.rowId]} &nbsp;→&nbsp;
                <strong>Predicted:</strong> {CLASS_LABELS[confusionHover.colId]} &nbsp;|&nbsp;
                <strong>{confusionHover.val.toLocaleString('en-IN')}</strong> samples
                {confusionHover.ri === confusionHover.ci && ' ✓ correct'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── BANK COMPARISON ── */}
      <div style={{ padding: '28px 40px 0' }}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Per Bank · Comparison</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Banks Contribute Different Volumes & Quality</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Harborline Financial (largest daily volume) leads local F1. Smaller banks benefit from shared federated knowledge.</p>
        </div>

        {/* Bank stat grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 16 }}>
          {banks.map((b) => {
            const REGION_COLORS_MAP = { north: '#2563EB', west: '#0EA5A0', south: '#8B5CF6' };
            const rc = REGION_COLORS_MAP[b.region] || '#64748b';
            const REGION_NAMES = { north: 'Northern', west: 'Western', south: 'Southern' };
            return (
              <div key={b.bankId} style={{
                background: '#fff', border: '1px solid var(--border-subtle)',
                borderRadius: 14, padding: '14px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                borderLeft: `4px solid ${rc}`,
              }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a', marginBottom: 2 }}>{b.name}</div>
                <div style={{ fontSize: 11, color: rc, fontWeight: 600, marginBottom: 10 }}>
                  {REGION_NAMES[b.region]} · {(b.contributionWeight * 100).toFixed(0)}% weight
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {[
                    { label: 'Accuracy', value: formatPercent(b.localAccuracy) },
                    { label: 'Macro F1', value: formatPercent(b.localMacroF1) },
                    { label: 'Attack F1', value: formatPercent(b.attackF1) },
                    { label: 'Latency', value: `${b.avgLatencyMs}ms` },
                  ].map((s) => (
                    <div key={s.label}>
                      <div style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{
          background: '#fff', border: '1px solid var(--border-subtle)',
          borderRadius: 18, padding: 22, boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        }}>
          <BankComparisonChart banks={banks} height={260} />
        </div>
      </div>

      {/* ── PRIVACY-UTILITY CURVE ── */}
      <div style={{ padding: '28px 40px 0' }}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#DB2777', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Utility–Privacy</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Privacy–Utility Trade-off Across All Scenarios</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Balanced Privacy (ε = 8.04) is the consortium default — strong enough to be meaningful, still preserves rare-class signal.</p>
        </div>

        {/* Scenario cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 16 }}>
          {curve.map((pt) => {
            const isDefault = pt.scenario === 'Balanced Privacy';
            return (
              <div key={pt.scenario} style={{
                background: isDefault ? 'linear-gradient(135deg,rgba(14,165,160,0.12),rgba(37,99,235,0.08))' : '#fff',
                border: `1.5px solid ${isDefault ? 'rgba(14,165,160,0.4)' : 'var(--border-subtle)'}`,
                borderRadius: 14, padding: '14px 16px',
                boxShadow: isDefault ? '0 4px 20px rgba(14,165,160,0.15)' : '0 1px 4px rgba(0,0,0,0.04)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{pt.scenario}</span>
                  {isDefault && <span style={{ fontSize: 10, fontWeight: 800, color: '#0EA5A0', background: 'rgba(14,165,160,0.12)', padding: '2px 7px', borderRadius: 99, border: '1px solid rgba(14,165,160,0.3)' }}>DEFAULT</span>}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>ε (epsilon)</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#DB2777', marginTop: 2 }}>{pt.epsilon}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Macro F1</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#8B5CF6', marginTop: 2 }}>{formatPercent(pt.macroF1)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{
          background: '#fff', border: '1px solid var(--border-subtle)',
          borderRadius: 18, padding: 22, boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        }}>
          <UtilityPrivacyChart curve={curve} height={300} />
        </div>
      </div>

    </div>
  );
};

export default PerformancePage;
