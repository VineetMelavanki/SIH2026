import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const demoDir = path.join(ROOT, 'demo-data');

const FILES = [
  'demo-meta.json',
  'banks.json',
  'federation-rounds.json',
  'privacy-scenarios.json',
  'class-metrics.json',
  'bank-comparison.json',
  'attack-classes.json',
];

const CLASS_IDS = ['BENIGN', 'BRUTE_FORCE', 'DOS', 'WEB_ATTACK', 'INFILTRATION', 'BOTNET', 'DDOS'];
const BANK_IDS = ['bank_01', 'bank_02', 'bank_03', 'bank_04', 'bank_05', 'bank_06'];
const REGION_IDS = ['north', 'west', 'south'];

describe('demo-data fixtures', () => {
  for (const file of FILES) {
    it(`${file} exists, is valid JSON, and declares dataMode=demo`, async () => {
      const raw = await fs.readFile(path.join(demoDir, file), 'utf8');
      const data = JSON.parse(raw);
      assert.equal(data.dataMode, 'demo', `${file} must carry dataMode=demo`);
    });
  }

  it('banks.json has exactly 6 banks with canonical IDs and regions', async () => {
    const data = JSON.parse(await fs.readFile(path.join(demoDir, 'banks.json'), 'utf8'));
    assert.equal(data.banks.length, 6);
    assert.deepEqual(
      data.banks.map((b) => b.id).sort(),
      BANK_IDS.slice().sort()
    );
    const regionBanks = data.regions.flatMap((r) => r.banks).sort();
    assert.deepEqual(regionBanks, BANK_IDS.slice().sort());
    assert.deepEqual(
      data.regions.map((r) => r.id).sort(),
      REGION_IDS.slice().sort()
    );
  });

  it('federation-rounds.json declares 12 rounds and phases are consistent', async () => {
    const data = JSON.parse(await fs.readFile(path.join(demoDir, 'federation-rounds.json'), 'utf8'));
    assert.equal(data.roundsTotal, 12);
    assert.equal(data.rounds.length, 12);
    for (const round of data.rounds) {
      assert.equal(round.bankUpdates.length, 6);
      const ids = round.bankUpdates.map((u) => u.bankId).sort();
      assert.deepEqual(ids, BANK_IDS.slice().sort());
    }
  });

  it('privacy-scenarios.json default scenario matches its own epsilon/utility values', async () => {
    const data = JSON.parse(await fs.readFile(path.join(demoDir, 'privacy-scenarios.json'), 'utf8'));
    const def = data.scenarios.find((s) => s.id === data.defaultScenarioId);
    assert.ok(def, 'Default scenario must exist in scenarios list');
    assert.equal(def.perRoundEpsilon.length, 12);
    assert.equal(
      Number(def.perRoundEpsilon[def.perRoundEpsilon.length - 1].toFixed(2)),
      Number(def.epsilonCumulative.toFixed(2))
    );
    const classF1Keys = Object.keys(def.classF1).sort();
    assert.deepEqual(classF1Keys, CLASS_IDS.slice().sort());
  });

  it('class-metrics.json perClass rows share class vocabulary with attack-classes.json', async () => {
    const metrics = JSON.parse(await fs.readFile(path.join(demoDir, 'class-metrics.json'), 'utf8'));
    const attacks = JSON.parse(await fs.readFile(path.join(demoDir, 'attack-classes.json'), 'utf8'));
    const metricIds = metrics.perClass.map((m) => m.classId).sort();
    const attackIds = attacks.attackClasses.map((c) => c.id).sort();
    assert.deepEqual(metricIds, attackIds);
    assert.deepEqual(metricIds, CLASS_IDS.slice().sort());
  });

  it('bank-comparison.json covers exactly the six banks, scenario matches class-metrics', async () => {
    const bc = JSON.parse(await fs.readFile(path.join(demoDir, 'bank-comparison.json'), 'utf8'));
    const cm = JSON.parse(await fs.readFile(path.join(demoDir, 'class-metrics.json'), 'utf8'));
    assert.equal(bc.scenarioId, cm.scenarioId);
    assert.deepEqual(
      bc.banks.map((b) => b.bankId).sort(),
      BANK_IDS.slice().sort()
    );
    for (const bank of bc.banks) {
      const keys = Object.keys(bank.perClassF1).sort();
      assert.deepEqual(keys, CLASS_IDS.slice().sort());
    }
  });

  it('demo-meta.json tagline matches frozen scope: federate the model, not the data', async () => {
    const meta = JSON.parse(await fs.readFile(path.join(demoDir, 'demo-meta.json'), 'utf8'));
    assert.match(meta.tagline, /federate/i);
    assert.match(meta.tagline, /model.*data|data.*model/i);
    assert.ok(Array.isArray(meta.scope.classes));
    assert.deepEqual(meta.scope.classes.slice().sort(), CLASS_IDS.slice().sort());
  });
});
