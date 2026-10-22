import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Calendar, AlertTriangle, Award } from 'lucide-react';
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

function DoctorCard({ doctor, index }) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="card group">
        {/* Portrait */}
        <div className="relative overflow-hidden h-80">
          <img
            src={doctor.image}
            alt={`Portrait of ${doctor.name} — demonstration profile only`}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--teal-900)]/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2 className="font-heading text-xl font-bold text-white">{doctor.name}</h2>
            <p className="text-[var(--teal-200)] text-sm font-medium">{doctor.specialities[0]}</p>
          </div>
        </div>

        {/* Details */}
        <div className="p-6">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {doctor.specialities.map(s => (
              <span key={s} className="badge text-xs">{s}</span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-3">
            <Award size={14} className="text-[var(--teal-600)]" />
            <span>{doctor.qualifications}</span>
          </div>

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">{doctor.biography}</p>

          <Link
            to="/appointment"
            className="btn-primary text-sm w-full justify-center"
          >
            <Calendar size={15} />
            Book with {doctor.name.split(' ').slice(0, 2).join(' ')}
          </Link>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Our Doctors | Pearl Dental Studio';
    clinicApi.getDoctors()
      .then(r => setDoctors(r.data || []))
      .catch(() => setError('Failed to load doctor profiles. Please try refreshing.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="pt-18">
      {/* Header */}
      <section className="relative py-20 bg-[var(--teal-900)] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1920&q=80')" }}
        />
        <div className="relative container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Our Doctors</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Meet the team of specialist dentists dedicated to your oral health and wellbeing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Demo Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-100 py-4">
        <div className="container-custom">
          <div className="flex items-center gap-3 text-sm text-amber-800">
            <AlertTriangle size={16} className="flex-shrink-0 text-amber-600" />
            <span>
              <strong>Demonstration content only.</strong> All doctor profiles, qualifications and biographies are fictional. Replace with verified, accurate information before any commercial use.
            </span>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <section className="section-padding bg-[var(--ivory)]">
        <div className="container-custom">
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(n => (
                <div key={n} className="card animate-pulse">
                  <div className="h-80 bg-gray-100" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-100 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 rounded" />
                    <div className="h-3 bg-gray-100 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-12 text-[var(--text-muted)]">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doc, i) => (
                <DoctorCard key={doc.id} doctor={doc} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-sm bg-[var(--teal-600)]">
        <div className="container-custom text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to book with our team?
          </h2>
          <p className="text-white/80 mb-6">
            Request an appointment and let us know which dentist you'd prefer.
          </p>
          <Link to="/appointment" className="btn-white">
            <Calendar size={16} /> Book an Appointment
          </Link>
        </div>
      </section>
    </main>
  );
}
