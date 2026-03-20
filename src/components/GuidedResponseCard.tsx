import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Activity, Layers, Anchor, X, Play } from 'lucide-react';
import { GuidedResponse, InterventionType } from '../types';

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
      <div className="relative overflow-hidden backdrop-blur-2xl bg-white/70 border border-white/50 rounded-[2.5rem] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.05)]">
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
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-graphite-light">Sugestão para o seu corpo</h4>
                <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-graphite-dark/60">{config.label} &bull; {response.duration}s</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-graphite-light hover:text-graphite-dark transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-3xl font-serif text-graphite-dark mb-10 leading-snug italic">
            "{response.message}"
          </h3>

          <div className="flex items-center justify-between mt-6">
            <button 
              onClick={onClose}
              className="flex items-center gap-3 px-8 py-4 bg-graphite-dark text-white rounded-full text-[10px] font-bold tracking-[0.2em] uppercase shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-3 h-3 fill-current" /> Começar Agora
            </button>
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
      </div>
    </motion.div>
  );
};

export default GuidedResponseCard;
