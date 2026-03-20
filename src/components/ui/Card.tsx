import React from 'react';
import { cx } from './cx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'default' | 'subtle' | 'emphasis';
}

const toneClasses: Record<NonNullable<CardProps['tone']>, string> = {
  default: 'border border-border-soft bg-surface-primary shadow-[0_20px_50px_rgba(18,26,34,0.06)]',
  subtle: 'border border-border-soft bg-surface-secondary shadow-[0_12px_28px_rgba(18,26,34,0.04)]',
  emphasis: 'border border-white/70 bg-white/88 shadow-[0_28px_60px_rgba(18,26,34,0.08)] backdrop-blur-md',
};

const Card: React.FC<CardProps> = ({ className, tone = 'default', ...props }) => {
  return <div className={cx('rounded-[1.75rem]', toneClasses[tone], className)} {...props} />;
};

export default Card;
