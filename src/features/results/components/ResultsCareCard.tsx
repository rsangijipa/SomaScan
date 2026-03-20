import React from 'react';
import { AlertTriangle, HeartPulse } from 'lucide-react';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import { InferenceOutput } from '@/types';

interface ResultsCareCardProps {
  result: InferenceOutput;
}

const ResultsCareCard: React.FC<ResultsCareCardProps> = ({ result }) => {
  return (
    <Card tone="emphasis" className="p-6">
      <div className="mb-4 flex items-start gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-azul-nevoa text-stone-900">
          <HeartPulse className="h-5 w-5" />
        </span>
        <SectionHeader overline="Proximos cuidados" title="Acoes sugeridas agora" />
      </div>

      <ul className="space-y-3">
        {result.selfCare.slice(0, 4).filter(Boolean).map((item, index) => (
          <li key={`${item}-${index}`} className="rounded-2xl border border-border-soft bg-surface-secondary px-4 py-3 text-sm leading-6 text-text-secondary">
            {item}
          </li>
        ))}
      </ul>

      {result.redFlags.length > 0 ? (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-red-900">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em]">Atencao prioritaria</p>
              <div className="mt-2 space-y-2 text-sm leading-6">
                {result.redFlags.map((flag) => (
                  <p key={flag}>{flag}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  );
};

export default ResultsCareCard;
