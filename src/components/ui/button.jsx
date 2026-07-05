import { cn } from '../../lib/utils.js';

function Button({ className, variant = 'default', size = 'default', children, ...props }) {
  const variants = {
    default:
      'bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs',
    outline:
      'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  };

  const sizes = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 rounded-md px-3 text-sm',
    lg: 'h-10 rounded-md px-8',
    icon: 'h-9 w-9',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors cursor-pointer disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button };