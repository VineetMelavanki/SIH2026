import {
  CLASS_ORDER,
  CLASS_COLORS,
  PHASE_ORDER,
  PHASE_COLORS,
  REGION_ORDER,
  REGION_COLORS,
} from '../constants.js';

export const CLASS_LABELS = {
  BENIGN: 'Benign',
  BRUTE_FORCE: 'Brute Force',
  DOS: 'DoS',
  WEB_ATTACK: 'Web Attack',
  INFILTRATION: 'Infiltration',
  BOTNET: 'Botnet',
  DDOS: 'DDoS',
};

export const PHASE_LABELS = {
  init: 'Initialization',
  local: 'Local Training',
  protected: 'Protected Update',
  regional: 'Regional Aggregation',
  global: 'Global Aggregation',
};

export const REGION_LABELS = {
  north: 'Northern Region',
  west: 'Western Region',
  south: 'Southern Region',
};

export const SEVERITY_LABELS = {
  Info: 'Info',
  Low: 'Low',
  Medium: 'Medium',
  High: 'High',
  Critical: 'Critical',
};

export const SEVERITY_COLORS = {
  Info: 'var(--accent-teal)',
  Low: 'var(--accent-green)',
  Medium: 'var(--accent-amber)',
  High: 'var(--class-dos)',
  Critical: 'var(--accent-red)',
};

export const classColor = (classId) => CLASS_COLORS[classId] || 'var(--accent-teal)';
export const phaseColor = (phase) => PHASE_COLORS[phase] || 'var(--text-muted)';
export const regionColor = (regionId) => REGION_COLORS[regionId] || 'var(--accent-violet)';

export const orderedClassIds = CLASS_ORDER;
export const orderedPhases = PHASE_ORDER;
export const orderedRegions = REGION_ORDER;
