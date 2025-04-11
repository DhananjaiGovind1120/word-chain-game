import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = 'Button';

export { Button };
