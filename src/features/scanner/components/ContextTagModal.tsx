import React from 'react';
import { Check, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import IconButton from '@/components/ui/IconButton';
import SectionHeader from '@/components/ui/SectionHeader';
import { ContextTag } from '@/types';
import { contextTagLabels } from '../config';

interface ContextTagModalProps {
  contextTags: ContextTag[];
  onToggle: (tag: ContextTag) => void;
  onClose: () => void;
}

const ContextTagModal: React.FC<ContextTagModalProps> = ({ contextTags, onToggle, onClose }) => {
  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-stone-950/30 p-4 backdrop-blur-sm sm:items-center">
      <Card tone="emphasis" className="w-full max-w-3xl p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <SectionHeader
            overline="Contexto opcional"
            title="O que pode estar influenciando seu corpo hoje?"
            description="Esses marcadores ajudam a interpretar o mapa com mais contexto, sem alterar o fluxo do scan."
          />
          <IconButton
            onClick={onClose}
            aria-label="Fechar contexto"
          >
            <X className="h-4 w-4" />
          </IconButton>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(Object.keys(contextTagLabels) as ContextTag[]).map((tag) => {
            const active = contextTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => onToggle(tag)}
                className={`flex items-center justify-between rounded-2xl border px-4 py-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-petrol ${
                  active
                    ? 'border-accent-petrol bg-accent-petrol text-white'
                    : 'border-border-soft bg-surface-secondary text-text-primary hover:border-border-strong hover:bg-white'
                }`}
              >
                <span className="text-sm font-medium">{contextTagLabels[tag]}</span>
                {active ? <Check className="h-4 w-4" /> : null}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={onClose}
            variant="primary"
          >
            Aplicar contexto
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ContextTagModal;
