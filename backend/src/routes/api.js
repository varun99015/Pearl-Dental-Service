const express = require('express');
const rateLimit = require('express-rate-limit');
const { getClinic } = require('../controllers/clinicController');
const { getServices } = require('../controllers/servicesController');
const { getDoctors } = require('../controllers/doctorsController');
const { getFaqs } = require('../controllers/faqsController');
const { createAppointment, getAppointments } = require('../controllers/appointmentsController');
const { createEnquiry } = require('../controllers/contactController');
const { appointmentValidation, contactValidation } = require('../middleware/validation');

const router = express.Router();

// Rate limiters for form endpoints
const formRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests. Please try again in a few minutes.' }
});

const strictRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many appointment requests. Please try again later or call us directly.' }
});

// Health check
router.get('/health', (req, res) => {
  res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() });
});

// Public data endpoints
router.get('/clinic', getClinic);
router.get('/services', getServices);
router.get('/doctors', getDoctors);
router.get('/faqs', getFaqs);

// Appointment endpoints
router.post('/appointments', strictRateLimit, appointmentValidation, createAppointment);
router.get('/admin/appointments', getAppointments);

// Contact endpoint
router.post('/contact', formRateLimit, contactValidation, createEnquiry);

module.exports = router;
