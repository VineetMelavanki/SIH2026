import express from 'express';
import cors from 'cors';
import demoRoutes from './routes/demo-routes.js';

const app = express();
const PORT = process.env.PORT || 4010;

app.use(cors({ origin: true, credentials: false }));
app.use(express.json({ limit: '256kb' }));

app.get('/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    service: 'consilience-demo-api',
    mode: 'read-only',
    data: 'demo',
  });
});

app.use('/api/demo', demoRoutes);

app.use((_req, res) => {
  res.status(404).json({
    error: 'Not found',
    hint: 'Try /api/demo, /api/demo/banks, /api/demo/rounds, /api/demo/privacy',
  });
});

app.use((err, _req, res, _next) => {
  console.error('[demo-api] error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[demo-api] Consilience demo API listening on http://localhost:${PORT}`);
    console.log(`[demo-api] GET /api/demo returns the complete aggregated fixture bundle.`);
  });
}

export default app;
