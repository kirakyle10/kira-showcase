import { useTranslation } from 'react-i18next';
import { Pencil } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import { students } from '../../data/students';

export default function StudentTable({ role }) {
  const { t } = useTranslation();
  const list = role === 'customer' ? students.slice(0, 1) : students;

  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-kira-border/30 text-left text-xs uppercase tracking-wider text-kira-muted">
            <tr>
              <th className="px-4 py-3">{t('school.student_name')}</th>
              <th className="px-4 py-3">{t('school.grade')}</th>
              <th className="px-4 py-3">{t('school.attendance')}</th>
              <th className="px-4 py-3">{t('school.homework')}</th>
              <th className="px-4 py-3">{t('school.payment_status')}</th>
              {role === 'admin' && <th className="px-4 py-3 text-right">{t('school.edit')}</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-kira-border/60">
            {list.map((s) => {
              const hwDone = s.homework.filter(Boolean).length;
              return (
                <tr key={s.id} className="hover:bg-kira-border/20">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{s.avatar}</span>
                      <span className="font-medium">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="accent">{s.grade}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-kira-border">
                        <div
                          className="h-full bg-kira-accent2"
                          style={{ width: `${s.attendance}%` }}
                        />
                      </div>
                      <span className="text-xs text-kira-muted">{s.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-kira-muted">{hwDone}/5</span>
                  </td>
                  <td className="px-4 py-3">
                    {s.payment === 'paid' ? (
                      <Badge variant="success">● {t('school.paid')}</Badge>
                    ) : (
                      <Badge variant="warn">● {t('school.unpaid')}</Badge>
                    )}
                  </td>
                  {role === 'admin' && (
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        className="rounded-md p-1.5 text-kira-muted hover:bg-kira-border/50 hover:text-kira-text"
                        aria-label={t('school.edit')}
                      >
                        <Pencil size={14} />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
