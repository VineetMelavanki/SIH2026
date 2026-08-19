import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', '..');

const safeReadJson = async (fileName) => {
  if (!fileName || typeof fileName !== 'string') {
    throw new Error('read-json: fileName must be a non-empty string');
  }
  if (!fileName.endsWith('.json')) {
    throw new Error('read-json: only .json files are permitted');
  }
  const demoDir = path.resolve(ROOT, 'demo-data');
  const filePath = path.resolve(demoDir, fileName);
  const normalized = path.normalize(filePath);
  if (!normalized.startsWith(demoDir)) {
    throw new Error('read-json: path traversal detected');
  }
  try {
    const raw = await fs.readFile(normalized, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return null;
    }
    throw err;
  }
};

export default safeReadJson;
export { safeReadJson };
