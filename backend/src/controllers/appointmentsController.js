const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const { appendToJSONArray, readJSON } = require('../services/storage');

async function createAppointment(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
      });
    }

    const { patientName, phone, email, preferredDate, preferredTime, service, message, consentGiven } = req.body;

    if (!consentGiven) {
      return res.status(422).json({ success: false, error: 'Consent is required to submit this request.' });
    }

    const appointment = {
      id: uuidv4(),
      patientName: String(patientName).trim().slice(0, 120),
      phone: String(phone).trim().slice(0, 20),
      email: email ? String(email).trim().slice(0, 200) : null,
      preferredDate: String(preferredDate).trim(),
      preferredTime: String(preferredTime).trim(),
      service: String(service).trim().slice(0, 200),
      message: message ? String(message).trim().slice(0, 1000) : null,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    await appendToJSONArray('appointments.json', appointment);

    res.status(201).json({
      success: true,
      message: 'Appointment request received. Our team will contact you shortly to confirm your appointment.',
      requestId: appointment.id
    });
  } catch (err) {
    next(err);
  }
}

async function getAppointments(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token || token !== process.env.ADMIN_TOKEN) {
      return res.status(401).json({ success: false, error: 'Unauthorised.' });
    }

    const appointments = await readJSON('appointments.json');
    res.json({ success: true, data: appointments || [] });
  } catch (err) {
    next(err);
  }
}

module.exports = { createAppointment, getAppointments };
