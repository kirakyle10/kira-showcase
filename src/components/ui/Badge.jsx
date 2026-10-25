const variants = {
  success: 'bg-kira-accent2/15 text-kira-accent2 border-kira-accent2/30',
  warn: 'bg-kira-warn/15 text-kira-warn border-kira-warn/30 animate-pulse',
  neutral: 'bg-kira-border/50 text-kira-text border-kira-border',
  accent: 'bg-kira-accent/15 text-kira-accent border-kira-accent/30',
  gold: 'bg-kira-gold/15 text-kira-gold border-kira-gold/30',
};

export default function Badge({ children, variant = 'neutral', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${variants[variant] || variants.neutral} ${className}`}
    >
      {children}
    </span>
  );
}
