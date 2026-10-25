import { useTranslation } from 'react-i18next';
import { students } from '../../data/students';

export default function HomeworkTracker({ role }) {
  const { t } = useTranslation();
  const list = role === 'customer' ? students.slice(0, 1) : students;
  const dayKeys = ['school.day_mon', 'school.day_tue', 'school.day_wed', 'school.day_thu', 'school.day_fri'];

  return (
    <div className="glass-card p-5">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-kira-muted">
              <th className="px-2 py-2">{t('school.student_name')}</th>
              {dayKeys.map((k) => (
                <th key={k} className="px-2 py-2 text-center">
                  {t(k)}
                </th>
              ))}
              <th className="px-2 py-2 text-right">{t('school.weekly_progress')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-kira-border/60">
            {list.map((s) => {
              const done = s.homework.filter(Boolean).length;
              const pct = Math.round((done / 5) * 100);
              return (
                <tr key={s.id}>
                  <td className="px-2 py-2 font-medium">
                    <span className="mr-2 text-lg">{s.avatar}</span>
                    {s.name}
                  </td>
                  {s.homework.map((v, i) => (
                    <td key={i} className="px-2 py-2 text-center text-base">
                      {v ? '✅' : '❌'}
                    </td>
                  ))}
                  <td className="px-2 py-2">
                    <div className="flex items-center justify-end gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-kira-border">
                        <div
                          className="h-full bg-kira-accent"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-10 text-right text-xs text-kira-muted">{pct}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
