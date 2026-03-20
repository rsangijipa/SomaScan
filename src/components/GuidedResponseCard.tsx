import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Activity, Layers, Anchor, X, Play } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import IconButton from '@/components/ui/IconButton';
import { GuidedResponse, InterventionType } from '@/types';

interface GuidedResponseCardProps {
  response: GuidedResponse;
  onClose: () => void;
}

const interventionConfig: Record<InterventionType, { icon: any; color: string; label: string }> = {
  breathing: { icon: Wind, color: 'bg-azul-nevoa', label: 'Respiração' },
  relaxation: { icon: Activity, color: 'bg-rosa-nevoa', label: 'Relaxamento' },
  stretch: { icon: Layers, color: 'bg-pessego-claro', label: 'Alongamento' },
  somatic: { icon: Anchor, color: 'bg-lavanda-fumaca', label: 'Somático' }
};

const GuidedResponseCard: React.FC<GuidedResponseCardProps> = ({ response, onClose }) => {
  const config = interventionConfig[response.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 20, opacity: 0, scale: 0.95 }}
      className="w-full"
    >
      <Card tone="emphasis" className="relative overflow-hidden p-6">
        {/* Animated Background Pulse */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-30 ${config.color}`}
        />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${config.color} flex items-center justify-center shadow-sm`}>
                <Icon className="w-6 h-6 text-graphite-dark" />
              </div>
              <div>
                <h4 className="type-overline text-text-muted">Resposta guiada</h4>
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-secondary">{config.label} • {response.duration}s</span>
              </div>
            </div>
            <IconButton
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </IconButton>
          </div>

          <h3 className="mb-6 text-2xl font-serif leading-snug text-text-primary italic">
            "{response.message}"
          </h3>

          <div className="flex items-center justify-between mt-6">
            <Button
              onClick={onClose}
              variant="primary"
              size="md"
            >
              <Play className="w-3 h-3 fill-current" /> Começar Agora
            </Button>
            <div className="flex gap-2">
               {[1, 2, 3].map(i => (
                 <motion.div 
                  key={i}
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-graphite-light/30"
                 />
               ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default GuidedResponseCard;
