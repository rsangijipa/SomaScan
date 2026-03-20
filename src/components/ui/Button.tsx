import React from 'react';
import { cx } from './cx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent-petrol text-white shadow-[0_12px_28px_rgba(45,79,94,0.18)] hover:bg-[#254552] focus-visible:outline-accent-petrol disabled:bg-stone-300 disabled:text-stone-500',
  secondary: 'border border-border-soft bg-surface-primary text-text-primary hover:border-border-strong hover:bg-white focus-visible:outline-accent-petrol disabled:bg-surface-secondary disabled:text-text-muted',
  ghost: 'text-text-secondary hover:bg-surface-secondary hover:text-text-primary focus-visible:outline-accent-petrol disabled:text-stone-400',
  danger: 'border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 focus-visible:outline-red-500 disabled:bg-stone-100 disabled:text-stone-400',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-[11px] tracking-[0.18em]',
  md: 'px-4 py-3 text-[11px] tracking-[0.2em]',
  lg: 'px-6 py-4 text-[12px] tracking-[0.22em]',
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', size = 'md', type = 'button', ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
});

export default Button;
