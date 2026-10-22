import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X, Menu, Calendar } from 'lucide-react';
import { useClinic } from '../../context/ClinicContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/doctors', label: 'Our Doctors' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { clinic } = useClinic();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(15,113,133,0.1)] border-b border-[var(--border-light)]'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between h-18 py-3" role="navigation" aria-label="Main navigation">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group"
              aria-label="Pearl Dental Studio — Home"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--teal-600)] flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8 2 5 6 5 10C5 15 8 18 12 22C16 18 19 15 19 10C19 6 16 2 12 2Z" fill="white" opacity="0.95"/>
                  <circle cx="12" cy="10" r="2.5" fill="#0F7185"/>
                </svg>
              </div>
              <div>
                <span className={`font-heading text-xl font-bold leading-tight block transition-colors ${
                  scrolled ? 'text-[var(--text-primary)]' : 'text-white'
                }`}>
                  Pearl Dental
                </span>
                <span className={`text-xs font-medium tracking-wide transition-colors ${
                  scrolled ? 'text-[var(--teal-600)]' : 'text-[rgba(255,255,255,0.8)]'
                }`}>
                  Studio
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `nav-link text-sm font-medium transition-colors ${
                      isActive ? 'text-[var(--teal-600)]' : scrolled ? 'text-[var(--text-secondary)]' : 'text-white/90 hover:text-white'
                    } ${isActive ? 'after:w-full' : ''}`
                  }
                  style={({ isActive }) => ({
                    '--nav-after-color': 'var(--teal-600)'
                  })}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {clinic?.phone && (
                <a
                  href={`tel:${clinic.phoneRaw || clinic.phone}`}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    scrolled ? 'text-[var(--text-secondary)] hover:text-[var(--teal-600)]' : 'text-white/90 hover:text-white'
                  }`}
                >
                  <Phone size={14} />
                  {clinic.phone}
                </a>
              )}
              <Link to="/appointment" className="btn-primary text-sm px-5 py-2.5">
                <Calendar size={15} />
                Book Appointment
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg transition-colors"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen
                ? <X size={22} className={scrolled ? 'text-[var(--text-primary)]' : 'text-white'} />
                : <Menu size={22} className={scrolled ? 'text-[var(--text-primary)]' : 'text-white'} />
              }
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.28 }}
            className="fixed inset-0 z-40 bg-white flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="container-custom flex justify-between items-center h-18 py-3">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[var(--teal-600)] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8 2 5 6 5 10C5 15 8 18 12 22C16 18 19 15 19 10C19 6 16 2 12 2Z" fill="white"/>
                    <circle cx="12" cy="10" r="2.5" fill="#0F7185"/>
                  </svg>
                </div>
                <span className="font-heading text-lg font-bold text-[var(--text-primary)]">Pearl Dental Studio</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2"
                aria-label="Close menu"
              >
                <X size={22} className="text-[var(--text-primary)]" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col container-custom pt-6 gap-1" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `block py-3.5 px-4 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-[var(--teal-50)] text-[var(--teal-600)]'
                          : 'text-[var(--text-secondary)] hover:bg-gray-50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className="container-custom pb-8 flex flex-col gap-3">
              {clinic?.phone && (
                <a
                  href={`tel:${clinic.phoneRaw || clinic.phone}`}
                  className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border border-[var(--border-light)] text-[var(--text-secondary)] font-medium"
                >
                  <Phone size={16} />
                  {clinic.phone}
                </a>
              )}
              <Link to="/appointment" className="btn-primary justify-center">
                <Calendar size={16} />
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
