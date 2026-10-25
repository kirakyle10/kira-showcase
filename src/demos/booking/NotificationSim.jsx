import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MessageCircle, Smartphone, X } from 'lucide-react';

function makeWhatsAppMessage({ name, time, lang }) {
  if (lang === 'ru') {
    return `Ассалому алейкум ${name}! Вы записаны на ${time}. Ждём вас! — Kira Art Design`;
  }
  if (lang === 'tj') {
    return `Салом ${name}! Шумо ба соати ${time} сабт шудед. Мо интизори шумоем! — Kira Art Design`;
  }
  return `Salam ${name}! You're booked at ${time}. We look forward to seeing you! — Kira Art Design`;
}

export default function NotificationSim({ booking, onDismiss }) {
  const { t, i18n } = useTranslation();
  if (!booking) return null;
  const msg = makeWhatsAppMessage({ ...booking, lang: i18n.resolvedLanguage });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="glass-card space-y-3 p-4"
    >
      <div className="flex items-center justify-between">
        <h5 className="font-display text-sm font-semibold">
          📨 {t('booking.notification_sent')}
        </h5>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-md p-1 text-kira-muted hover:bg-kira-border/60 hover:text-kira-text"
          aria-label={t('common.close')}
        >
          <X size={14} />
        </button>
      </div>

      <div className="rounded-xl bg-[#0b1f14] p-3">
        <div className="mb-1 flex items-center gap-1.5 text-xs text-[#25D366]">
          <MessageCircle size={12} /> WhatsApp
        </div>
        <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-[#005c4b] px-3 py-2 text-sm text-white">
          {msg}
          <div className="mt-1 text-right text-[10px] text-white/60">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ✓✓
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-kira-bg/50 p-3">
        <div className="mb-1 flex items-center gap-1.5 text-xs text-kira-accent2">
          <Smartphone size={12} /> SMS
        </div>
        <div className="rounded-xl border border-kira-border bg-kira-surface px-3 py-2 text-sm">
          {msg}
        </div>
      </div>
    </motion.div>
  );
}
