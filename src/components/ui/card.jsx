import { cn } from '../../lib/utils.js';

function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-card text-card-foreground shadow-xs',
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  );
}

function CardTitle({ className, ...props }) {
  return (
    <h3 className={cn('font-semibold leading-none tracking-tight', className)} {...props} />
  );
}

function CardContent({ className, ...props }) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}

function CardFooter({ className, ...props }) {
  return (
    <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
  );
}

export { Card, CardHeader, CardTitle, CardContent, CardFooter };