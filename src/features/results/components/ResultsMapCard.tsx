import React from 'react';
import AvatarEngine from '@/avatar/AvatarEngine';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import { BodyData } from '@/types';

interface ResultsMapCardProps {
  data: BodyData;
}

const ResultsMapCard: React.FC<ResultsMapCardProps> = ({ data }) => {
  return (
    <Card tone="emphasis" className="p-5">
      <SectionHeader overline="Mapa corporal" title="Regioes registradas" />

      <div className="min-h-[420px]">
        <AvatarEngine data={data} selectedPart={null} onSelectPart={() => {}} />
      </div>
    </Card>
  );
};

export default ResultsMapCard;
