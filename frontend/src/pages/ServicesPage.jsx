import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, CheckCircle, Calendar } from 'lucide-react';
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

export default function ServicesPage() {
  const { services } = useClinic();

  useEffect(() => {
    document.title = 'Our Services | Pearl Dental Studio';
    // Scroll to hash if present
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300);
    }
  }, []);

  return (
    <main className="pt-18">
      {/* Page Header */}
      <section className="relative py-20 bg-[var(--teal-900)] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80')" }}
        />
        <div className="relative container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4">
              Pearl Dental Studio
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Dental Services
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Comprehensive dental care tailored to your needs — from routine prevention to specialist treatments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-[var(--ivory)]">
        <div className="container-custom">
          <div className="flex flex-col gap-16">
            {services.map((service, index) => (
              <ScrollReveal key={service.id} id={service.slug}>
                <div
                  id={service.slug}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 !== 0 ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden rounded-2xl shadow-[var(--shadow-lg)] ${index % 2 !== 0 ? 'lg:col-start-2' : ''}`}>
                    <img
                      src={service.image}
                      alt={service.name}
                      loading="lazy"
                      className="w-full h-80 object-cover"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1588776814546-1ffbb5ffa2f4?w=800&q=80'; }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="section-label text-xs">{`0${index + 1}`}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 !== 0 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <span className="section-label mb-3 inline-block">Treatment</span>
                    <h2 className="section-heading mb-4">{service.name}</h2>
                    <p className="text-[var(--text-secondary)] leading-relaxed mb-6">{service.fullDescription}</p>

                    {service.keyBenefits && service.keyBenefits.length > 0 && (
                      <ul className="flex flex-col gap-2.5 mb-8">
                        {service.keyBenefits.map(benefit => (
                          <li key={benefit} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                            <CheckCircle size={16} className="text-[var(--teal-600)] flex-shrink-0 mt-0.5" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <Link to="/appointment" className="btn-primary text-sm">
                        <Calendar size={15} />
                        Request Appointment
                      </Link>
                      <Link to="/contact" className="btn-outline text-sm">
                        Ask a Question
                      </Link>
                    </div>
                  </div>
                </div>

                {index < services.length - 1 && (
                  <div className="mt-16 h-px bg-[var(--border-light)]" />
                )}
              </ScrollReveal>
            ))}
          </div>

          {services.length === 0 && (
            <div className="text-center py-20 text-[var(--text-muted)]">
              <p>Loading services…</p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding-sm bg-[var(--teal-600)]">
        <div className="container-custom text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
            Not sure which treatment you need?
          </h2>
          <p className="text-white/80 mb-6">
            Book a consultation and our team will help you understand your options.
          </p>
          <Link to="/appointment" className="btn-white">
            Book a Consultation
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
