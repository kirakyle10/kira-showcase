import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import { students, studentPoints } from '../../data/students';

const highlights = {
  1: { bg: 'bg-kira-gold/15 border-kira-gold/50 shadow-[0_0_28px_rgba(255,215,0,0.3)]', icon: <Trophy size={18} className="text-kira-gold" />, label: '🥇' },
  2: { bg: 'bg-gray-400/10 border-gray-400/40', icon: <Medal size={18} className="text-gray-300" />, label: '🥈' },
  3: { bg: 'bg-amber-700/10 border-amber-700/40', icon: <Award size={18} className="text-amber-600" />, label: '🥉' },
};

export default function Leaderboard() {
  const { t } = useTranslation();
  const ranked = [...students]
    .map((s) => ({ ...s, points: studentPoints(s) }))
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);

  return (
    <div className="glass-card p-5">
      <h4 className="mb-4 font-display text-base font-semibold">
        {t('school.leaderboard_title')}
      </h4>
      <ol className="space-y-2.5">
        {ranked.map((s, i) => {
          const place = i + 1;
          const h = highlights[place];
          return (
            <motion.li
              key={s.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`flex items-center justify-between gap-3 rounded-xl border p-3 ${h ? h.bg : 'border-kira-border/60 bg-kira-bg/40'}`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-kira-border/60 text-sm font-bold">
                  {h ? h.label : place}
                </span>
                <span className="text-xl">{s.avatar}</span>
                <span className="font-medium">{s.name}</span>
              </div>
              <div className="flex items-center gap-2 font-semibold">
                {h?.icon}
                <span>
                  {s.points} <span className="text-xs text-kira-muted">{t('school.points')}</span>
                </span>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
