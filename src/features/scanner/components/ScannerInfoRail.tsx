import React from 'react';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import { BodyLog, ContextTag } from '@/types';
import { bodyPartLabels, contextTagLabels, sensationConfig } from '../config';

interface ScannerInfoRailProps {
  data: BodyLog[];
  contextTags: ContextTag[];
  onOpenContext: () => void;
}

const ScannerInfoRail: React.FC<ScannerInfoRailProps> = ({ data, contextTags, onOpenContext }) => {
  return (
    <Card className="flex w-full flex-col gap-5 p-5 lg:w-[280px] lg:shrink-0" tone="emphasis">
      <SectionHeader
        overline="Etapa atual"
        title="Registre as regioes que pedem atencao."
        description="Toque no corpo, escolha a sensacao, ajuste a intensidade e salve. O contexto e opcional."
      />

      <button
        onClick={onOpenContext}
        className="rounded-2xl border border-border-soft bg-surface-secondary px-4 py-4 text-left transition hover:border-border-strong hover:bg-white"
      >
        <span className="type-overline text-text-muted block">
          Contexto
        </span>
        <span className="mt-2 block text-sm font-medium text-text-primary">
          {contextTags.length > 0 ? `${contextTags.length} marcadores ativos` : 'Adicionar contexto'}
        </span>
        {contextTags.length > 0 ? (
          <span className="type-small mt-2 block text-text-secondary">
            {contextTags.map((tag) => contextTagLabels[tag]).join(' • ')}
          </span>
        ) : null}
      </button>

      <div className="min-h-0 flex-1">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="type-overline text-text-muted">
            Registros salvos
          </h3>
          <span className="text-xs font-medium text-text-secondary">{data.length}</span>
        </div>

        {data.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border-soft bg-surface-secondary px-4 py-5 text-sm leading-6 text-text-secondary">
            Nenhuma regiao registrada ainda.
          </div>
        ) : (
          <div className="space-y-2 lg:max-h-[360px] lg:overflow-y-auto lg:pr-1 no-scrollbar">
            {data.map((log) => (
              <div
                key={log.id}
                className="rounded-2xl border border-border-soft bg-white px-4 py-3 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-text-primary">
                    {bodyPartLabels[log.id] || log.label}
                  </span>
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: sensationConfig[log.sensation].color }}
                  />
                </div>
                <p className="type-small mt-1 text-text-secondary">
                  {sensationConfig[log.sensation].label} • Intensidade {log.intensity}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ScannerInfoRail;
