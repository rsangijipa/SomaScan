import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AvatarRegionAnchor } from './AvatarSvg';

interface Pulse {
  id: string;
  x: number;
  y: number;
}

interface FXProps {
  pulses: Pulse[];
  onPulseComplete: (id: string) => void;
  selectedAnchor: AvatarRegionAnchor | null;
}

export const AvatarFX: React.FC<FXProps> = ({ pulses, onPulseComplete, selectedAnchor }) => {
  return (
    <g style={{ pointerEvents: 'none' }}>
      <defs>
        <radialGradient id="glass-shine" cx="28%" cy="22%" r="82%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.34)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id="soft-glow">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <ellipse cx="180" cy="400" rx="158" ry="392" fill="url(#glass-shine)" opacity={0.52} />

      <AnimatePresence>
        {pulses.map(p => (
          <motion.circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            initial={{ r: 0, opacity: 0.58, strokeWidth: 4 }}
            animate={{ r: 86, opacity: 0, strokeWidth: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            onAnimationComplete={() => onPulseComplete(p.id)}
            fill="none"
            stroke="rgba(45,79,94,0.45)"
          />
        ))}
      </AnimatePresence>

      {selectedAnchor ? (
        <>
          <motion.ellipse
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.2, 0.1], rx: [selectedAnchor.rx * 0.9, selectedAnchor.rx * 1.1, selectedAnchor.rx * 0.9], ry: [selectedAnchor.ry * 0.9, selectedAnchor.ry * 1.1, selectedAnchor.ry * 0.9] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            cx={selectedAnchor.x}
            cy={selectedAnchor.y}
            rx={selectedAnchor.rx}
            ry={selectedAnchor.ry}
            transform={selectedAnchor.rotation ? `rotate(${selectedAnchor.rotation} ${selectedAnchor.x} ${selectedAnchor.y})` : undefined}
            fill="rgba(45,79,94,0.16)"
            style={{ filter: 'blur(10px)' }}
          />
          <motion.circle
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            cx={selectedAnchor.x}
            cy={selectedAnchor.y}
            r={8}
            fill="rgba(45,79,94,0.55)"
            style={{ filter: 'blur(2px)' }}
          />
        </>
      ) : null}
    </g>
  );
};
