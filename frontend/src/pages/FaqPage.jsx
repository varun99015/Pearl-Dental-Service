import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import FaqAccordion from '../components/ui/FaqAccordion';
import { clinicApi } from '../services/api';

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

const CATEGORIES = [
  { key: 'all', label: 'All Questions' },
  { key: 'appointments', label: 'Appointments' },
  { key: 'general', label: 'General' },
  { key: 'first-visit', label: 'First Visit' },
  { key: 'services', label: 'Services' },
  { key: 'payments', label: 'Payments' },
  { key: 'preventive', label: 'Preventive Care' },
];

export default function FaqPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    document.title = 'FAQs | Pearl Dental Studio';
    clinicApi.getFaqs()
      .then(r => setFaqs(r.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'all' ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <main className="pt-18">
      {/* Header */}
      <section className="relative py-14 sm:py-20 bg-[var(--teal-900)] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1588776814546-1ffbb5ffa2f4?w=1920&q=80')" }}
        />
        <div className="relative container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Answers to common questions about our services, appointments, and what to expect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding bg-[var(--ivory)]">
        <div className="container-custom max-w-4xl">
          {/* Category Filter */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.key
                      ? 'bg-[var(--teal-600)] text-white'
                      : 'bg-white text-[var(--text-secondary)] border border-[var(--border-light)] hover:border-[var(--teal-600)] hover:text-[var(--teal-600)]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* FAQs */}
          {loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4].map(n => (
                <div key={n} className="h-16 bg-white rounded-xl border border-[var(--border-light)] animate-pulse" />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <ScrollReveal delay={0.1}>
              <FaqAccordion faqs={filtered} />
            </ScrollReveal>
          ) : (
            <div className="text-center py-16 text-[var(--text-muted)]">
              No questions in this category yet.
            </div>
          )}

          {/* Still have questions */}
          <ScrollReveal className="mt-14 bg-[var(--teal-50)] rounded-2xl p-8 text-center border border-[var(--teal-100)]">
            <h2 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-3">
              Still have questions?
            </h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Our team is happy to help. Reach out and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/contact" className="btn-primary">Get in Touch</Link>
              <Link to="/appointment" className="btn-outline">
                <Calendar size={15} /> Book a Consultation
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
