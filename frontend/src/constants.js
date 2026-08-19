export const PROJECT_NAME = 'Consilience';
export const TAGLINE = 'We federate the model, not the data.';
export const TRACK = 'Finance & AI';
export const DATASET = 'CICIDS2017';

export const DATA_MODE_LABEL =
  'Demo data — six simulated banks; values illustrate the federated-learning workflow and are not live bank results.';

export const ROUTES = [
  {
    path: '/',
    label: 'Home',
    icon: 'home',
    description: 'Value proposition, consortium overview, entry to federation flow.',
  },
  {
    path: '/federation',
    label: 'Federation',
    icon: 'network',
    description: 'Round playback, topology, bank cards, protected updates.',
  },
  {
    path: '/privacy',
    label: 'Privacy & Trust',
    icon: 'shield',
    description: 'Clipping, noise, cumulative epsilon, trusted aggregator.',
  },
  {
    path: '/performance',
    label: 'Detection Performance',
    icon: 'chart',
    description: 'Per-class metrics, bank comparison, privacy-utility curve.',
  },
  {
    path: '/methodology',
    label: 'Methodology & Scope',
    icon: 'book',
    description: 'Attack-class definitions, dataset, scope, future work.',
  },
];

export const REGION_COLORS = {
  north: '#2563EB',
  west: '#0EA5A0',
  south: '#8B5CF6',
};

export const REGION_ORDER = ['north', 'west', 'south'];

export const CLASS_ORDER = [
  'BENIGN',
  'BRUTE_FORCE',
  'DOS',
  'WEB_ATTACK',
  'INFILTRATION',
  'BOTNET',
  'DDOS',
];

export const CLASS_COLORS = {
  BENIGN: '#5B9B64',
  BRUTE_FORCE: '#E3B23C',
  DOS: '#C26C2C',
  WEB_ATTACK: '#B34A4A',
  INFILTRATION: '#8B2C6E',
  BOTNET: '#6B4A8B',
  DDOS: '#4A3F8B',
};

export const PHASE_ORDER = ['init', 'local', 'protected', 'regional', 'global'];

export const PHASE_COLORS = {
  init: '#64748B',
  local: '#2563EB',
  protected: '#0EA5A0',
  regional: '#8B5CF6',
  global: '#DB2777',
};

export const PRIVACY_SCENARIO_ORDER = [
  'scenario_low',
  'scenario_balanced',
  'scenario_high',
  'scenario_strict',
];

export const API_BASE_URL =
  (typeof window !== 'undefined' && window.ENV?.VITE_API_URL) ||
  import.meta.env?.VITE_API_URL ||
  'http://localhost:4010/api/demo';

export const DEMO_MODE = true;
