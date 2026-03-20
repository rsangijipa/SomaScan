import React from 'react';
import { cx } from './cx';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'default' | 'accent' | 'warning';
}

const toneClasses: Record<NonNullable<BadgeProps['tone']>, string> = {
  default: 'border border-border-soft bg-white/72 text-text-secondary',
  accent: 'border border-accent-petrol/20 bg-accent-petrol/10 text-accent-petrol',
  warning: 'border border-red-200 bg-red-50 text-red-700',
};

const Badge: React.FC<BadgeProps> = ({ className, tone = 'default', ...props }) => {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em]',
        toneClasses[tone],
        className
      )}
      {...props}
    />
  );
};

export default Badge;
