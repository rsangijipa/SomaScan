import React from 'react';
import { ArrowLeft, RotateCcw, ScanSearch } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ResultsTopBarProps {
  onEditScan: () => void;
  onRestart: () => void;
  onBackToProfile: () => void;
}

const ResultsTopBar: React.FC<ResultsTopBarProps> = ({ onEditScan, onRestart, onBackToProfile }) => {
  return (
    <header className="border-b border-stone-200/70 bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="type-overline text-text-muted">
            Etapa 4 de 4
          </p>
          <h1 className="type-section mt-1 sm:text-[1.3rem]">
            Resultado do mapeamento
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={onBackToProfile}
            variant="secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao perfil
          </Button>
          <Button
            onClick={onEditScan}
            variant="secondary"
          >
            <ScanSearch className="h-4 w-4" />
            Revisar scan
          </Button>
          <Button
            onClick={onRestart}
            variant="primary"
          >
            <RotateCcw className="h-4 w-4" />
            Novo scan
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ResultsTopBar;
