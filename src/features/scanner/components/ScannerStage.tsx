import React from 'react';
import { Fingerprint } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { BodyData, BodyPartId } from '@/types';
import AvatarEngine from '@/avatar/AvatarEngine';

interface ScannerStageProps {
  data: BodyData;
  selectedPart: BodyPartId | null;
  side: 'front' | 'back';
  onSelectPart: (part: BodyPartId) => void;
  onSideChange: (side: 'front' | 'back') => void;
}

const ScannerStage: React.FC<ScannerStageProps> = ({
  data,
  selectedPart,
  side,
  onSelectPart,
  onSideChange,
}) => {
  return (
    <Card tone="emphasis" className="relative flex min-h-[560px] flex-1 items-center justify-center overflow-hidden px-4 py-6 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-radial-soft opacity-80" />
      <div className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2">
        <Badge className="px-4 py-2 text-[11px] font-medium normal-case tracking-normal">
        Toque em uma regiao do corpo para editar.
        </Badge>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
        <Fingerprint className="h-[340px] w-[340px] text-stone-900" strokeWidth={0.75} />
      </div>

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <AvatarEngine
          data={data}
          selectedPart={selectedPart}
          onSelectPart={onSelectPart}
          overrideSide={side}
        />
      </div>

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/70 bg-white/85 p-1 shadow-lg backdrop-blur-sm">
        {(['front', 'back'] as const).map((value) => (
          <Button
            key={value}
            onClick={() => onSideChange(value)}
            variant={side === value ? 'primary' : 'ghost'}
            size="sm"
            className={side !== value ? 'text-text-secondary' : ''}
          >
            {value === 'front' ? 'Frente' : 'Costas'}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default ScannerStage;
