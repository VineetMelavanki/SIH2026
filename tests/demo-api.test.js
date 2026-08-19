import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';

const PORT = 4099;
const BASE = `http://localhost:${PORT}`;

let server;

before(async () => {
  process.env.PORT = String(PORT);
  process.env.NODE_ENV = 'test';
  const appMod = await import('../backend/server.js');
  server = appMod.default.listen(PORT);
});

after(() => new Promise((resolve) => server.close(resolve)));

const get = async (path) => {
  const res = await new Promise((resolve, reject) => {
    const req = http.get(BASE + path, (r) => {
      const chunks = [];
      r.on('data', (c) => chunks.push(c));
      r.on('end', () => resolve({ status: r.statusCode, body: JSON.parse(Buffer.concat(chunks).toString() || '{}') }));
    });
    req.on('error', reject);
  });
  return res;
};

describe('demo-api /api/demo/*', () => {
  it('/health returns read-only demo marker', async () => {
    const res = await get('/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.ok, true);
    assert.equal(res.body.mode, 'read-only');
    assert.equal(res.body.data, 'demo');
  });

  it('/api/demo aggregates the full fixture bundle', async () => {
    const res = await get('/api/demo');
    assert.equal(res.status, 200);
    assert.equal(res.body.dataMode, 'demo');
    for (const key of ['meta', 'banks', 'rounds', 'privacy', 'metrics', 'bankComparison', 'attackClasses']) {
      assert.ok(res.body[key], `bundle must include key '${key}'`);
    }
    assert.equal(res.body.banks.banks.length, 6);
    assert.equal(res.body.rounds.rounds.length, 12);
  });

  it('/api/demo/banks/:bankId surfaces the 6 canonical banks', async () => {
    for (const id of ['bank_01', 'bank_06']) {
      const res = await get(`/api/demo/banks/${id}`);
      assert.equal(res.status, 200);
      assert.equal(res.body.id, id);
    }
    const missing = await get('/api/demo/banks/does_not_exist');
    assert.equal(missing.status, 404);
  });

  it('/api/demo/privacy/:scenarioId validates the default scenario', async () => {
    const res = await get('/api/demo/privacy/scenario_balanced');
    assert.equal(res.status, 200);
    assert.equal(res.body.id, 'scenario_balanced');
    assert.ok(res.body.epsilonCumulative > 0);
  });

  it('/api/demo/file/:name only allows the seven allowlisted files', async () => {
    const ok = await get('/api/demo/file/demo-meta');
    assert.equal(ok.status, 200);
    const bad = await get('/api/demo/file/../package.json');
    assert.equal(bad.status, 404);
  });

  it('non-existent routes return a hint listing valid endpoints', async () => {
    const res = await get('/completely-missing');
    assert.equal(res.status, 404);
    assert.match(res.body.hint, /\/api\/demo/);
  });
});
