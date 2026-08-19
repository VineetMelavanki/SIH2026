import { Router } from 'express';
import demoDataService from '../services/demo-data-service.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const data = await demoDataService.getAllDemoData();
    res.status(200).json({ dataMode: 'demo', ...data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to assemble demo data' });
  }
});

router.get('/meta', async (_req, res) => {
  const data = await demoDataService.getMeta();
  if (!data) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(data);
});

router.get('/banks', async (_req, res) => {
  const data = await demoDataService.getBanks();
  if (!data) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(data);
});

router.get('/banks/:bankId', async (req, res) => {
  const wrap = await demoDataService.getBanks();
  if (!wrap) return res.status(404).json({ error: 'Not found' });
  const bank = (wrap.banks || []).find((b) => b.id === req.params.bankId);
  if (!bank) return res.status(404).json({ error: 'Bank not found' });
  res.status(200).json(bank);
});

router.get('/rounds', async (_req, res) => {
  const data = await demoDataService.getFederationRounds();
  if (!data) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(data);
});

router.get('/rounds/:index', async (req, res) => {
  const wrap = await demoDataService.getFederationRounds();
  if (!wrap) return res.status(404).json({ error: 'Not found' });
  const idx = Number.parseInt(req.params.index, 10);
  const round = (wrap.rounds || [])[idx];
  if (!round) return res.status(404).json({ error: 'Round not found' });
  res.status(200).json(round);
});

router.get('/privacy', async (_req, res) => {
  const data = await demoDataService.getPrivacyScenarios();
  if (!data) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(data);
});

router.get('/privacy/:scenarioId', async (req, res) => {
  const wrap = await demoDataService.getPrivacyScenarios();
  if (!wrap) return res.status(404).json({ error: 'Not found' });
  const scenario = (wrap.scenarios || []).find((s) => s.id === req.params.scenarioId);
  if (!scenario) return res.status(404).json({ error: 'Scenario not found' });
  res.status(200).json(scenario);
});

router.get('/metrics', async (_req, res) => {
  const data = await demoDataService.getClassMetrics();
  if (!data) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(data);
});

router.get('/bank-comparison', async (_req, res) => {
  const data = await demoDataService.getBankComparison();
  if (!data) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(data);
});

router.get('/attack-classes', async (_req, res) => {
  const data = await demoDataService.getAttackClasses();
  if (!data) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(data);
});

router.get('/file/:name', async (req, res) => {
  const data = await demoDataService.getDemoFile(req.params.name);
  if (!data) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(data);
});

export default router;
