import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const langs = [
  { code: 'en', key: 'lang.en' },
  { code: 'ru', key: 'lang.ru' },
  { code: 'tj', key: 'lang.tj' },
];

export default function LangSwitcher() {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const current = langs.find((l) => l.code === i18n.resolvedLanguage) || langs[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-kira-border bg-kira-surface/70 px-2.5 py-1.5 text-sm text-kira-text hover:bg-kira-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-kira-accent"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe size={14} />
        <span className="font-semibold">{t(current.key)}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="glass-card absolute right-0 top-full z-20 mt-2 w-28 overflow-hidden p-1 text-sm shadow-xl"
        >
          {langs.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                onClick={() => {
                  i18n.changeLanguage(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left hover:bg-kira-border/60 ${
                  l.code === current.code ? 'text-kira-accent2' : ''
                }`}
              >
                <span>{t(l.key)}</span>
                {l.code === current.code && <Check size={14} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
