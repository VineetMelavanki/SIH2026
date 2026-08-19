import { API_BASE_URL } from '../constants.js';

const buildUrl = (path) => `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;

const safeFetch = async (url, opts = {}) => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      ...opts,
    });
    if (!res.ok) return { ok: false, status: res.status, data: null };
    const data = await res.json();
    return { ok: true, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 0, data: null, error: err.message };
  }
};

export const fetchAll = () => safeFetch(buildUrl('/'));
export const fetchMeta = () => safeFetch(buildUrl('/meta'));
export const fetchBanks = () => safeFetch(buildUrl('/banks'));
export const fetchBank = (bankId) => safeFetch(buildUrl(`/banks/${bankId}`));
export const fetchRounds = () => safeFetch(buildUrl('/rounds'));
export const fetchRound = (idx) => safeFetch(buildUrl(`/rounds/${idx}`));
export const fetchPrivacy = () => safeFetch(buildUrl('/privacy'));
export const fetchPrivacyScenario = (id) => safeFetch(buildUrl(`/privacy/${id}`));
export const fetchMetrics = () => safeFetch(buildUrl('/metrics'));
export const fetchBankComparison = () => safeFetch(buildUrl('/bank-comparison'));
export const fetchAttackClasses = () => safeFetch(buildUrl('/attack-classes'));

export const isApiAvailable = async () => {
  const res = await fetch(`${API_BASE_URL.replace(/\/api\/demo$/, '')}/health`);
  return res.ok;
};

export default {
  fetchAll,
  fetchMeta,
  fetchBanks,
  fetchBank,
  fetchRounds,
  fetchRound,
  fetchPrivacy,
  fetchPrivacyScenario,
  fetchMetrics,
  fetchBankComparison,
  fetchAttackClasses,
  isApiAvailable,
};
