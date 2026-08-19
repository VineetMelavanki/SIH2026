export const computeBudgetStatus = (epsilon, budget = 10) => {
  const ratio = Number(epsilon || 0) / Number(budget || 10);
  if (ratio <= 0.5) return { status: 'healthy', percent: ratio, label: 'Within budget' };
  if (ratio <= 1.0) return { status: 'warning', percent: ratio, label: 'Approaching budget' };
  return { status: 'exceeded', percent: ratio, label: 'Budget exhausted' };
};

export const formatEpsilon = (eps, digits = 2) => {
  if (eps == null || Number.isNaN(eps)) return '—';
  return `ε = ${Number(eps).toFixed(digits)}`;
};

export const describeScenario = (clipNorm, noiseMultiplier) => {
  const _c = Number(clipNorm || 0);
  const n = Number(noiseMultiplier || 0);
  if (n <= 0.6) return 'Utility-first configuration — minimal noise added.';
  if (n <= 1.2) return 'Balanced configuration — typical consortium default.';
  if (n <= 2.0) return 'Privacy-first configuration — stronger DP bound.';
  return 'Strict configuration — demonstrates the utility floor.';
};

export const rdpComposition = (perRound, rounds) => {
  if (!perRound || !rounds) return 0;
  return Number(perRound) * Number(rounds);
};

export const budgetGaugeSteps = [
  { upTo: 2.5, label: 'Very low ε' },
  { upTo: 5, label: 'Low ε' },
  { upTo: 8, label: 'Moderate ε' },
  { upTo: 12, label: 'Elevated ε' },
  { upTo: Infinity, label: 'High ε' },
];
