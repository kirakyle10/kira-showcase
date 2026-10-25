import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import AnimatedCounter from '../../components/ui/AnimatedCounter';

function seedRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export default function RevenueChart() {
  const { t } = useTranslation();

  const data = useMemo(() => {
    const rand = seedRandom(99);
    const labels = [
      t('school.day_mon'),
      t('school.day_tue'),
      t('school.day_wed'),
      t('school.day_thu'),
      t('school.day_fri'),
      'Sat',
      'Sun',
    ];
    return labels.map((d) => ({
      day: d,
      revenue: Math.round(800 + rand() * 3700),
    }));
  }, [t]);

  const total = data.reduce((acc, d) => acc + d.revenue, 0);

  return (
    <div className="glass-card p-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <h4 className="font-display text-base font-semibold">
          {t('market.revenue_chart_title')}
        </h4>
        <div className="text-right">
          <div className="text-xs text-kira-muted">{t('market.weekly_total')}</div>
          <div className="font-display text-3xl font-bold gradient-text">
            <AnimatedCounter value={total} suffix=" TJS" />
          </div>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <XAxis dataKey="day" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              cursor={{ fill: 'rgba(108,99,255,0.1)' }}
              contentStyle={{
                background: '#131720',
                border: '1px solid #1E2535',
                borderRadius: 12,
                color: '#E8EAF0',
                fontSize: 12,
              }}
              formatter={(v) => [`${v} TJS`, 'Revenue']}
            />
            <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
              {data.map((_, i) => (
                <Cell key={i} fill="#6C63FF" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
