import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, MessageCircle, Phone, Send } from 'lucide-react';
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
  const steps = [
    { icon: '💡', title: t('services.step1_title'), desc: t('services.step1_desc') },
    { icon: '🎨', title: t('services.step2_title'), desc: t('services.step2_desc') },
    { icon: '⌨️', title: t('services.step3_title'), desc: t('services.step3_desc') },
    { icon: '🌐', title: t('services.step4_title'), desc: t('services.step4_desc') },
    { icon: '☁️', title: t('services.step5_title'), desc: t('services.step5_desc') },
    { icon: '✅', title: t('services.step6_title'), desc: t('services.step6_desc') },
  ];
  const courseFeatures = [
    t('course.feature1'),
    t('course.feature2'),
    t('course.feature3'),
    t('course.feature4'),
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

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{t('services.title')}</h2>
            <p className="mt-2 max-w-2xl text-sm text-kira-muted sm:text-base">
              {t('services.subtitle')}
            </p>
          </div>
          <span className="rounded-full border border-kira-accent2/40 bg-kira-accent2/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-kira-accent2">
            {t('services.badge')}
          </span>
        </div>
        <div className="mt-8 flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-6 md:gap-4 md:overflow-visible md:pb-0">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card relative min-w-[150px] p-4 text-center transition-transform hover:-translate-y-1 md:min-w-0"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-kira-accent2 px-2 py-0.5 text-[10px] font-bold text-white">
                {i + 1}
              </div>
              <div className="text-3xl">{s.icon}</div>
              <div className="mt-2 font-display text-sm font-semibold">{s.title}</div>
              <div className="mt-1 text-xs text-kira-muted">{s.desc}</div>
              {i < steps.length - 1 && (
                <ArrowRight
                  size={16}
                  className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-kira-accent2 md:block"
                />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="glass-card relative overflow-hidden p-6 sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-kira-accent2/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-kira-accent/20 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-kira-accent2/15 text-kira-accent2">
                  <GraduationCap size={24} />
                </div>
                <h2 className="font-display text-2xl font-bold sm:text-3xl">{t('course.title')}</h2>
              </div>
              <p className="mt-3 max-w-xl text-sm text-kira-muted sm:text-base">
                {t('course.subtitle')}
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {courseFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-kira-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-kira-accent2" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button
              as="a"
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t('course.whatsapp_msg'))}`}
              target="_blank"
              rel="noreferrer"
              size="lg"
              className="w-full md:w-auto"
            >
              <GraduationCap size={18} />
              {t('course.cta')}
            </Button>
          </div>
        </motion.div>
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
            <div className="rounded-xl bg-white p-3 shadow-xl">
              <img
                src={`${import.meta.env.BASE_URL}qr.png`}
                alt="Scan to open Kira Art Design"
                width={160}
                height={160}
                className="h-40 w-40"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="mt-3 text-sm text-kira-muted">{t('cta.qr_caption')}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
