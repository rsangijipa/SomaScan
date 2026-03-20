import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import IconButton from '@/components/ui/IconButton';
import ProgressBar from '@/components/ui/ProgressBar';

interface ScannerTopBarProps {
  completedCount: number;
  canContinue: boolean;
  onBack: () => void;
  onContinue: () => void;
}

const ScannerTopBar: React.FC<ScannerTopBarProps> = ({
  completedCount,
  canContinue,
  onBack,
  onContinue,
}) => {
  return (
    <header className="border-b border-stone-200/70 bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <IconButton
            onClick={onBack}
            aria-label="Voltar para a etapa anterior"
          >
            <ArrowLeft className="h-5 w-5" />
          </IconButton>

          <div>
            <p className="type-overline text-text-muted">
              Etapa 3 de 4
            </p>
            <h1 className="type-section mt-1">
              Mapeamento corporal
            </h1>
          </div>
        </div>

        <div className="hidden min-w-[220px] flex-1 md:block">
          <div className="mb-2 flex items-center justify-between text-[11px] font-medium text-text-secondary">
            <span>Progresso</span>
            <span>{completedCount} regioes registradas</span>
          </div>
          <ProgressBar value={Math.min(100, Math.max(12, completedCount * 12))} />
        </div>

        <Button
          onClick={onContinue}
          disabled={!canContinue}
          variant="primary"
          size="md"
        >
          <CheckCircle2 className="h-4 w-4" />
          Continuar
        </Button>
      </div>
    </header>
  );
};

export default ScannerTopBar;
