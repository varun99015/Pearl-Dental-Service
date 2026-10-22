const fs = require('fs/promises');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');

// Write queue to prevent concurrent write corruption
const writeQueues = new Map();

async function enqueueWrite(filePath, fn) {
  const queue = writeQueues.get(filePath) || Promise.resolve();
  const next = queue.then(fn).catch(fn);
  writeQueues.set(filePath, next.catch(() => {}));
  return next;
}

async function readJSON(filename) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return null;
    }
    if (err instanceof SyntaxError) {
      console.error(`[Storage] Malformed JSON in ${filename}:`, err.message);
      return null;
    }
    throw err;
  }
}

async function writeJSON(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  const tmpPath = filePath + '.tmp';

  return enqueueWrite(filePath, async () => {
    await fs.writeFile(tmpPath, JSON.stringify(data, null, 2), 'utf-8');
    await fs.rename(tmpPath, filePath);
  });
}

async function appendToJSONArray(filename, item) {
  const filePath = path.join(DATA_DIR, filename);
  return enqueueWrite(filePath, async () => {
    let existing = [];
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      existing = JSON.parse(content);
      if (!Array.isArray(existing)) existing = [];
    } catch {
      existing = [];
    }
    existing.push(item);
    const tmpPath = filePath + '.tmp';
    await fs.writeFile(tmpPath, JSON.stringify(existing, null, 2), 'utf-8');
    await fs.rename(tmpPath, filePath);
  });
}

module.exports = { readJSON, writeJSON, appendToJSONArray };
