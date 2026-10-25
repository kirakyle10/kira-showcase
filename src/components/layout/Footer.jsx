import { useTranslation } from 'react-i18next';
import { Phone, MessageCircle, Send } from 'lucide-react';

const WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || '992172594774';
const TELEGRAM = import.meta.env.VITE_TELEGRAM_HANDLE || 'kiraartdesign';
const CONTACT_PHONE = import.meta.env.VITE_CONTACT_PHONE || '+992172594774';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-16 border-t border-kira-border/60 bg-kira-bg">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2">
        <div>
          <div className="font-display text-xl font-bold">
            <span className="gradient-text">Kira</span>{' '}
            <span className="text-kira-text">Art Design</span>
          </div>
          <p className="mt-2 text-sm text-kira-muted">{t('nav.tagline')}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-kira-muted md:items-end">
          <a
            href={`tel:${CONTACT_PHONE}`}
            className="inline-flex items-center gap-2 hover:text-kira-text"
          >
            <Phone size={14} className="text-kira-accent" />
            {CONTACT_PHONE}
          </a>
          <a
            href={`https://t.me/${TELEGRAM}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-kira-text"
          >
            <Send size={14} className="text-kira-accent" />
            t.me/{TELEGRAM}
          </a>
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-kira-text"
          >
            <MessageCircle size={14} className="text-kira-accent2" />
            wa.me/{WHATSAPP}
          </a>
        </div>
      </div>
      <div className="border-t border-kira-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-kira-muted sm:flex-row sm:px-6">
          <span>© 2026 Kira Art Design. {t('footer.rights')}</span>
          <span>{t('footer.built')}</span>
        </div>
      </div>
    </footer>
  );
}
