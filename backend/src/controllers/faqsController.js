const { readJSON } = require('../services/storage');

async function getFaqs(req, res, next) {
  try {
    const faqs = await readJSON('faqs.json');
    if (!faqs) return res.status(503).json({ error: 'FAQ data unavailable.' });
    const { category } = req.query;
    const filtered = category ? faqs.filter(f => f.category === category) : faqs;
    res.json({ success: true, data: filtered });
  } catch (err) {
    next(err);
  }
}

module.exports = { getFaqs };
