import React from 'react';
import { cx } from './cx';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: 'default' | 'ghost';
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { className, tone = 'default', type = 'button', ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        'inline-flex h-11 w-11 items-center justify-center rounded-full transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-petrol disabled:cursor-not-allowed',
        tone === 'default'
          ? 'border border-border-soft bg-surface-primary text-text-secondary hover:border-border-strong hover:text-text-primary'
          : 'text-text-secondary hover:bg-surface-secondary hover:text-text-primary',
        className
      )}
      {...props}
    />
  );
});

export default IconButton;
