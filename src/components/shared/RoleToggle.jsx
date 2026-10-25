import { useTranslation } from 'react-i18next';
import { ShieldCheck, User } from 'lucide-react';

export default function RoleToggle({ role, onChange }) {
  const { t } = useTranslation();
  const base =
    'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors';
  const active = 'bg-kira-accent text-white';
  const inactive = 'text-kira-muted hover:text-kira-text';

  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-kira-border bg-kira-surface/70 p-1">
      <span className="pl-2 pr-1 text-xs uppercase tracking-wider text-kira-muted">
        {t('role.label')}
      </span>
      <button
        type="button"
        onClick={() => onChange('admin')}
        className={`${base} ${role === 'admin' ? active : inactive}`}
      >
        <ShieldCheck size={14} />
        {t('role.admin')}
      </button>
      <button
        type="button"
        onClick={() => onChange('customer')}
        className={`${base} ${role === 'customer' ? active : inactive}`}
      >
        <User size={14} />
        {t('role.customer')}
      </button>
    </div>
  );
}
