import { lazy, Suspense, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import TabBar from '../components/layout/TabBar';
import RoleToggle from '../components/shared/RoleToggle';
import ErrorBoundary from '../components/shared/ErrorBoundary';

const SchoolDemo = lazy(() => import('../demos/school/SchoolDemo'));
const SupermarketDemo = lazy(() => import('../demos/supermarket/SupermarketDemo'));
const BookingDemo = lazy(() => import('../demos/booking/BookingDemo'));

function LoadingPanel() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-kira-muted">
      <div className="flex items-center gap-3">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-kira-accent border-t-transparent" />
        {t('common.loading')}
      </div>
    </div>
  );
}

export default function Showcase() {
  const { t } = useTranslation();
  const [active, setActive] = useState('school');
  const [role, setRole] = useState('admin');

  const tabs = [
    { id: 'school', label: t('tabs.school'), icon: '🎓' },
    { id: 'supermarket', label: t('tabs.supermarket'), icon: '🛒' },
    { id: 'booking', label: t('tabs.booking'), icon: '📅' },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <TabBar tabs={tabs} active={active} onChange={setActive} />

      <div className="mt-4 flex items-center justify-end">
        <RoleToggle role={role} onChange={setRole} />
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
          >
            <ErrorBoundary>
              <Suspense fallback={<LoadingPanel />}>
                {active === 'school' && <SchoolDemo role={role} />}
                {active === 'supermarket' && <SupermarketDemo role={role} />}
                {active === 'booking' && <BookingDemo role={role} />}
              </Suspense>
            </ErrorBoundary>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
