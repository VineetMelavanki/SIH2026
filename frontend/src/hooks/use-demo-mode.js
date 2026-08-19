import { useMemo } from 'react';
import demoData from '../data/demo-data.js';

const useDemoMode = () => {
  return useMemo(() => {
    const _mode = demoData.dataMode === 'demo' || demoData.meta?.dataMode === 'demo';
    const label = demoData.meta?.dataModeLabel || 'Running in demo mode.';
    const tagline = demoData.meta?.tagline || '';
    const track = demoData.meta?.track || '';
    const scope = demoData.meta?.scope || {};
    return {
      isDemo: true,
      dataMode: 'demo',
      label,
      tagline,
      track,
      scope,
      dataset: demoData.meta?.dataset || '',
    };
  }, []);
};

export default useDemoMode;
