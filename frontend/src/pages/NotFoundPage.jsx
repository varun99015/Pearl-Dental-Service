import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Calendar, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--ivory)] pt-18">
      <div className="container-custom text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-heading text-[6rem] sm:text-[8rem] md:text-[10rem] font-bold text-[var(--teal-100)] leading-none mb-6 select-none">
            404
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Page Not Found
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-md mx-auto mb-8">
            Sorry, we couldn't find the page you're looking for. It may have moved or no longer exists.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/" className="btn-primary">
              <Home size={16} />
              Back to Home
            </Link>
            <Link to="/appointment" className="btn-outline">
              <Calendar size={16} />
              Book Appointment
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
