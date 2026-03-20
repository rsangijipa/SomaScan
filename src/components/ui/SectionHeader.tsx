import React from 'react';

interface SectionHeaderProps {
  overline: string;
  title: string;
  description?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ overline, title, description }) => {
  return (
    <div>
      <p className="type-overline text-text-muted">{overline}</p>
      <h2 className="type-title mt-2 text-text-primary">{title}</h2>
      {description ? <p className="type-body mt-3 max-w-2xl text-text-secondary">{description}</p> : null}
    </div>
  );
};

export default SectionHeader;
