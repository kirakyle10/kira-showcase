import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Phone, Send } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import Button from '../components/ui/Button';

const WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMBER || '992172594774';
const TELEGRAM = import.meta.env.VITE_TELEGRAM_HANDLE || 'kiraartdesign';
const CONTACT_PHONE = import.meta.env.VITE_CONTACT_PHONE || '+992172594774';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const problems = [
    { icon: '📋', title: t('problem.p1_title'), sol: t('problem.p1_sol') },
    { icon: '💰', title: t('problem.p2_title'), sol: t('problem.p2_sol') },
    { icon: '📅', title: t('problem.p3_title'), sol: t('problem.p3_sol') },
  ];
  const industries = [
    {
      icon: '🎓',
      name: t('industries.schools'),
      features: [t('industries.schools_f1'), t('industries.schools_f2'), t('industries.schools_f3')],
    },
    {
      icon: '🛒',
      name: t('industries.market'),
      features: [t('industries.market_f1'), t('industries.market_f2'), t('industries.market_f3')],
    },
    {
      icon: '🏥',
      name: t('industries.clinic'),
      features: [t('industries.clinic_f1'), t('industries.clinic_f2'), t('industries.clinic_f3')],
    },
    {
      icon: '☕',
      name: t('industries.cafe'),
      features: [t('industries.cafe_f1'), t('industries.cafe_f2'), t('industries.cafe_f3')],
    },
  ];

  return (
    <main>
      <section className="animated-bg relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(108,99,255,0.18),transparent_60%)]" />
        <div className="relative mx-auto flex min-h-[calc(100vh-57px)] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-5"
          >
            <motion.div variants={item} className="text-xs uppercase tracking-[0.2em] text-kira-accent2">
              {t('nav.tagline')}
            </motion.div>
            <motion.h1
              variants={item}
              className="font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
            >
              <span className="gradient-text">Kira Art Design</span>
            </motion.h1>
            <motion.p
              variants={item}
              className="font-display max-w-3xl text-2xl font-semibold leading-snug sm:text-3xl md:text-4xl"
            >
              {t('hero.headline')}
            </motion.p>
            <motion.p variants={item} className="max-w-2xl text-base text-kira-muted sm:text-lg">
              {t('hero.subheadline')}
            </motion.p>

            <motion.div variants={item} className="mt-2 flex flex-wrap items-center gap-3">
              <Button as={Link} to="/demos" variant="primary" size="lg">
                {t('hero.cta_primary')}
                <ArrowRight size={18} />
              </Button>
              <Button
                as="a"
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                size="lg"
              >
                <MessageCircle size={18} />
                {t('hero.cta_secondary')}
              </Button>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-6 grid w-full gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4"
            >
              <StatCard value={15} suffix="+" label={t('hero.stat_clients')} />
              <StatCard value={8} suffix="+" label={t('hero.stat_systems')} delay={0.1} />
              <StatCard value={200} suffix="+ hrs" label={t('hero.stat_hours_saved')} delay={0.2} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">{t('problem.title')}</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6 transition-transform hover:-translate-y-1"
            >
              <div className="text-3xl">{p.icon}</div>
              <h3 className="mt-2 font-display text-lg font-semibold">{p.title}</h3>
              <div className="mt-3 flex items-start gap-2 text-sm text-kira-muted">
                <ArrowRight size={16} className="mt-0.5 shrink-0 text-kira-accent2" />
                <span>{p.sol}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">{t('industries.title')}</h2>
        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card min-w-[260px] p-5 transition-transform hover:-translate-y-1 md:min-w-0"
            >
              <div className="text-3xl">{ind.icon}</div>
              <h3 className="mt-2 font-display text-base font-semibold">{ind.name}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-kira-muted">
                {ind.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-kira-accent2" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="relative overflow-hidden bg-gradient-to-br from-[#141035] via-[#1a1245] to-[#0A0D14]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(108,99,255,0.25),transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{t('cta.headline')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-kira-muted sm:text-lg">
            {t('cta.subtext')}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Button
              as="a"
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              size="xl"
              className="w-full !bg-[#25D366] hover:!bg-[#20bd5a] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)]"
            >
              <MessageCircle size={22} />
              {t('cta.whatsapp')}
            </Button>
            <Button
              as="a"
              href={`https://t.me/${TELEGRAM}`}
              target="_blank"
              rel="noreferrer"
              size="xl"
              className="w-full !bg-[#229ED9] hover:!bg-[#1b86b8] hover:shadow-[0_0_30px_rgba(34,158,217,0.5)]"
            >
              <Send size={22} />
              {t('cta.telegram')}
            </Button>
            <Button
              as="a"
              href={`tel:${CONTACT_PHONE}`}
              size="xl"
              variant="secondary"
              className="w-full"
            >
              <Phone size={22} />
              {t('cta.phone')}
            </Button>
          </div>

          <div className="mx-auto mt-10 flex flex-col items-center">
            <QrPlaceholder />
            <div className="mt-3 text-sm text-kira-muted">{t('cta.qr_caption')}</div>
          </div>
        </div>
      </section>
    </main>
  );
}

function QrPlaceholder() {
  const cells = 11;
  const arr = Array.from({ length: cells * cells }, (_, i) => {
    const row = Math.floor(i / cells);
    const col = i % cells;
    const isFinder =
      (row < 3 && col < 3) ||
      (row < 3 && col > cells - 4) ||
      (row > cells - 4 && col < 3);
    const seed = (row * 31 + col * 17) % 7;
    return isFinder || seed === 0 || seed === 2;
  });
  return (
    <div
      className="grid gap-[2px] rounded-lg bg-white p-3"
      style={{ gridTemplateColumns: `repeat(${cells}, 10px)` }}
      aria-hidden="true"
    >
      {arr.map((on, i) => (
        <span
          key={i}
          className="h-[10px] w-[10px] rounded-[1px]"
          style={{ background: on ? '#0A0D14' : 'transparent' }}
        />
      ))}
    </div>
  );
}
