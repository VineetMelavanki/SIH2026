import safeReadJson from '../utils/read-json.js';

const FILES = [
  'demo-meta.json',
  'banks.json',
  'federation-rounds.json',
  'privacy-scenarios.json',
  'class-metrics.json',
  'bank-comparison.json',
  'attack-classes.json',
];

const getAllDemoData = async () => {
  const entries = await Promise.all(
    FILES.map(async (file) => {
      const data = await safeReadJson(file);
      return [file.replace('.json', ''), data];
    })
  );
  return Object.fromEntries(entries);
};

const getDemoFile = async (name) => {
  const fileName = name.endsWith('.json') ? name : `${name}.json`;
  const allowed = FILES.includes(fileName);
  if (!allowed) {
    return null;
  }
  return safeReadJson(fileName);
};

const getBanks = async () => getDemoFile('banks');
const getFederationRounds = async () => getDemoFile('federation-rounds');
const getPrivacyScenarios = async () => getDemoFile('privacy-scenarios');
const getClassMetrics = async () => getDemoFile('class-metrics');
const getBankComparison = async () => getDemoFile('bank-comparison');
const getAttackClasses = async () => getDemoFile('attack-classes');
const getMeta = async () => getDemoFile('demo-meta');

export default {
  getAllDemoData,
  getDemoFile,
  getBanks,
  getFederationRounds,
  getPrivacyScenarios,
  getClassMetrics,
  getBankComparison,
  getAttackClasses,
  getMeta,
};
