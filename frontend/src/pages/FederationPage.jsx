import { useState } from 'react';
import useFederationRound from '../hooks/use-federation-round.js';
import FederationTopology from '../components/federation/FederationTopology.jsx';
import RoundProgress from '../components/federation/RoundProgress.jsx';
import demoData from '../data/demo-data.js';
import { formatCompact, formatPercent, formatLatency, formatBandwidth } from '../utils/formatters.js';
import { phaseColor } from '../data/labels.js';
import { REGION_COLORS } from '../constants.js';

const PHASE_ICONS = { init: '⚙', local: '🧠', protected: '🔐', regional: '🌐', global: '✅' };
const REGION_META = {
  north: { label: 'Northern', city: 'Delhi Hub', gradient: 'linear-gradient(135deg,#2563EB22,#2563EB08)' },
  west:  { label: 'Western',  city: 'Mumbai Hub', gradient: 'linear-gradient(135deg,#0EA5A022,#0EA5A008)' },
  south: { label: 'Southern', city: 'Bengaluru Hub', gradient: 'linear-gradient(135deg,#8B5CF622,#8B5CF608)' },
};

const FederationPage = () => {
  const playback = useFederationRound({ autoplay: false });
  const { round, index, total, playing, toggle, go, step, back, reset } = playback;
  const banks = demoData.banks.banks;
  const regions = demoData.banks.regions;
  const totalSamples = (round?.bankUpdates || []).reduce((s, u) => s + (u?.samples || 0), 0);
  const participatingCount = (round?.bankUpdates || []).filter((u) => u?.participated).length;
  const phase = round?.phase || 'init';

  const [activeBank, setActiveBank] = useState(null);
  const activeBankData = activeBank
    ? demoData.bankComparison.banks.find((b) => b.bankId === activeBank)
    : null;
  const activeBankMeta = activeBank
    ? banks.find((b) => b.id === activeBank)
    : null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-canvas)', paddingBottom: 60 }}>

      {/* ── HERO STRIP ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f2744 100%)',
        padding: '40px 40px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative grid */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.05,
          backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        {/* Glow */}
        <div style={{
          position: 'absolute', top: -80, right: -60, width: 400, height: 400,
          borderRadius: '50%', background: 'radial-gradient(circle,rgba(14,165,160,0.18) 0%,transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: 900 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{
              fontSize: 10, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#0EA5A0', padding: '3px 10px', borderRadius: 99,
              border: '1px solid rgba(14,165,160,0.4)', background: 'rgba(14,165,160,0.1)',
            }}>Federation Command Center</span>
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: '#94a3b8',
            }}>Round {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          </div>

          <h1 style={{ color: '#f1f5f9', fontSize: 'clamp(22px,3vw,36px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 10, letterSpacing: '-0.03em' }}>
            Raw traffic stays local.<br />
            <span style={{ color: '#0EA5A0' }}>Only protected updates</span> travel.
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.65, maxWidth: 620 }}>
            Local Training → Protected Update → Regional Aggregation → Global Aggregation.
            Watch the phases animate below — no raw data ever crosses the bank boundary.
          </p>
        </div>

        {/* Phase pill row */}
        <div style={{ display: 'flex', gap: 8, marginTop: 24, flexWrap: 'wrap', position: 'relative' }}>
          {['init','local','protected','regional','global'].map((p) => {
            const active = phase === p;
            const col = phaseColor(p);
            return (
              <div key={p} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 99,
                background: active ? `${col}25` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${active ? col : 'rgba(255,255,255,0.1)'}`,
                color: active ? col : '#64748b',
                fontSize: 12, fontWeight: active ? 700 : 500,
                transition: 'all 0.3s ease',
              }}>
                <span>{PHASE_ICONS[p]}</span>
                <span style={{ textTransform: 'capitalize' }}>{p === 'init' ? 'Initialization' : p.charAt(0).toUpperCase() + p.slice(1)}</span>
                {active && <span style={{ width: 6, height: 6, borderRadius: '50%', background: col, animation: 'pulse 1.5s ease-in-out infinite' }} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── PLAYBACK CONTROLS ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border-subtle)', padding: '16px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={reset} title="Reset" style={ctrlBtn('#64748b')}>⟳</button>
            <button onClick={back} disabled={index === 0} title="Previous" style={ctrlBtn('#64748b', index === 0)}>‹</button>
            <button onClick={toggle} style={{
              padding: '9px 22px', borderRadius: 99, border: 'none', cursor: 'pointer',
              background: playing ? 'linear-gradient(135deg,#F59E0B,#FBBF24)' : 'linear-gradient(135deg,#0EA5A0,#2563EB)',
              color: '#fff', fontWeight: 700, fontSize: 13, letterSpacing: 0.02,
              boxShadow: playing ? '0 4px 16px -4px rgba(245,158,11,0.5)' : '0 4px 16px -4px rgba(14,165,160,0.5)',
              transition: 'all 0.25s ease',
            }}>
              {playing ? '⏸ Pause' : '▶ Play Round'}
            </button>
            <button onClick={step} disabled={index >= total - 1} title="Next" style={ctrlBtn('#64748b', index >= total - 1)}>›</button>
          </div>

          {/* Round scrubber */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, maxWidth: 500 }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Round</span>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {Array.from({ length: total }, (_, i) => (
                <button key={i} onClick={() => go(i)} style={{
                  width: 28, height: 28, borderRadius: 6, border: 'none', cursor: 'pointer',
                  background: i === index ? phaseColor(phase) : i < index ? 'rgba(14,165,160,0.15)' : 'var(--bg-elevated)',
                  color: i === index ? '#fff' : i < index ? '#0EA5A0' : 'var(--text-muted)',
                  fontSize: 11, fontWeight: i === index ? 700 : 500,
                  transition: 'all 0.2s ease',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>

          {/* Live phase badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              padding: '5px 14px', borderRadius: 99, fontSize: 12, fontWeight: 700,
              background: `${phaseColor(phase)}18`,
              color: phaseColor(phase),
              border: `1px solid ${phaseColor(phase)}44`,
            }}>
              {PHASE_ICONS[phase]} {round?.phaseLabel || 'Initialization'}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 12, height: 4, background: 'var(--bg-elevated)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 99,
            width: `${((index) / (total - 1)) * 100}%`,
            background: `linear-gradient(90deg, #0EA5A0, ${phaseColor(phase)})`,
            transition: 'width 0.4s ease',
          }} />
        </div>
        {round?.description && (
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>{round.description}</p>
        )}
      </div>

      {/* ── KPI ROW ── */}
      <div style={{ padding: '24px 40px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
          {[
            { label: 'Current Phase', value: round?.phaseLabel || 'Initialization', sub: `Round ${index + 1} of ${total}`, color: phaseColor(phase), icon: PHASE_ICONS[phase] },
            { label: 'Participating Banks', value: `${participatingCount} / ${banks.length}`, sub: 'Sample-weighted contribution', color: '#2563EB', icon: '🏦' },
            { label: 'Aggregated Samples', value: formatCompact(totalSamples), sub: 'Never left bank perimeter', color: '#0EA5A0', icon: '📦' },
            { label: 'Global Macro F1', value: formatPercent(round?.globalMacroF1), sub: 'Balanced privacy scenario', color: '#8B5CF6', icon: '📈' },
          ].map((kpi) => (
            <div key={kpi.label} style={{
              background: '#fff', border: '1px solid var(--border-subtle)',
              borderRadius: 16, padding: '18px 20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{kpi.label}</span>
                <span style={{
                  width: 30, height: 30, borderRadius: 8, display: 'grid', placeItems: 'center',
                  background: `${kpi.color}15`, fontSize: 14,
                }}>{kpi.icon}</span>
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', lineHeight: 1, marginBottom: 4 }}>{kpi.value}</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{kpi.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TOPOLOGY ── */}
      <div style={{ padding: '28px 40px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#0EA5A0', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Topology</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Federation Privacy Boundary</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
              Dashed perimeters = raw-traffic boundary. Only teal packets cross outward.
            </p>
          </div>
          <span style={{
            padding: '6px 14px', borderRadius: 99, fontSize: 12, fontWeight: 700,
            background: phase === 'local' || phase === 'init' ? 'rgba(37,99,235,0.1)' : 'rgba(14,165,160,0.1)',
            color: phase === 'local' || phase === 'init' ? '#2563EB' : '#0EA5A0',
            border: `1px solid ${phase === 'local' || phase === 'init' ? 'rgba(37,99,235,0.25)' : 'rgba(14,165,160,0.25)'}`,
          }}>
            {phase === 'protected' || phase === 'regional' || phase === 'global'
              ? '🔐 Protected updates in motion'
              : '🧠 Local training inside perimeter'}
          </span>
        </div>
        <div style={{
          background: '#fff', border: '1px solid var(--border-subtle)',
          borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}>
          <FederationTopology round={round} />
        </div>
      </div>

      {/* ── BANK GRID ── */}
      <div style={{ padding: '28px 40px 0' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Per Bank · Current Round</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Bank-level Local Results</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Click a bank card to see its full profile. In real deployment, these metrics stay on-prem.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {(round?.bankUpdates || []).map((u) => {
            const bank = banks.find((b) => b.id === u.bankId);
            const compData = demoData.bankComparison.banks.find((b) => b.bankId === u.bankId);
            if (!bank) return null;
            const regionColor = REGION_COLORS[bank.region] || '#64748b';
            const isActive = activeBank === u.bankId;
            const participated = u.participated;

            return (
              <div
                key={u.bankId}
                onClick={() => setActiveBank(isActive ? null : u.bankId)}
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${regionColor}12, ${regionColor}06)`
                    : '#fff',
                  border: `1.5px solid ${isActive ? regionColor + '55' : 'var(--border-subtle)'}`,
                  borderRadius: 16, padding: '18px 20px',
                  cursor: 'pointer',
                  transition: 'all 0.22s ease',
                  boxShadow: isActive
                    ? `0 8px 32px -8px ${regionColor}33`
                    : '0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, display: 'grid', placeItems: 'center',
                      background: `${regionColor}18`, border: `1px solid ${regionColor}33`, fontSize: 16,
                    }}>🏦</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>{bank.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{bank.location}</div>
                    </div>
                  </div>
                  <span style={{
                    padding: '3px 9px', borderRadius: 99, fontSize: 10.5, fontWeight: 700,
                    background: participated ? 'rgba(5,150,105,0.1)' : 'rgba(100,116,139,0.1)',
                    color: participated ? '#059669' : '#64748b',
                    border: `1px solid ${participated ? 'rgba(5,150,105,0.25)' : 'rgba(100,116,139,0.2)'}`,
                  }}>
                    {participated ? '● Active' : '○ Idle'}
                  </span>
                </div>

                {/* Region tag */}
                <div style={{ marginBottom: 14 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: regionColor,
                    background: `${regionColor}12`, padding: '3px 9px', borderRadius: 99,
                    border: `1px solid ${regionColor}25`,
                  }}>
                    {bank.regionName}
                  </span>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[
                    { label: 'Local F1', value: formatPercent(u.localF1), color: '#0EA5A0' },
                    { label: 'Global F1', value: formatPercent(round?.globalMacroF1), color: '#8B5CF6' },
                    { label: 'Samples', value: formatCompact(u.samples), color: '#2563EB' },
                    { label: 'Latency', value: formatLatency(bank.latencyMs), color: '#64748b' },
                  ].map((s) => (
                    <div key={s.label} style={{
                      background: 'var(--bg-canvas)', borderRadius: 10, padding: '10px 12px',
                    }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{s.label}</div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: s.color }}>{s.value}</div>
                    </div>
                  ))}
                </div>

                {/* Bandwidth bar */}
                {compData && (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 600 }}>Contribution weight</span>
                      <span style={{ fontSize: 10.5, color: regionColor, fontWeight: 700 }}>{(compData.contributionWeight * 100).toFixed(0)}%</span>
                    </div>
                    <div style={{ height: 5, background: 'var(--bg-elevated)', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{
                        width: `${compData.contributionWeight * 100}%`, height: '100%',
                        background: `linear-gradient(90deg, ${regionColor}, ${regionColor}aa)`,
                        borderRadius: 99, transition: 'width 0.6s ease',
                      }} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Expanded bank detail panel */}
        {activeBankData && activeBankMeta && (
          <div style={{
            marginTop: 16,
            background: `linear-gradient(135deg, ${REGION_COLORS[activeBankMeta.region]}12, #fff)`,
            border: `1.5px solid ${REGION_COLORS[activeBankMeta.region]}44`,
            borderRadius: 20, padding: '24px 28px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: REGION_COLORS[activeBankMeta.region], textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Bank Profile</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>{activeBankMeta.name}</h3>
                <p style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 3 }}>{activeBankMeta.location} · {activeBankMeta.regionName}</p>
              </div>
              <button onClick={() => setActiveBank(null)} style={{
                width: 32, height: 32, borderRadius: 99, border: '1px solid var(--border-subtle)',
                background: '#fff', cursor: 'pointer', fontSize: 16, color: 'var(--text-muted)',
              }}>×</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
              {[
                { label: 'Employees', value: activeBankMeta.employees?.toLocaleString('en-IN'), icon: '👥' },
                { label: 'Customers', value: formatCompact(activeBankMeta.customerCount), icon: '🧑‍💼' },
                { label: 'Daily Traffic Samples', value: formatCompact(activeBankMeta.dailyTrafficSamples), icon: '📡' },
                { label: 'Local Epochs', value: activeBankMeta.localEpochs, icon: '🔄' },
                { label: 'Batch Size', value: activeBankMeta.batchSize, icon: '📦' },
                { label: 'Hardware', value: activeBankMeta.hardware, icon: '💻' },
                { label: 'Latency', value: formatLatency(activeBankMeta.latencyMs), icon: '⚡' },
                { label: 'Bandwidth Used', value: formatBandwidth(activeBankData.bandwidthMB), icon: '📶' },
              ].map((item) => (
                <div key={item.label} style={{
                  background: '#fff', borderRadius: 12, padding: '12px 14px',
                  border: '1px solid var(--border-subtle)',
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                    {item.icon} {item.label}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Per-class F1 breakdown */}
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>Per-class F1 (balanced scenario)</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {Object.entries(activeBankData.perClassF1 || {}).map(([cls, f1]) => {
                  const COLOR_MAP = { BENIGN:'#5B9B64', BRUTE_FORCE:'#E3B23C', DOS:'#C26C2C', WEB_ATTACK:'#B34A4A', INFILTRATION:'#8B2C6E', BOTNET:'#6B4A8B', DDOS:'#4A3F8B' };
                  const LABEL_MAP = { BENIGN:'Benign', BRUTE_FORCE:'Brute Force', DOS:'DoS', WEB_ATTACK:'Web Attack', INFILTRATION:'Infiltration', BOTNET:'Botnet', DDOS:'DDoS' };
                  return (
                    <div key={cls} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 80, fontSize: 11.5, color: 'var(--text-secondary)', fontWeight: 600, flexShrink: 0 }}>{LABEL_MAP[cls] || cls}</div>
                      <div style={{ flex: 1, height: 8, background: 'var(--bg-elevated)', borderRadius: 99, overflow: 'hidden' }}>
                        <div style={{
                          width: `${f1 * 100}%`, height: '100%',
                          background: `linear-gradient(90deg, ${COLOR_MAP[cls] || '#0EA5A0'}, ${COLOR_MAP[cls] || '#0EA5A0'}aa)`,
                          borderRadius: 99, transition: 'width 0.6s ease',
                        }} />
                      </div>
                      <div style={{ width: 44, fontSize: 12, fontWeight: 700, color: COLOR_MAP[cls] || '#0EA5A0', textAlign: 'right', flexShrink: 0 }}>
                        {formatPercent(f1)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── ROUND PROGRESS STRIP ── */}
      <div style={{ padding: '28px 40px 0' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Round Log</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Federation Playback</h2>
        </div>
        <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 16, overflow: 'hidden' }}>
          <RoundProgress {...playback} />
        </div>
      </div>

      {/* ── DATA BOUNDARY LEGEND ── */}
      <div style={{ padding: '28px 40px 0' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Legend</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>Data Boundary Zones</h2>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14,
        }}>
          {[
            { title: 'Inside the Bank', desc: 'Raw traffic, local training, model weights. Never leaves the on-prem perimeter.', color: '#2563EB', icon: '🏦', border: 'solid' },
            { title: 'Protected Update', desc: 'Gradient clipped + Gaussian noise applied. Only this tiny packet crosses the boundary.', color: '#0EA5A0', icon: '🔐', border: 'dashed' },
            { title: 'Trusted Aggregator', desc: 'Regional then global weighted averaging. Cryptographic secure aggregation is future work.', color: '#8B5CF6', icon: '🌐', border: 'dotted' },
          ].map((z) => (
            <div key={z.title} style={{
              background: `${z.color}08`,
              border: `1.5px ${z.border} ${z.color}33`,
              borderRadius: 14, padding: '16px 18px',
            }}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>{z.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: z.color, marginBottom: 4 }}>{z.title}</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{z.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.5)} }`}</style>
    </div>
  );
};

const ctrlBtn = (color, disabled = false) => ({
  width: 34, height: 34, borderRadius: 8, border: '1px solid var(--border-subtle)',
  background: '#fff', cursor: disabled ? 'not-allowed' : 'pointer',
  fontSize: 16, color: disabled ? 'var(--text-muted)' : color,
  display: 'grid', placeItems: 'center', opacity: disabled ? 0.4 : 1, transition: 'all 0.15s',
});

export default FederationPage;
