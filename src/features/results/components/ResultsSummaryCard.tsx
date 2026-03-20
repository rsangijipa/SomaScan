import React from 'react';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import { InferenceOutput } from '@/types';

interface ResultsSummaryCardProps {
  result: InferenceOutput;
}

const ResultsSummaryCard: React.FC<ResultsSummaryCardProps> = ({ result }) => {
  return (
    <Card tone="emphasis" className="p-6">
      <SectionHeader overline="Leitura principal" title={result.explanationSummary} />

      <div className="mt-6 space-y-4">
        {result.topCauses.map((cause, index) => (
          <div key={cause.id} className="rounded-2xl border border-border-soft bg-surface-secondary p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="type-overline text-text-muted">
                  Hipotese {index + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-text-primary">{cause.title}</h3>
              </div>
              <div className="text-right shrink-0">
                <p className="text-2xl font-semibold text-text-primary">
                  {Math.round(cause.probability * 100)}%
                </p>
                <p className="text-xs text-text-secondary">Confianca {cause.confidence}%</p>
              </div>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-border-soft">
              <div
                className={`h-full rounded-full ${index === 0 ? 'bg-stone-900' : 'bg-stone-500'}`}
                style={{ width: `${cause.probability * 100}%` }}
              />
            </div>

            <div className="mt-3 space-y-2 text-sm leading-6 text-text-secondary">
              <p>{cause.reasons.slice(0, 2).join(' • ')}</p>
              {'signals' in cause && cause.signals ? (
                <p>
                  Regioes: {cause.signals.regions.join(', ') || 'sem destaque'} • Sensacoes: {cause.signals.sensations.join(', ') || 'sem destaque'} • Contexto: {cause.signals.contexts.join(', ') || 'sem destaque'}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ResultsSummaryCard;
