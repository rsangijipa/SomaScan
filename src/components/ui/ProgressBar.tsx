import React from 'react';

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-border-soft">
      <div
        className="h-full rounded-full bg-accent-petrol transition-all duration-300"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
};

export default ProgressBar;
