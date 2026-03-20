import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Pulse {
  id: string;
  x: number;
  y: number;
}

interface FXProps {
  pulses: Pulse[];
  onPulseComplete: (id: string) => void;
  selectedPart: string | null;
}

export const AvatarFX: React.FC<FXProps> = ({ pulses, onPulseComplete, selectedPart }) => {
  return (
    <g style={{ pointerEvents: 'none' }}>
      {/* 1. GLASS OVERLAY LAYER */}
      <defs>
        <radialGradient id="glass-shine" cx="30%" cy="25%" r="80%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        
        <filter id="soft-glow">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 2. SENSORY LIGHTING */}
      <ellipse cx="180" cy="400" rx="160" ry="400" fill="url(#glass-shine)" opacity={0.6} />

      {/* 3. CLICK ENERGY PULSES */}
      <AnimatePresence>
        {pulses.map(p => (
          <motion.circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            initial={{ r: 0, opacity: 0.6, strokeWidth: 4 }}
            animate={{ r: 120, opacity: 0, strokeWidth: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onAnimationComplete={() => onPulseComplete(p.id)}
            fill="none"
            stroke="white"
          />
        ))}
      </AnimatePresence>

      {/* 4. SELECTION FEEDBACK */}
      {selectedPart && (
        <motion.circle
          initial={{ r: 0, opacity: 0 }}
          animate={{ r: [40, 60, 40], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          cx="180"
          cy="400" // This should ideally follow the selected part, but for now a global presence
          fill="white"
          style={{ filter: 'blur(40px)' }}
        />
      )}
    </g>
  );
};
