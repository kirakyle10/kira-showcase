import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppCTA from './components/shared/WhatsAppCTA';
import ErrorBoundary from './components/shared/ErrorBoundary';

const Home = lazy(() => import('./pages/Home'));
const Showcase = lazy(() => import('./pages/Showcase'));

function LoadingScreen() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[60vh] items-center justify-center text-kira-muted">
      <div className="flex items-center gap-3">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-kira-accent border-t-transparent" />
        {t('common.loading')}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="flex min-h-screen flex-col bg-kira-bg text-kira-text">
        <Navbar />
        <div className="flex-1">
          <ErrorBoundary>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/demos" element={<Showcase />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
        <Footer />
        <WhatsAppCTA />
      </div>
    </BrowserRouter>
  );
}
