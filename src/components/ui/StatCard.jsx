import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

export default function StatCard({ value, suffix = '', label, icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay }}
      className="glass-card accent-glow flex flex-col items-start gap-1 p-5 sm:p-6"
    >
      {icon && <div className="mb-1 text-kira-accent">{icon}</div>}
      <div className="font-display text-3xl font-bold sm:text-4xl">
        <AnimatedCounter value={value} suffix={suffix} className="gradient-text" />
      </div>
      <div className="text-sm text-kira-muted sm:text-base">{label}</div>
    </motion.div>
  );
}
