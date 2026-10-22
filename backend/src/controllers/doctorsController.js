const { readJSON } = require('../services/storage');

async function getDoctors(req, res, next) {
  try {
    const doctors = await readJSON('doctors.json');
    if (!doctors) return res.status(503).json({ error: 'Doctor data unavailable.' });
    const active = doctors.filter(d => d.active).sort((a, b) => a.order - b.order);
    res.json({ success: true, data: active });
  } catch (err) {
    next(err);
  }
}

module.exports = { getDoctors };
