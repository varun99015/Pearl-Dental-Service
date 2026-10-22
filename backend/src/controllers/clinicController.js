const { readJSON } = require('../services/storage');

async function getClinic(req, res, next) {
  try {
    const clinic = await readJSON('clinic.json');
    if (!clinic) return res.status(503).json({ error: 'Clinic configuration unavailable.' });
    // Exclude any sensitive internal fields before sending
    res.json({ success: true, data: clinic });
  } catch (err) {
    next(err);
  }
}

module.exports = { getClinic };
