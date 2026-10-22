import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { clinicApi } from '../services/api';
import { useToast } from '../components/ui/Toast';
import { useClinic } from '../context/ClinicContext';

function ScrollReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'
];

const SERVICE_OPTIONS = [
  'General Check-up & Cleaning',
  'Teeth Whitening',
  'Dental Implant Consultation',
  'Root Canal Treatment',
  'Clear Aligners Consultation',
  'Paediatric Dentistry',
  'Crowns & Bridges',
  'Cosmetic Dentistry',
  'Pain / Emergency',
  'Other (specify in message)',
];

const initialForm = {
  patientName: '', phone: '', email: '',
  preferredDate: '', preferredTime: '', service: '',
  message: '', consentGiven: false
};

function SuccessScreen({ requestId, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12 px-6"
    >
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
        <CheckCircle size={40} className="text-green-600" />
      </div>
      <h2 className="font-heading text-3xl font-bold text-[var(--text-primary)] mb-3">
        Request Received!
      </h2>
      <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-2 leading-relaxed">
        Thank you for reaching out. Our team will contact you shortly to <strong>confirm your appointment</strong> and check availability for your requested date and time.
      </p>
      <p className="text-xs text-[var(--text-muted)] mb-6">Request ID: {requestId}</p>
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800 max-w-md mx-auto mb-8">
        <strong>Please note:</strong> This is a request only — not a confirmed booking. Your appointment is confirmed only when our team contacts you.
      </div>
      <button onClick={onReset} className="btn-outline">
        Make Another Request
      </button>
    </motion.div>
  );
}

export default function AppointmentPage() {
  const { services } = useClinic();
  const { addToast } = useToast();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState(null);

  // Min date = today
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  useEffect(() => {
    document.title = 'Book Appointment | Pearl Dental Studio';
  }, []);

  const validate = () => {
    const e = {};
    if (!form.patientName.trim() || form.patientName.length < 2) e.patientName = 'Please enter your full name.';
    if (!form.phone.trim() || !/^[+\d\s\-()]{7,20}$/.test(form.phone)) e.phone = 'Please enter a valid phone number.';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.';
    if (!form.preferredDate) e.preferredDate = 'Please select a preferred date.';
    if (!form.preferredTime) e.preferredTime = 'Please select a preferred time.';
    if (!form.service) e.service = 'Please select the reason for your visit.';
    if (form.message.length > 1000) e.message = 'Message must not exceed 1000 characters.';
    if (!form.consentGiven) e.consentGiven = 'Please acknowledge how your information will be used.';
    return e;
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(er => { const n = { ...er }; delete n[name]; return n; });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to first error
      const firstErrKey = Object.keys(errs)[0];
      const el = document.getElementById(`appt-${firstErrKey}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSubmitting(true);
    try {
      const result = await clinicApi.submitAppointment({ ...form, consentGiven: true });
      setRequestId(result.requestId);
      setSubmitted(true);
    } catch (err) {
      if (err.errors) {
        const mapped = {};
        err.errors.forEach(e => { mapped[e.field] = e.message; });
        setErrors(mapped);
        addToast({ message: 'Please correct the highlighted fields.', type: 'warning' });
      } else {
        addToast({ message: err.error || 'Something went wrong. Please try again.', type: 'error' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pt-18">
      {/* Header */}
      <section className="relative py-14 sm:py-20 bg-[var(--teal-900)] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1920&q=80')" }}
        />
        <div className="relative container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Book an Appointment
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Request a convenient time and our team will confirm your appointment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Notice bar */}
      <div className="bg-[var(--teal-50)] border-b border-[var(--teal-100)] py-3">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--teal-700)]">
            <AlertCircle size={15} />
            <span>
              <strong>Appointment Request:</strong> Submitting this form does not confirm a booking. Our team will contact you to confirm availability.
            </span>
          </div>
        </div>
      </div>

      <section className="section-padding bg-[var(--ivory)]">
        <div className="container-custom max-w-3xl">
          <div className="bg-white rounded-2xl shadow-[var(--shadow-md)] border border-[var(--border-light)] overflow-hidden">
            {submitted ? (
              <SuccessScreen requestId={requestId} onReset={() => { setForm(initialForm); setSubmitted(false); setErrors({}); }} />
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Appointment request form">
                <div className="p-5 sm:p-8 border-b border-[var(--border-light)]">
                  <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-1">Request Details</h2>
                  <p className="text-sm text-[var(--text-muted)]">All fields marked * are required.</p>
                </div>

                <div className="p-5 sm:p-8 space-y-6">
                  {/* Personal Info */}
                  <fieldset>
                    <legend className="text-sm font-semibold text-[var(--teal-600)] uppercase tracking-wider mb-4 flex items-center gap-2">
                      <User size={14} /> Personal Information
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label" htmlFor="appt-patientName">
                          Full Name <span aria-hidden="true" className="text-red-500">*</span>
                        </label>
                        <input
                          id="appt-patientName" name="patientName" type="text" required
                          className={`form-input ${errors.patientName ? 'error' : ''}`}
                          placeholder="Your full name"
                          value={form.patientName} onChange={handleChange}
                          autoComplete="name"
                        />
                        {errors.patientName && <p className="form-error">{errors.patientName}</p>}
                      </div>

                      <div>
                        <label className="form-label" htmlFor="appt-phone">
                          Phone Number <span aria-hidden="true" className="text-red-500">*</span>
                        </label>
                        <input
                          id="appt-phone" name="phone" type="tel" required
                          className={`form-input ${errors.phone ? 'error' : ''}`}
                          placeholder="+91 6363427278"
                          value={form.phone} onChange={handleChange}
                          autoComplete="tel"
                        />
                        {errors.phone && <p className="form-error">{errors.phone}</p>}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="form-label" htmlFor="appt-email">
                          Email Address <span className="text-[var(--text-muted)] font-normal">(optional)</span>
                        </label>
                        <input
                          id="appt-email" name="email" type="email"
                          className={`form-input ${errors.email ? 'error' : ''}`}
                          placeholder="you@example.com"
                          value={form.email} onChange={handleChange}
                          autoComplete="email"
                        />
                        {errors.email && <p className="form-error">{errors.email}</p>}
                      </div>
                    </div>
                  </fieldset>

                  {/* Appointment Preferences */}
                  <fieldset>
                    <legend className="text-sm font-semibold text-[var(--teal-600)] uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Calendar size={14} /> Appointment Preferences
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label" htmlFor="appt-preferredDate">
                          Preferred Date <span aria-hidden="true" className="text-red-500">*</span>
                        </label>
                        <input
                          id="appt-preferredDate" name="preferredDate" type="date" required
                          className={`form-input ${errors.preferredDate ? 'error' : ''}`}
                          min={today} max={maxDateStr}
                          value={form.preferredDate} onChange={handleChange}
                        />
                        {errors.preferredDate && <p className="form-error">{errors.preferredDate}</p>}
                      </div>

                      <div>
                        <label className="form-label" htmlFor="appt-preferredTime">
                          Preferred Time <span aria-hidden="true" className="text-red-500">*</span>
                        </label>
                        <select
                          id="appt-preferredTime" name="preferredTime" required
                          className={`form-input ${errors.preferredTime ? 'error' : ''}`}
                          value={form.preferredTime} onChange={handleChange}
                        >
                          <option value="">Select a time slot</option>
                          {TIME_SLOTS.map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                        {errors.preferredTime && <p className="form-error">{errors.preferredTime}</p>}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="form-label" htmlFor="appt-service">
                          Reason for Visit <span aria-hidden="true" className="text-red-500">*</span>
                        </label>
                        <select
                          id="appt-service" name="service" required
                          className={`form-input ${errors.service ? 'error' : ''}`}
                          value={form.service} onChange={handleChange}
                        >
                          <option value="">Select a treatment or reason</option>
                          {SERVICE_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        {errors.service && <p className="form-error">{errors.service}</p>}
                      </div>
                    </div>
                  </fieldset>

                  {/* Message */}
                  <div>
                    <label className="form-label" htmlFor="appt-message">
                      Additional Information <span className="text-[var(--text-muted)] font-normal">(optional)</span>
                    </label>
                    <textarea
                      id="appt-message" name="message" rows={4}
                      className={`form-input resize-none ${errors.message ? 'error' : ''}`}
                      placeholder="Any specific concerns, questions, or preferences? Please do not share detailed medical history here."
                      value={form.message} onChange={handleChange}
                    />
                    {errors.message && <p className="form-error">{errors.message}</p>}
                    <p className="text-xs text-[var(--text-muted)] mt-1">{form.message.length}/1000 characters</p>
                  </div>

                  {/* Consent */}
                  <div className={`bg-[var(--teal-50)] rounded-xl p-4 border ${errors.consentGiven ? 'border-red-300' : 'border-[var(--teal-100)]'}`}>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        id="appt-consentGiven"
                        name="consentGiven"
                        type="checkbox"
                        className="mt-1 w-4 h-4 accent-[var(--teal-600)] flex-shrink-0"
                        checked={form.consentGiven}
                        onChange={handleChange}
                      />
                      <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        I understand that the information I have provided will be used by Pearl Dental Studio to contact me regarding my appointment request. I acknowledge that this is a request only and does not guarantee a confirmed booking. <span aria-hidden="true" className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.consentGiven && <p className="form-error mt-2">{errors.consentGiven}</p>}
                  </div>
                </div>

                {/* Submit */}
                <div className="px-5 sm:px-8 pb-8">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                    aria-describedby="submit-note"
                  >
                    {submitting ? (
                      <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</>
                    ) : (
                      <><Calendar size={18} /> Submit Appointment Request</>
                    )}
                  </button>
                  <p id="submit-note" className="text-center text-xs text-[var(--text-muted)] mt-3">
                    We will contact you within one business day to confirm.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
