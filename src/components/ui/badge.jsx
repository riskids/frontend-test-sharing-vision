import { cn } from '../../lib/utils.js';

function Badge({ className, variant = 'default', ...props }) {
  const variants = {
    default:
      'border-transparent bg-primary text-primary-foreground shadow-xs',
    secondary:
      'border-transparent bg-secondary text-secondary-foreground',
    outline: 'text-foreground',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };