import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle2, Loader2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { recentPayments } from '../../data/students';

export default function PaymentUpload({ role }) {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const onFile = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setVerified(false);
  };

  const verify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      setTimeout(() => setVerified(false), 3500);
    }, 1500);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="glass-card p-5">
        <label
          htmlFor="pay-file"
          className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-kira-border bg-kira-bg/40 p-6 text-center text-kira-muted transition-colors hover:border-kira-accent hover:text-kira-text"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            onFile(e.dataTransfer.files?.[0]);
          }}
        >
          {preview ? (
            <img
              src={preview}
              alt="Payment preview"
              className="max-h-40 rounded-md border border-kira-border object-contain"
            />
          ) : (
            <>
              <Upload size={28} className="text-kira-accent" />
              <span className="text-sm">{t('school.upload_payment')}</span>
              <span className="text-xs text-kira-muted/70">PNG · JPG · WebP</span>
            </>
          )}
          <input
            id="pay-file"
            ref={inputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </label>
        <Button
          onClick={verify}
          disabled={!preview || verifying}
          className="mt-4 w-full"
          variant="primary"
        >
          {verifying ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              {t('school.verifying')}
            </>
          ) : (
            <>
              <CheckCircle2 size={16} />
              {t('school.verify_btn')}
            </>
          )}
        </Button>

        <AnimatePresence>
          {verified && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-4 rounded-xl border border-kira-accent2/50 bg-kira-accent2/10 p-3 text-sm text-kira-accent2 shadow-[0_0_18px_rgba(0,212,170,0.35)]"
            >
              ✅ {t('school.verified_toast')}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {role === 'admin' && (
        <div className="glass-card p-5">
          <h4 className="mb-3 font-display text-base font-semibold">
            {t('school.recent_payments')}
          </h4>
          <ul className="divide-y divide-kira-border/60">
            {recentPayments.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-3 py-2.5 text-sm"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{p.student}</span>
                  <span className="text-xs text-kira-muted">{p.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{p.amount} TJS</span>
                  <Badge variant="success">✓</Badge>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
