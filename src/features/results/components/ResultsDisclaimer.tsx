import React from 'react';
import Card from '@/components/ui/Card';

interface ResultsDisclaimerProps {
  shouldSeekCare: boolean;
}

const ResultsDisclaimer: React.FC<ResultsDisclaimerProps> = ({ shouldSeekCare }) => {
  return (
    <Card tone="subtle" className="px-5 py-4 text-sm leading-6 text-text-secondary">
      Esta ferramenta apoia observacao somatica e nao substitui avaliacao medica profissional.
      {shouldSeekCare ? ' Pelos sinais encontrados, vale buscar avaliacao especializada.' : ''}
    </Card>
  );
};

export default ResultsDisclaimer;
