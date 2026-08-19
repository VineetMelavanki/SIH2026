import { useMemo, useState } from 'react';
import demoData, { getDefaultPrivacyScenario, getPrivacyScenario } from '../data/demo-data.js';

const usePrivacyScenario = () => {
  const defaultScenario = getDefaultPrivacyScenario();
  const [scenarioId, setScenarioId] = useState(defaultScenario?.id || 'scenario_balanced');

  const scenarios = useMemo(() => demoData.privacy.scenarios, []);
  const mechanisms = useMemo(() => demoData.privacy.mechanisms, []);
  const scenario = useMemo(() => getPrivacyScenario(scenarioId) || scenarios[0], [scenarioId, scenarios]);

  const epsilonTimeline = useMemo(() => {
    if (!scenario?.perRoundEpsilon) return [];
    return scenario.perRoundEpsilon.map((eps, i) => ({
      round: i,
      epsilon: eps,
      scenario: scenario.name,
    }));
  }, [scenario]);

  return {
    scenarios,
    mechanisms,
    scenarioId,
    scenario,
    setScenarioId,
    select: (id) => setScenarioId(id),
    epsilonTimeline,
  };
};

export default usePrivacyScenario;
