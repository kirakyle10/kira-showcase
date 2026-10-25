import useAnimatedCount from '../../hooks/useAnimatedCount';

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 1500,
  className = '',
}) {
  const animated = useAnimatedCount(value, duration);
  const display = Number(animated).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <span className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
