import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import LangSwitcher from '../shared/LangSwitcher';
import Button from '../ui/Button';

const WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || '992172594774';

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
      isActive ? 'text-kira-text' : 'text-kira-muted hover:text-kira-text'
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-kira-border/60 bg-kira-bg/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="font-display text-lg font-bold tracking-tight sm:text-xl"
          onClick={() => setOpen(false)}
        >
          <span className="gradient-text">Kira</span>{' '}
          <span className="text-kira-text">Art Design</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <NavLink to="/" className={navClass} end>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/demos" className={navClass}>
            {t('nav.demos')}
          </NavLink>
          <a
            href="#contact"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-kira-muted hover:text-kira-text"
          >
            {t('nav.contact')}
          </a>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <LangSwitcher />
          <Button
            as="a"
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noreferrer"
            size="sm"
            variant="primary"
          >
            {t('nav.contact')}
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LangSwitcher />
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-kira-border p-2 text-kira-text"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-kira-border/60 bg-kira-bg md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            <NavLink to="/" className={navClass} end onClick={() => setOpen(false)}>
              {t('nav.home')}
            </NavLink>
            <NavLink to="/demos" className={navClass} onClick={() => setOpen(false)}>
              {t('nav.demos')}
            </NavLink>
            <a
              href="#contact"
              className="rounded-md px-3 py-1.5 text-sm font-medium text-kira-muted hover:text-kira-text"
              onClick={() => setOpen(false)}
            >
              {t('nav.contact')}
            </a>
            <Button
              as="a"
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              size="sm"
              className="mt-2"
            >
              {t('hero.cta_secondary')}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
