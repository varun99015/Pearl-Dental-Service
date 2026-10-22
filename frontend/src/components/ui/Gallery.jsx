import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1629909615957-be38d48fbbe4?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1629909615957-be38d48fbbe4?w=400&q=75',
    alt: 'Modern dental clinic reception and waiting area'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1588776814546-1ffbb5ffa2f4?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1588776814546-1ffbb5ffa2f4?w=400&q=75',
    alt: 'Dental consultation with dentist and patient'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&q=75',
    alt: 'Professional teeth cleaning treatment'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&q=75',
    alt: 'Bright, healthy smile result after dental treatment'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=75',
    alt: 'Modern dental equipment and treatment chair'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=400&q=75',
    alt: 'Child receiving gentle dental care'
  },
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex(i => (i - 1 + galleryImages.length) % galleryImages.length);
  const next = () => setLightboxIndex(i => (i + 1) % galleryImages.length);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {galleryImages.map((img, index) => (
          <motion.button
            key={img.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openLightbox(index)}
            className="relative overflow-hidden rounded-xl aspect-square group cursor-pointer border-0 p-0"
            aria-label={`View image: ${img.alt}`}
          >
            <img
              src={img.thumb}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1588776814546-1ffbb5ffa2f4?w=400&q=75'; }}
            />
            <div className="absolute inset-0 bg-[var(--teal-900)] opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Close lightbox"
            >
              <X size={20} className="text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
              onClick={e => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={20} className="text-white" />
            </button>

            <div className="absolute bottom-4 text-white/50 text-sm">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
