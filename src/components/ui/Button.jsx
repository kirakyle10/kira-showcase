const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-kira-accent focus-visible:ring-offset-2 focus-visible:ring-offset-kira-bg disabled:opacity-50 disabled:cursor-not-allowed';

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-6 py-3.5 text-lg',
  xl: 'px-8 py-4 text-xl',
};

const variants = {
  primary:
    'bg-kira-accent text-white hover:bg-kira-accent/90 hover:shadow-[0_0_24px_rgba(108,99,255,0.5)] active:scale-[0.98]',
  secondary:
    'border border-kira-accent2 text-kira-accent2 bg-transparent hover:bg-kira-accent2/10 hover:shadow-[0_0_18px_rgba(0,212,170,0.35)] active:scale-[0.98]',
  ghost:
    'text-kira-text/80 hover:text-kira-text hover:bg-kira-surface border border-transparent hover:border-kira-border',
  danger:
    'bg-kira-warn/15 text-kira-warn border border-kira-warn/30 hover:bg-kira-warn/25',
  success:
    'bg-kira-accent2 text-kira-bg hover:bg-kira-accent2/90 active:scale-[0.98]',
};

export default function Button({
  as: Comp = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  return (
    <Comp
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Comp>
  );
}
