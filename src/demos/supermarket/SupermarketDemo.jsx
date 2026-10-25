import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import BarcodeScanner from './BarcodeScanner';
import InventoryTable from './InventoryTable';
import RevenueChart from './RevenueChart';

export default function SupermarketDemo({ role }) {
  const { t } = useTranslation();
  const defaultSub = 'pos';
  const [sub, setSub] = useState(defaultSub);

  const subs = [
    { id: 'pos',       label: t('market.sub_pos') },
    { id: 'inventory', label: t('market.sub_inventory') },
    ...(role === 'admin' ? [{ id: 'revenue', label: t('market.sub_revenue') }] : []),
  ];

  const current = subs.find((s) => s.id === sub) ? sub : defaultSub;

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-xl font-bold sm:text-2xl">{t('market.title')}</h2>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {subs.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSub(s.id)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              current === s.id
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
          key={current}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {current === 'pos' && <BarcodeScanner role={role} />}
          {current === 'inventory' && <InventoryTable role={role} />}
          {current === 'revenue' && role === 'admin' && <RevenueChart />}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
