export const formatPercent = (v, digits = 1) => {
  if (v == null || Number.isNaN(v)) return '—';
  const n = Number(v);
  return `${(n * 100).toFixed(digits)}%`;
};

export const formatRatio = (v, digits = 3) => {
  if (v == null || Number.isNaN(v)) return '—';
  return Number(v).toFixed(digits);
};

export const formatInteger = (n) => {
  if (n == null || Number.isNaN(n)) return '—';
  return new Intl.NumberFormat('en-IN').format(Math.round(Number(n)));
};

export const formatCompact = (n) => {
  if (n == null || Number.isNaN(n)) return '—';
  const num = Number(n);
  if (Math.abs(num) >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
  if (Math.abs(num) >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (Math.abs(num) >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return String(Math.round(num));
};

export const formatLatency = (ms) => {
  if (ms == null) return '—';
  return `${Number(ms).toFixed(0)} ms`;
};

export const formatBandwidth = (mb) => {
  if (mb == null) return '—';
  return `${Number(mb).toFixed(1)} MB`;
};

export const formatDelta = (delta) => {
  if (delta == null) return '—';
  const exp = Number(delta).toExponential(0);
  return exp.replace('e+0', '');
};

export const formatRoundTitle = (round, phaseLabel) =>
  `Round ${String(Number(round) + 1).padStart(2, '0')} · ${phaseLabel}`;
