import React from 'react';
import { X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import IconButton from '@/components/ui/IconButton';
import { BodyPartId, GuidedResponse, Severity, SensationType } from '@/types';
import GuidedResponseCard from '@/components/GuidedResponseCard';
import { bodyPartLabels, sensationConfig } from '../config';

interface ScannerInspectorProps {
  selectedPart: BodyPartId | null;
  tempSensation: SensationType | null;
  tempIntensity: Severity;
  activeResponse: GuidedResponse | null;
  onClose: () => void;
  onSelectSensation: (value: SensationType) => void;
  onChangeIntensity: (value: Severity) => void;
  onClear: () => void;
  onSave: () => void;
  onCloseResponse: () => void;
}

const ScannerInspector: React.FC<ScannerInspectorProps> = ({
  selectedPart,
  tempSensation,
  tempIntensity,
  activeResponse,
  onClose,
  onSelectSensation,
  onChangeIntensity,
  onClear,
  onSave,
  onCloseResponse,
}) => {
  if (!selectedPart) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:static md:inset-auto md:w-[320px] md:shrink-0 md:p-0">
      <div className="mx-auto max-w-3xl md:max-w-none">
        <Card tone="emphasis" className="border-t border-stone-200/80 p-4 shadow-2xl md:border md:p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="type-overline text-text-muted">
              Regiao selecionada
            </p>
            <h3 className="type-title mt-1 text-text-primary">
              {bodyPartLabels[selectedPart] || selectedPart}
            </h3>
          </div>
          <IconButton
            onClick={onClose}
            aria-label="Fechar painel da regiao"
          >
            <X className="h-4 w-4" />
          </IconButton>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(sensationConfig) as SensationType[]).map((type) => {
            const config = sensationConfig[type];
            const Icon = config.icon;
            const active = tempSensation === type;

            return (
              <button
                key={type}
                onClick={() => onSelectSensation(type)}
                className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-petrol ${
                  active
                    ? 'border-accent-petrol bg-accent-petrol text-white shadow'
                    : 'border-border-soft bg-white text-text-secondary hover:border-border-strong hover:bg-surface-secondary'
                }`}
              >
                <span
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${
                    active ? 'bg-white/15 text-white' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium">{config.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 rounded-2xl border border-border-soft bg-surface-secondary px-4 py-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="type-overline text-text-muted">
              Intensidade
            </span>
            <span className="text-lg font-semibold text-text-primary">{tempIntensity}</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={tempIntensity}
            onChange={(event) => onChangeIntensity(Number(event.target.value) as Severity)}
            className="w-full accent-accent-petrol"
          />
        </div>

        {activeResponse ? (
          <div className="mt-5">
            <GuidedResponseCard response={activeResponse} onClose={onCloseResponse} />
          </div>
        ) : null}

        <div className="mt-5 flex gap-3">
          <Button
            onClick={onClear}
            variant="danger"
            size="md"
            className="flex-1"
          >
            Limpar
          </Button>
          <Button
            onClick={onSave}
            disabled={!tempSensation}
            variant="primary"
            size="md"
            className="flex-[1.4]"
          >
            Salvar regiao
          </Button>
        </div>
        </Card>
      </div>
    </div>
  );
};

export default ScannerInspector;
