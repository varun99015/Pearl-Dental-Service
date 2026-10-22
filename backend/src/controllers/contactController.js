const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const { appendToJSONArray } = require('../services/storage');

async function createEnquiry(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
      });
    }

    const { name, phone, email, message } = req.body;

    const enquiry = {
      id: uuidv4(),
      name: String(name).trim().slice(0, 120),
      phone: phone ? String(phone).trim().slice(0, 20) : null,
      email: email ? String(email).trim().slice(0, 200) : null,
      message: String(message).trim().slice(0, 1500),
      createdAt: new Date().toISOString()
    };

    await appendToJSONArray('contact-enquiries.json', enquiry);

    res.status(201).json({
      success: true,
      message: 'Thank you for your enquiry. We will be in touch with you shortly.',
      enquiryId: enquiry.id
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { createEnquiry };
