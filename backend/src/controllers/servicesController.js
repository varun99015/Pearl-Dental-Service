const { readJSON } = require('../services/storage');

async function getServices(req, res, next) {
  try {
    const services = await readJSON('services.json');
    if (!services) return res.status(503).json({ error: 'Services data unavailable.' });
    const active = services.filter(s => s.active).sort((a, b) => a.order - b.order);
    res.json({ success: true, data: active });
  } catch (err) {
    next(err);
  }
}

module.exports = { getServices };
