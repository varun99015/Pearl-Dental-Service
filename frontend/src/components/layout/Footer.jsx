import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { useClinic } from '../../context/ClinicContext';

function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function TwitterIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

const navSections = [
  {
    title: 'Services',
    links: [
      { to: '/services#general-dentistry', label: 'General Dentistry' },
      { to: '/services#teeth-whitening', label: 'Teeth Whitening' },
      { to: '/services#dental-implants', label: 'Dental Implants' },
      { to: '/services#clear-aligners', label: 'Clear Aligners' },
      { to: '/services#root-canal', label: 'Root Canal' },
    ]
  },
  {
    title: 'Clinic',
    links: [
      { to: '/about', label: 'About Us' },
      { to: '/doctors', label: 'Our Doctors' },
      { to: '/faq', label: 'FAQ' },
      { to: '/contact', label: 'Contact' },
      { to: '/appointment', label: 'Book Appointment' },
    ]
  }
];

export default function Footer() {
  const { clinic } = useClinic();
  const currentYear = new Date().getFullYear();

  const whatsappUrl = clinic?.whatsAppNumber
    ? `https://wa.me/${clinic.whatsAppNumber}?text=${encodeURIComponent(clinic.whatsAppMessage || 'Hello!')}`
    : '#';

  return (
    <footer className="bg-[var(--teal-900)] text-white" role="contentinfo">
      {/* CTA Strip */}
      <div className="bg-[var(--teal-600)] py-12">
        <div className="container-custom text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
            Ready for a Healthier Smile?
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Request an appointment at Pearl Dental Studio. Our team will get in touch to confirm your preferred time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/appointment" className="btn-white text-sm">
              Request Appointment
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn text-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--teal-600)] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8 2 5 6 5 10C5 15 8 18 12 22C16 18 19 15 19 10C19 6 16 2 12 2Z" fill="white"/>
                  <circle cx="12" cy="10" r="2.5" fill="#0F7185"/>
                </svg>
              </div>
              <div>
                <div className="font-heading text-lg font-bold">Pearl Dental Studio</div>
                <div className="text-xs text-white/50 font-medium tracking-wider">Indiranagar, Bengaluru</div>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              {clinic?.tagline || 'Confident Smiles. Exceptional Care.'}
            </p>
            <div className="flex gap-3">
              {clinic?.socialLinks?.instagram && (
                <a href={clinic.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[var(--teal-600)] transition-colors"
                  aria-label="Instagram">
                  <InstagramIcon size={16} />
                </a>
              )}
              {clinic?.socialLinks?.facebook && (
                <a href={clinic.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[var(--teal-600)] transition-colors"
                  aria-label="Facebook">
                  <FacebookIcon size={16} />
                </a>
              )}
              {clinic?.socialLinks?.twitter && (
                <a href={clinic.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[var(--teal-600)] transition-colors"
                  aria-label="Twitter">
                  <TwitterIcon size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Nav Columns */}
          {navSections.map(section => (
            <div key={section.title}>
              <h3 className="font-semibold text-sm tracking-widest text-white/50 uppercase mb-4">{section.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {section.links.map(link => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-white/70 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold text-sm tracking-widest text-white/50 uppercase mb-4">Contact</h3>
            <ul className="flex flex-col gap-3">
              {clinic?.phone && (
                <li>
                  <a href={`tel:${clinic.phoneRaw}`} className="flex items-start gap-2.5 text-white/70 text-sm hover:text-white transition-colors">
                    <Phone size={14} className="mt-0.5 flex-shrink-0" />
                    {clinic.phone}
                  </a>
                </li>
              )}
              {clinic?.email && (
                <li>
                  <a href={`mailto:${clinic.email}`} className="flex items-start gap-2.5 text-white/70 text-sm hover:text-white transition-colors">
                    <Mail size={14} className="mt-0.5 flex-shrink-0" />
                    {clinic.email}
                  </a>
                </li>
              )}
              {clinic?.address && (
                <li>
                  <a
                    href={clinic.mapDirectionsUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2.5 text-white/70 text-sm hover:text-white transition-colors"
                  >
                    <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                    <span>{clinic.address},<br />{clinic.city}</span>
                  </a>
                </li>
              )}
              {clinic?.openingHours && (
                <li className="flex items-start gap-2.5 text-white/70 text-sm">
                  <Clock size={14} className="mt-0.5 flex-shrink-0" />
                  <span>Mon–Fri: 9:00 AM – 8:00 PM<br />Sat: 9:00 AM – 6:00 PM</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>© {currentYear} Pearl Dental Studio. All rights reserved.</p>
          <p className="text-center">
            ⚠️ Demo website — all details are fictional. Replace with verified information before launch.
          </p>
        </div>
      </div>
    </footer>
  );
}
