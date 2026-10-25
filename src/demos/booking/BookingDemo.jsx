import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import AppointmentCalendar from './AppointmentCalendar';
import MenuOrder from './MenuOrder';

export default function BookingDemo({ role }) {
  const { t } = useTranslation();
  const [sub, setSub] = useState('appointments');

  const subs = [
    { id: 'appointments', label: t('booking.sub_appointments') },
    { id: 'menu',         label: t('booking.sub_menu') },
  ];

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-bold sm:text-2xl">{t('booking.title')}</h2>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {subs.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSub(s.id)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              sub === s.id
                ? 'bg-kira-accent text-white'
                : 'border border-kira-border bg-kira-surface/70 text-kira-muted hover:text-kira-text'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={sub}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {sub === 'appointments' && <AppointmentCalendar role={role} />}
          {sub === 'menu' && <MenuOrder role={role} />}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
