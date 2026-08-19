export const macroAverage = (items, accessor) => {
  if (!items?.length) return 0;
  const sum = items.reduce((acc, item) => acc + Number(accessor(item) || 0), 0);
  return sum / items.length;
};

export const weightedAverage = (items, valueFn, weightFn) => {
  if (!items?.length) return 0;
  let num = 0;
  let den = 0;
  for (const item of items) {
    const w = Number(weightFn(item) || 0);
    num += Number(valueFn(item) || 0) * w;
    den += w;
  }
  return den === 0 ? 0 : num / den;
};

export const f1 = (precision, recall) => {
  const p = Number(precision || 0);
  const r = Number(recall || 0);
  if (p + r === 0) return 0;
  return (2 * p * r) / (p + r);
};

export const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, Number(v || 0)));

export const normalizeWeights = (weights) => {
  const total = weights.reduce((a, w) => a + Math.max(0, Number(w || 0)), 0);
  if (total === 0) return weights.map(() => 1 / weights.length);
  return weights.map((w) => Math.max(0, Number(w || 0)) / total);
};

export const classIdsFromMetrics = (perClass) => (perClass || []).map((c) => c.classId);
