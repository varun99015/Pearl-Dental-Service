import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FaqAccordion({ faqs }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => (
        <div
          key={faq.id}
          className={`bg-white rounded-xl border transition-all duration-200 ${
            openId === faq.id
              ? 'border-[var(--teal-200)] shadow-[var(--shadow-md)]'
              : 'border-[var(--border-light)] shadow-[var(--shadow-sm)]'
          }`}
        >
          <button
            id={`faq-btn-${faq.id}`}
            aria-expanded={openId === faq.id}
            aria-controls={`faq-content-${faq.id}`}
            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
            className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 group"
          >
            <span className={`font-semibold text-base transition-colors ${
              openId === faq.id ? 'text-[var(--teal-600)]' : 'text-[var(--text-primary)] group-hover:text-[var(--teal-600)]'
            }`}>
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: openId === faq.id ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <ChevronDown
                size={18}
                className={`transition-colors ${openId === faq.id ? 'text-[var(--teal-600)]' : 'text-[var(--text-muted)]'}`}
              />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {openId === faq.id && (
              <motion.div
                id={`faq-content-${faq.id}`}
                role="region"
                aria-labelledby={`faq-btn-${faq.id}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div className="px-6 pb-5">
                  <div className="h-px bg-[var(--border-light)] mb-4" />
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
