import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import { clinicApi } from '../services/api';
import { useToast } from '../components/ui/Toast';

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

function ContactForm() {
  const { addToast } = useToast();
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.length < 2) e.name = 'Please enter your name.';
    if (form.phone && !/^[+\d\s\-()]{7,20}$/.test(form.phone)) e.phone = 'Please enter a valid phone number.';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address.';
    if (!form.message.trim() || form.message.length < 10) e.message = 'Please enter a message of at least 10 characters.';
    return e;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => { const n = { ...er }; delete n[name]; return n; });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      await clinicApi.submitContact(form);
      setSubmitted(true);
      addToast({ message: 'Enquiry sent! We\'ll be in touch shortly.', type: 'success' });
    } catch (err) {
      const serverErrors = err.errors;
      if (serverErrors) {
        const mapped = {};
        serverErrors.forEach(e => { mapped[e.field] = e.message; });
        setErrors(mapped);
      } else {
        addToast({ message: err.error || 'Something went wrong. Please try again.', type: 'error' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-bold text-green-800 mb-2">Thank you!</h3>
        <p className="text-green-700 text-sm">Your enquiry has been received. We'll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact enquiry form">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="form-label" htmlFor="contact-name">Your Name <span aria-hidden="true" className="text-red-500">*</span></label>
          <input
            id="contact-name" name="name" type="text" required
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="Dr. Rohan Sharma"
            value={form.name} onChange={handleChange}
            autoComplete="name"
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        <div>
          <label className="form-label" htmlFor="contact-phone">Phone Number</label>
          <input
            id="contact-phone" name="phone" type="tel"
            className={`form-input ${errors.phone ? 'error' : ''}`}
            placeholder="+91 6363427278"
            value={form.phone} onChange={handleChange}
            autoComplete="tel"
          />
          {errors.phone && <p className="form-error">{errors.phone}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label" htmlFor="contact-email">Email Address</label>
        <input
          id="contact-email" name="email" type="email"
          className={`form-input ${errors.email ? 'error' : ''}`}
          placeholder="you@example.com"
          value={form.email} onChange={handleChange}
          autoComplete="email"
        />
        {errors.email && <p className="form-error">{errors.email}</p>}
      </div>

      <div className="mb-6">
        <label className="form-label" htmlFor="contact-message">Your Message <span aria-hidden="true" className="text-red-500">*</span></label>
        <textarea
          id="contact-message" name="message" required rows={5}
          className={`form-input resize-none ${errors.message ? 'error' : ''}`}
          placeholder="How can we help you?"
          value={form.message} onChange={handleChange}
        />
        {errors.message && <p className="form-error">{errors.message}</p>}
        <p className="text-xs text-[var(--text-muted)] mt-1">{form.message.length}/1500 characters</p>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
        ) : (
          <><MessageSquare size={16} /> Send Message</>
        )}
      </button>
    </form>
  );
}

export default function ContactPage() {
  const { clinic } = useClinic();
  useEffect(() => { document.title = 'Contact Us | Pearl Dental Studio'; }, []);

  const whatsappUrl = clinic?.whatsAppNumber
    ? `https://wa.me/${clinic.whatsAppNumber}?text=${encodeURIComponent(clinic.whatsAppMessage || 'Hello!')}`
    : '#';

  const hours = clinic?.openingHours ? Object.entries(clinic.openingHours) : [];

  return (
    <main className="pt-18">
      {/* Header */}
      <section className="relative py-14 sm:py-20 bg-[var(--teal-900)] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1629909615957-be38d48fbbe4?w=1920&q=80')" }}
        />
        <div className="relative container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Get in touch with our team — we're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-[var(--ivory)]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left: Contact Info */}
            <ScrollReveal>
              <div className="space-y-6">
                <div>
                  <span className="section-label">Get in Touch</span>
                  <h2 className="section-heading mt-3 mb-4">We'd Love to Hear From You</h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    Whether you have a question about our treatments, need help booking an appointment, or simply want to learn more — reach out and our friendly team will respond promptly.
                  </p>
                </div>

                {/* Contact Cards */}
                {[
                  {
                    icon: <Phone size={20} />,
                    label: 'Phone',
                    value: clinic?.phone,
                    href: `tel:${clinic?.phoneRaw}`,
                    desc: 'Mon–Sat, 9 AM–8 PM'
                  },
                  {
                    icon: <Mail size={20} />,
                    label: 'Email',
                    value: clinic?.email,
                    href: `mailto:${clinic?.email}`,
                    desc: 'We respond within 24 hours'
                  },
                  {
                    icon: <MapPin size={20} />,
                    label: 'Address',
                    value: clinic?.address ? `${clinic.address}, ${clinic.city}` : null,
                    href: clinic?.mapDirectionsUrl || '#',
                    desc: 'Get directions'
                  },
                ].map(item => item.value && (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === 'Address' ? '_blank' : '_self'}
                    rel={item.label === 'Address' ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-4 p-5 bg-white rounded-xl border border-[var(--border-light)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-[var(--teal-200)] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[var(--teal-50)] flex items-center justify-center text-[var(--teal-600)] flex-shrink-0 group-hover:bg-[var(--teal-600)] group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs text-[var(--text-muted)] font-medium mb-0.5">{item.label}</div>
                      <div className="font-semibold text-[var(--text-primary)]">{item.value}</div>
                      <div className="text-xs text-[var(--text-muted)]">{item.desc}</div>
                    </div>
                  </a>
                ))}

                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-btn w-full justify-center text-sm"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>

                {/* Hours */}
                <div className="bg-white rounded-xl border border-[var(--border-light)] p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={16} className="text-[var(--teal-600)]" />
                    <span className="font-semibold text-sm text-[var(--text-primary)]">Opening Hours</span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {hours.slice(0, 4).map(([day, hrs]) => (
                      <li key={day} className="flex justify-between text-sm">
                        <span className="text-[var(--text-secondary)] capitalize">{day}</span>
                        <span className={hrs === 'Closed' ? 'text-red-400' : 'text-[var(--teal-600)] font-medium'}>{hrs}</span>
                      </li>
                    ))}
                    {hours.length > 4 && (
                      <li className="text-xs text-[var(--text-muted)] mt-1">
                        See full hours on the <a href="/#location" className="text-[var(--teal-600)] hover:underline">homepage</a>.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Form + Map */}
            <ScrollReveal delay={0.1}>
              <div className="bg-white rounded-2xl shadow-[var(--shadow-md)] border border-[var(--border-light)] p-8 mb-6">
                <h2 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-1">Send Us a Message</h2>
                <p className="text-sm text-[var(--text-muted)] mb-6">We'll respond within one business day.</p>
                <ContactForm />
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-[var(--border-light)] shadow-[var(--shadow-md)] h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0316978940684!2d77.63811431482184!3d12.97159329085475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1683b2e38e01%3A0x6f0f1eec2d1d8a4e!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Pearl Dental Studio map location"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
