import React from 'react';
import { Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';

const ResultsLoading: React.FC = () => {
  return (
    <Card tone="emphasis" className="flex min-h-[360px] flex-col items-center justify-center gap-6 px-6 py-10 text-center">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
          className="h-16 w-16 rounded-full border-2 border-stone-200 border-t-accent-petrol"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Fingerprint className="h-6 w-6 text-stone-400" />
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold text-text-primary">Processando seu mapeamento</p>
        <p className="mt-2 text-sm text-text-secondary">Organizando sinais, contexto e padroes locais.</p>
      </div>
    </Card>
  );
};

export default ResultsLoading;
