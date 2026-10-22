import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Shield, Heart, Users, CheckCircle, Calendar, ArrowRight, AlertTriangle } from 'lucide-react';
import Gallery from '../components/ui/Gallery';
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

const values = [
  { icon: <Heart size={22} />, title: 'Genuine Patient Care', desc: 'We listen first. Every treatment decision is discussed transparently and made collaboratively.' },
  { icon: <Shield size={22} />, title: 'Safety & Hygiene', desc: 'Strict sterilisation protocols and clinical hygiene standards are followed for every patient, every time.' },
  { icon: <Users size={22} />, title: 'Community Focus', desc: 'We are rooted in the Indiranagar community and committed to accessible, quality dental care for all.' },
];

const hygienePoints = [
  'Autoclaved instruments for every patient',
  'Single-use consumables where applicable',
  'Regular surface disinfection',
  'Staff training and PPE compliance',
  'Ventilated and well-maintained treatment rooms',
  'Clear infection control protocols on display',
];

export default function AboutPage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    document.title = 'About Us | Pearl Dental Studio';
    clinicApi.getDoctors().then(r => setDoctors(r.data || [])).catch(() => {});
  }, []);

  return (
    <main className="pt-18">
      {/* Header */}
      <section className="relative py-20 bg-[var(--teal-900)] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1629909615957-be38d48fbbe4?w=1920&q=80')" }}
        />
        <div className="relative container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">About Us</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              The story behind Pearl Dental Studio — our philosophy, our team, and our approach to care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <span className="section-label">Our Philosophy</span>
              <h2 className="section-heading mt-3 mb-5">Dentistry That Puts You First</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                Pearl Dental Studio was founded with a simple belief: that great dental care goes beyond clinical excellence. It begins with listening, with understanding what each patient genuinely needs, and with creating an environment where people feel at ease.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                We practise in a calm, modern setting in the heart of Indiranagar, Bengaluru. Our team brings specialist expertise in prosthodontics, orthodontics and endodontics — paired with a warm, patient-first approach that makes even nervous visitors feel welcome.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Whether you are coming in for a routine clean or a comprehensive smile makeover, you can expect transparency, time and genuine care at every visit.
              </p>
              <div className="mt-8">
                <Link to="/appointment" className="btn-primary">
                  <Calendar size={16} /> Book Your First Visit
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1629909615957-be38d48fbbe4?w=800&q=80"
                  alt="Welcoming reception area of Pearl Dental Studio clinic"
                  className="w-full rounded-2xl shadow-[var(--shadow-xl)] object-cover h-96"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1588776814546-1ffbb5ffa2f4?w=800&q=80'; }}
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-[var(--shadow-lg)] border border-[var(--border-light)]">
                  <div className="font-heading text-3xl font-bold text-[var(--teal-600)]">3</div>
                  <div className="text-sm text-[var(--text-secondary)]">Specialist Dentists</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[var(--teal-50)]">
        <div className="container-custom">
          <ScrollReveal className="text-center mb-12">
            <span className="section-label">What We Stand For</span>
            <h2 className="section-heading mt-3 mb-4">Our Core Values</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-7 border border-[var(--border-light)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-[var(--teal-50)] border border-[var(--teal-100)] flex items-center justify-center text-[var(--teal-600)] mb-4">
                    {v.icon}
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-2">{v.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hygiene */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <span className="section-label">Infection Control</span>
              <h2 className="section-heading mt-3 mb-4">Hygiene & Safety Standards</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                Your safety is our first priority. The following practices describe our standard infection control approach. Specific protocols are subject to ongoing review and regulatory guidance.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3">
                <AlertTriangle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                  <strong>Demo content:</strong> Replace the points below with your verified, clinic-specific hygiene practices before launch.
                </p>
              </div>
              <ul className="flex flex-col gap-3">
                {hygienePoints.map(pt => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                    <CheckCircle size={15} className="text-[var(--teal-600)] flex-shrink-0 mt-0.5" />
                    {pt}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
                alt="Modern dental treatment equipment and operatory"
                className="w-full rounded-2xl shadow-[var(--shadow-lg)] object-cover h-96"
                loading="lazy"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1588776814546-1ffbb5ffa2f4?w=800&q=80'; }}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-[var(--ivory)]">
        <div className="container-custom">
          <ScrollReveal className="text-center mb-12">
            <span className="section-label">Inside Pearl Dental</span>
            <h2 className="section-heading mt-3 mb-4">Our Clinic Gallery</h2>
          </ScrollReveal>
          <ScrollReveal><Gallery /></ScrollReveal>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-amber-50 border-t border-amber-100">
        <div className="container-custom">
          <div className="flex gap-3 max-w-3xl mx-auto">
            <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Important Disclaimer:</strong> All doctor profiles, credentials, experience claims and operational details on this website are fictional demonstration content only. They must be replaced with fully verified, accurate information before this website is used to represent a real clinic.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
