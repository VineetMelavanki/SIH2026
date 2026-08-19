import demoMeta from '../../../demo-data/demo-meta.json';
import banksData from '../../../demo-data/banks.json';
import federationRounds from '../../../demo-data/federation-rounds.json';
import privacyScenarios from '../../../demo-data/privacy-scenarios.json';
import classMetrics from '../../../demo-data/class-metrics.json';
import bankComparison from '../../../demo-data/bank-comparison.json';
import attackClasses from '../../../demo-data/attack-classes.json';

const demoData = Object.freeze({
  dataMode: 'demo',
  meta: demoMeta,
  banks: banksData,
  rounds: federationRounds,
  privacy: privacyScenarios,
  metrics: classMetrics,
  bankComparison,
  attackClasses,
});

export const getBankById = (bankId) =>
  demoData.banks.banks.find((b) => b.id === bankId) || null;

export const getBanksByRegion = (regionId) =>
  demoData.banks.banks.filter((b) => b.region === regionId);

export const getRound = (idx) => demoData.rounds.rounds[idx] || null;

export const getPrivacyScenario = (id) =>
  demoData.privacy.scenarios.find((s) => s.id === id) || null;

export const getDefaultPrivacyScenario = () =>
  getPrivacyScenario(demoData.privacy.defaultScenarioId);

export const getClassById = (classId) =>
  demoData.attackClasses.attackClasses.find((c) => c.id === classId) || null;

export default demoData;
