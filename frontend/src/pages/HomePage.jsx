import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Calendar, Phone, ArrowRight, Shield, Clock, Star,
  CheckCircle, Users, Stethoscope, Sparkles, MapPin
} from 'lucide-react';
import { useClinic } from '../context/ClinicContext';
import FaqAccordion from '../components/ui/FaqAccordion';
import Gallery from '../components/ui/Gallery';
import { useState } from 'react';
import { clinicApi } from '../services/api';

// Fade-in section wrapper
function ScrollReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Hero section
function HeroSection({ clinic }) {
  const whatsappUrl = clinic?.whatsAppNumber
    ? `https://wa.me/${clinic.whatsAppNumber}?text=${encodeURIComponent(clinic.whatsAppMessage || 'Hello!')}`
    : '#';

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1588776814546-1ffbb5ffa2f4?w=1920&q=85"
          alt=""
          role="presentation"
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--teal-900)]/90 via-[var(--teal-800)]/75 to-[var(--teal-600)]/40" />
      </div>

      <div className="relative z-10 container-custom pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--mint-400)] animate-pulse" />
            Now Accepting New Patients in Indiranagar
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-5"
          >
            Confident<br />
            <span className="text-[var(--teal-200)]">Smiles.</span>
            <br />Exceptional Care.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl"
          >
            Pearl Dental Studio provides comprehensive dental care in the heart of Indiranagar, Bengaluru — in a calm, modern environment designed around your comfort.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <Link to="/appointment" className="btn-primary text-base px-7 py-3.5">
              <Calendar size={18} />
              Book Appointment
            </Link>
            <Link to="/services" className="btn-white text-base px-7 py-3.5">
              Explore Treatments
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/20"
          >
            {[
              { icon: <Shield size={16} />, text: 'Sterile & Safe Environment' },
              { icon: <Clock size={16} />, text: 'Mon–Sat Appointments' },
              { icon: <Stethoscope size={16} />, text: 'Specialist Doctors' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-2 text-white/80 text-sm">
                <span className="text-[var(--teal-200)]">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-9 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-white/60" />
        </div>
      </motion.div>
    </section>
  );
}

// Services preview
function FeaturedServices({ services }) {
  const featured = services.slice(0, 6);

  const icons = {
    'general-dentistry': <Stethoscope size={24} />,
    'teeth-cleaning': <Sparkles size={24} />,
    'root-canal': <Shield size={24} />,
    'dental-implants': <Star size={24} />,
    'teeth-whitening': <Star size={24} />,
    'clear-aligners': <CheckCircle size={24} />,
  };

  return (
    <section className="section-padding bg-white" aria-labelledby="services-heading">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-14">
          <span className="section-label">Our Treatments</span>
          <h2 id="services-heading" className="section-heading mt-3 mb-4">
            Comprehensive Dental Care
          </h2>
          <p className="section-subheading mx-auto text-center">
            From routine check-ups to advanced restorative and cosmetic treatments — all under one roof.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 0.07}>
              <Link to={`/services#${service.slug}`} className="card group block h-full" tabIndex={0}>
                <div className="relative overflow-hidden h-52">
                  <img
                    src={service.image}
                    alt={service.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1588776814546-1ffbb5ffa2f4?w=800&q=80'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--teal-900)]/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                    {icons[service.id] || <Stethoscope size={20} />}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--teal-600)] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                    {service.shortDescription}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[var(--teal-600)] text-sm font-semibold group-hover:gap-2 transition-all">
                    Learn more <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-10">
          <Link to="/services" className="btn-outline">
            View All Services
            <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Why choose us
function WhyChooseUs() {
  const reasons = [
    {
      icon: <Shield size={24} />,
      title: 'Strict Hygiene Standards',
      desc: 'Our clinic follows comprehensive sterilisation and infection control protocols for every patient.'
    },
    {
      icon: <Users size={24} />,
      title: 'Specialist Care Team',
      desc: 'Our dentists have specialist training across prosthodontics, orthodontics, and endodontics.'
    },
    {
      icon: <Clock size={24} />,
      title: 'Flexible Appointments',
      desc: 'Extended evening hours on weekdays so you can visit without disrupting your workday.'
    },
    {
      icon: <CheckCircle size={24} />,
      title: 'Patient-First Approach',
      desc: 'We take time to understand your concerns, explain every procedure and work at your pace.'
    },
    {
      icon: <Sparkles size={24} />,
      title: 'Modern Equipment',
      desc: 'Digital X-rays, intraoral cameras and contemporary dental technology for accurate care.'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Central Indiranagar Location',
      desc: 'Conveniently located on 100 Feet Road with easy access from across east Bengaluru.'
    },
  ];

  return (
    <section className="section-padding bg-[var(--teal-50)]" aria-labelledby="why-us-heading">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-14">
          <span className="section-label">Why Pearl Dental</span>
          <h2 id="why-us-heading" className="section-heading mt-3 mb-4">
            A Clinic Built Around You
          </h2>
          <p className="section-subheading mx-auto text-center">
            We believe great dental care begins with trust. Here's what guides our practice.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <ScrollReveal key={r.title} delay={i * 0.07}>
              <div className="bg-white rounded-2xl p-7 border border-[var(--border-light)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[var(--teal-50)] border border-[var(--teal-100)] flex items-center justify-center text-[var(--teal-600)] mb-4">
                  {r.icon}
                </div>
                <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-2">{r.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{r.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// Appointment process steps
function HowItWorks() {
  const steps = [
    { num: '01', title: 'Request Online', desc: 'Fill in our quick appointment form with your preferred date and service.' },
    { num: '02', title: 'We Confirm', desc: 'Our team contacts you within one business day to confirm your slot.' },
    { num: '03', title: 'Visit the Clinic', desc: 'Arrive at our Indiranagar clinic for your appointment. We\'ll take it from there.' },
    { num: '04', title: 'Ongoing Care', desc: 'Receive your personalised treatment plan and scheduled follow-ups as needed.' },
  ];

  return (
    <section className="section-padding bg-white" aria-labelledby="how-it-works-heading">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-14">
          <span className="section-label">Getting Started</span>
          <h2 id="how-it-works-heading" className="section-heading mt-3 mb-4">
            How It Works
          </h2>
          <p className="section-subheading mx-auto text-center">
            Booking your first appointment with Pearl Dental Studio is simple.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-[var(--border-light)] z-0" />

          {steps.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 0.1} className="relative z-10 text-center">
              <div className="w-20 h-20 rounded-2xl bg-[var(--teal-600)] text-white flex items-center justify-center mx-auto mb-5 shadow-[var(--shadow-md)]">
                <span className="font-heading text-2xl font-bold">{step.num}</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-[var(--text-primary)] mb-2">{step.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-12">
          <Link to="/appointment" className="btn-primary">
            <Calendar size={16} />
            Request an Appointment
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Doctors preview
function DoctorsPreview() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    clinicApi.getDoctors().then(r => setDoctors(r.data || [])).catch(() => {});
  }, []);

  return (
    <section className="section-padding bg-[var(--teal-50)]" aria-labelledby="doctors-heading">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-14">
          <span className="section-label">Our Team</span>
          <h2 id="doctors-heading" className="section-heading mt-3 mb-4">
            Meet Your Dentists
          </h2>
          <p className="section-subheading mx-auto text-center">
            Our team brings specialist expertise and a genuine commitment to patient wellbeing.
            <br/>
            <span className="text-xs text-[var(--text-muted)] mt-1 block">Demo profiles — replace with verified details before launch.</span>
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.slice(0, 3).map((doc, i) => (
            <ScrollReveal key={doc.id} delay={i * 0.1}>
              <div className="card group text-center">
                <div className="relative overflow-hidden h-72">
                  <img
                    src={doc.image}
                    alt={`Portrait of ${doc.name} — demonstration profile`}
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--teal-900)]/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-heading text-xl font-bold text-white mb-1">{doc.name}</h3>
                    <p className="text-white/80 text-sm">{doc.specialities[0]}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-1.5 justify-center mb-3">
                    {doc.specialities.slice(0, 2).map(s => (
                      <span key={s} className="badge text-xs">{s}</span>
                    ))}
                  </div>
                  <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-4">{doc.biography.slice(0, 100)}...</p>
                  <Link to="/appointment" className="btn-outline text-sm w-full justify-center">
                    Book with {doc.name.split(' ')[1]}
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-10">
          <Link to="/doctors" className="btn-outline">
            View Full Team <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

// Gallery section
function GallerySection() {
  return (
    <section className="section-padding bg-white" aria-labelledby="gallery-heading">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-14">
          <span className="section-label">Our Clinic</span>
          <h2 id="gallery-heading" className="section-heading mt-3 mb-4">
            A Space Designed for Your Comfort
          </h2>
          <p className="section-subheading mx-auto text-center">
            Modern, welcoming and completely equipped — take a look around Pearl Dental Studio.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <Gallery />
        </ScrollReveal>
      </div>
    </section>
  );
}

// FAQ section
function FaqSection() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    clinicApi.getFaqs().then(r => setFaqs(r.data || [])).catch(() => {});
  }, []);

  return (
    <section className="section-padding bg-[var(--ivory)]" aria-labelledby="faq-heading">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <ScrollReveal>
            <span className="section-label">Common Questions</span>
            <h2 id="faq-heading" className="section-heading mt-3 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="section-subheading mb-8">
              Have a question about your upcoming visit, our services or how we work? We've answered the most common queries below.
            </p>
            <Link to="/faq" className="btn-primary">
              View All FAQs <ArrowRight size={16} />
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            {faqs.length > 0
              ? <FaqAccordion faqs={faqs.slice(0, 5)} />
              : <div className="text-[var(--text-muted)] text-sm">Loading FAQs…</div>
            }
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// Location & hours
function LocationSection({ clinic }) {
  const days = clinic?.openingHours
    ? Object.entries(clinic.openingHours).map(([day, hours]) => ({
        day: day.charAt(0).toUpperCase() + day.slice(1),
        hours
      }))
    : [];

  return (
    <section className="section-padding bg-white" aria-labelledby="location-heading">
      <div className="container-custom">
        <ScrollReveal className="text-center mb-14">
          <span className="section-label">Find Us</span>
          <h2 id="location-heading" className="section-heading mt-3 mb-4">
            Location & Opening Hours
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Map */}
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden border border-[var(--border-light)] shadow-[var(--shadow-md)] h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0316978940684!2d77.63811431482184!3d12.97159329085475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1683b2e38e01%3A0x6f0f1eec2d1d8a4e!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pearl Dental Studio location map — Indiranagar, Bengaluru"
              />
            </div>
            {clinic?.mapDirectionsUrl && (
              <a
                href={clinic.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline mt-4 inline-flex"
              >
                <MapPin size={16} />
                Get Directions
              </a>
            )}
          </ScrollReveal>

          {/* Hours */}
          <ScrollReveal delay={0.1}>
            <div className="bg-[var(--teal-50)] rounded-2xl p-8 border border-[var(--border-light)]">
              <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-2">Opening Hours</h3>
              <div className="divider mb-5" />
              <ul className="flex flex-col gap-3">
                {days.map(({ day, hours }) => (
                  <li key={day} className="flex justify-between items-center text-sm">
                    <span className={`font-medium ${hours === 'Closed' ? 'text-[var(--text-muted)]' : 'text-[var(--text-primary)]'}`}>{day}</span>
                    <span className={hours === 'Closed' ? 'text-red-400 font-medium' : 'text-[var(--teal-600)] font-semibold'}>
                      {hours}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-[var(--border-light)] flex flex-col gap-3">
                {clinic?.address && (
                  <div className="flex gap-2 text-sm text-[var(--text-secondary)]">
                    <MapPin size={15} className="flex-shrink-0 mt-0.5 text-[var(--teal-600)]" />
                    <span>{clinic.address}, {clinic.city}</span>
                  </div>
                )}
                {clinic?.phone && (
                  <a href={`tel:${clinic.phoneRaw}`} className="flex gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--teal-600)] transition-colors">
                    <Phone size={15} className="flex-shrink-0 mt-0.5 text-[var(--teal-600)]" />
                    {clinic.phone}
                  </a>
                )}
              </div>

              <Link to="/contact" className="btn-primary mt-5 w-full justify-center text-sm">
                Contact Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

// Main HomePage component
export default function HomePage() {
  const { clinic, services } = useClinic();

  useEffect(() => {
    document.title = 'Pearl Dental Studio | Confident Smiles. Exceptional Care.';
  }, []);

  return (
    <main>
      <HeroSection clinic={clinic} />
      <FeaturedServices services={services} />
      <WhyChooseUs />
      <DoctorsPreview />
      <GallerySection />
      <HowItWorks />
      <FaqSection />
      <LocationSection clinic={clinic} />
    </main>
  );
}
