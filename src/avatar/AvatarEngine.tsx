import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BodyData, BodyPartId } from '../../types';
import { AvatarSvg } from './AvatarSvg';
import { AvatarHeatmap } from './AvatarHeatmap';
import { AvatarFX } from './AvatarFX';
import { useAvatarState } from './useAvatarState';
import { LucideRotateCw } from 'lucide-react';

interface Props {
  data: BodyData;
  selectedPart: BodyPartId | null;
  onSelectPart: (part: BodyPartId) => void;
  overrideSide?: 'front' | 'back';
}

const AvatarEngine: React.FC<Props> = ({ data, selectedPart, onSelectPart, overrideSide }) => {
  const {
    side: internalSide,
    toggleSide,
    hoveredPart,
    pulses,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    clearPulse
  } = useAvatarState(selectedPart, onSelectPart);

  const side = overrideSide || internalSide;

  // Living Body Transitions
  const variants = {
    breath: {
      scaleY: [1, 1.008, 1],
      transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
    },
    sway: {
      rotate: [-0.1, 0.1, -0.1],
      y: [-0.5, 0.5, -0.5],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="w-full h-full relative group/engine flex flex-col items-center justify-center">
      
      {/* 2. THE STAGE */}
      <div className="relative w-full h-full flex items-center justify-center cursor-crosshair">
        <motion.svg
          viewBox="0 0 360 860"
          className="w-full h-full max-h-[85vh] drop-shadow-[0_40px_100px_rgba(0,0,0,0.06)]"
          style={{ transformOrigin: 'center bottom' }}
          animate={variants.breath.scaleY ? "breath" : ""}
          variants={variants}
        >
          {/* BACKGROUND SYSTEM */}
          <defs>
            <linearGradient id="body-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#FDFBF7" />
              <stop offset="100%" stopColor="#E0E7E9" />
            </linearGradient>

            <filter id="premium-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <clipPath id="body-mask">
               <AvatarSvg side={side}>
                  {(id, paths) => <g key={id}>{paths}</g>}
               </AvatarSvg>
            </clipPath>
          </defs>

          {/* LAYER 1: THE BODY SHAPES */}
          <motion.g animate="sway" variants={variants}>
            <AvatarSvg side={side}>
              {(id, paths) => {
                const isSelected = selectedPart === id;
                const isHovered = hoveredPart === id;
                
                return (
                  <motion.g
                    key={id}
                    id={id}
                    onMouseEnter={() => handleMouseEnter(id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={(e) => handleClick(id, e)}
                    style={{ cursor: 'pointer', transformOrigin: 'center center' }}
                    animate={{
                      scale: isSelected ? 1.015 : isHovered ? 1.005 : 1,
                      filter: isSelected ? 'url(#premium-glow)' : 'none',
                    }}
                  >
                    <g fill={isSelected ? "var(--accent)" : "url(#body-gradient)"} stroke={isSelected ? "var(--accent)" : "#E0E7E9"} strokeWidth={isSelected ? 1.4 : 0.8}>
                      {paths}
                    </g>
                    
                    {/* Inner highlight on hover */}
                    {isHovered && !isSelected && (
                      <g fill="white" opacity={0.3} style={{ mixBlendMode: 'overlay' }}>
                        {paths}
                      </g>
                    )}
                  </motion.g>
                );
              }}
            </AvatarSvg>
          </motion.g>

          {/* LAYER 2: THE HEATMAP (CLIPPED) */}
          <g clipPath="url(#body-mask)">
            <AvatarHeatmap data={data} side={side} />
          </g>

          {/* LAYER 3: VFX & OVERLAYS */}
          <AvatarFX 
            pulses={pulses} 
            onPulseComplete={clearPulse} 
            selectedPart={selectedPart} 
          />
        </motion.svg>
      </div>

      {/* 4. LABEL FLUTUANTE (SELECTED) - Mantido mas estilizado */}
      <AnimatePresence>
        {selectedPart && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-12 left-1/2 -translate-x-1/2 px-8 py-3 bg-[#2D4F5E] text-white rounded-2xl text-[12px] font-serif italic tracking-widest shadow-2xl z-50 pointer-events-none uppercase"
          >
            {selectedPart}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvatarEngine;
