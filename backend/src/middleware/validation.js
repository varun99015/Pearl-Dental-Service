const { body } = require('express-validator');

const VALID_TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'
];

const appointmentValidation = [
  body('patientName')
    .trim()
    .notEmpty().withMessage('Full name is required.')
    .isLength({ min: 2, max: 120 }).withMessage('Name must be between 2 and 120 characters.'),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required.')
    .matches(/^[+\d\s\-()]{7,20}$/).withMessage('Please enter a valid phone number.'),

  body('email')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail().withMessage('Please enter a valid email address.')
    .isLength({ max: 200 }).withMessage('Email address is too long.'),

  body('preferredDate')
    .notEmpty().withMessage('Preferred date is required.')
    .isISO8601().withMessage('Invalid date format.')
    .custom(value => {
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) throw new Error('Preferred date cannot be in the past.');
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + 1);
      if (date > maxDate) throw new Error('Please select a date within the next 12 months.');
      return true;
    }),

  body('preferredTime')
    .notEmpty().withMessage('Preferred time is required.')
    .isIn(VALID_TIME_SLOTS).withMessage('Please select a valid time slot.'),

  body('service')
    .trim()
    .notEmpty().withMessage('Please indicate the reason for your visit.')
    .isLength({ min: 2, max: 200 }).withMessage('Service description must be between 2 and 200 characters.'),

  body('message')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 }).withMessage('Message must not exceed 1000 characters.'),

  body('consentGiven')
    .notEmpty().withMessage('Consent acknowledgement is required.')
    .custom(value => {
      if (value !== true && value !== 'true' && value !== 1) {
        throw new Error('You must acknowledge how your information will be used.');
      }
      return true;
    })
];

const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ min: 2, max: 120 }).withMessage('Name must be between 2 and 120 characters.'),

  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[+\d\s\-()]{7,20}$/).withMessage('Please enter a valid phone number.'),

  body('email')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail().withMessage('Please enter a valid email address.')
    .isLength({ max: 200 }),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required.')
    .isLength({ min: 10, max: 1500 }).withMessage('Message must be between 10 and 1500 characters.')
];

module.exports = { appointmentValidation, contactValidation };
