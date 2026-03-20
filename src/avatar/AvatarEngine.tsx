import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BodyData, BodyPartId } from '@/types';
import { getBodyPartLabel } from '@/body/bodyRegionMeta';
import { AvatarRegionShape, AvatarSvg } from './AvatarSvg';
import { AvatarHeatmap } from './AvatarHeatmap';
import { AvatarFX } from './AvatarFX';
import { useAvatarState } from './useAvatarState';

interface Props {
  data: BodyData;
  selectedPart: BodyPartId | null;
  onSelectPart: (part: BodyPartId) => void;
  overrideSide?: 'front' | 'back';
}

const AvatarEngine: React.FC<Props> = ({ data, selectedPart, onSelectPart, overrideSide }) => {
  const {
    side: internalSide,
    hoveredPart,
    pulses,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    clearPulse
  } = useAvatarState(selectedPart, onSelectPart);

  const side = overrideSide || internalSide;

  const variants = {
    breath: {
      scaleY: [1, 1.006, 1],
      transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
    },
    sway: {
      rotate: [-0.12, 0.12, -0.12],
      y: [-0.8, 0.8, -0.8],
      transition: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  const resolveSelectedAnchor = (region: AvatarRegionShape) =>
    selectedPart === region.id ? region.anchor : null;

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center group/engine">
      <div className="relative flex h-full w-full items-center justify-center cursor-crosshair">
        <motion.svg
          viewBox="0 0 360 860"
          className="h-full w-full max-h-[85vh] drop-shadow-[0_32px_72px_rgba(25,31,40,0.12)]"
          style={{ transformOrigin: 'center bottom' }}
          animate="breath"
          variants={variants}
        >
          <defs>
            <linearGradient id="body-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="44%" stopColor="#FBF8F2" />
              <stop offset="100%" stopColor="#E6E3DB" />
            </linearGradient>

            <filter id="premium-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="14" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <clipPath id="body-mask">
              <AvatarSvg side={side}>
                {(region) => <path key={region.id} d={region.path} />}
              </AvatarSvg>
            </clipPath>
          </defs>

          <motion.g animate="sway" variants={variants}>
            <AvatarSvg side={side}>
              {(region) => {
                const isSelected = selectedPart === region.id;
                const isHovered = hoveredPart === region.id;
                
                return (
                  <g key={region.id} id={region.id}>
                    <motion.path
                      d={region.path}
                      fill={isSelected ? 'rgba(45,79,94,0.18)' : isHovered ? 'rgba(45,79,94,0.1)' : 'url(#body-gradient)'}
                      stroke={isSelected ? '#2D4F5E' : isHovered ? '#6B8792' : '#DDD9CF'}
                      strokeWidth={isSelected ? 1.8 : isHovered ? 1.4 : 1}
                      style={{ transformOrigin: 'center center' }}
                      animate={{
                        scale: isSelected ? 1.012 : isHovered ? 1.004 : 1,
                        filter: isSelected ? 'url(#premium-glow)' : 'none',
                      }}
                    />
                    <path
                      d={region.hitPath || region.path}
                      fill="rgba(0,0,0,0.001)"
                      onMouseEnter={() => handleMouseEnter(region.id)}
                      onMouseLeave={handleMouseLeave}
                      onClick={(event) => handleClick(region.id, event)}
                      style={{ cursor: 'pointer' }}
                    />
                    {isHovered && !isSelected ? (
                      <path d={region.path} fill="rgba(255,255,255,0.22)" stroke="none" />
                    ) : null}
                  </g>
                );
              }}
            </AvatarSvg>
          </motion.g>

          <g clipPath="url(#body-mask)">
            <AvatarHeatmap data={data} side={side} />
          </g>

          <AvatarSvg side={side}>
            {(region) =>
              selectedPart === region.id ? (
                <AvatarFX
                  key={`fx-${region.id}`}
                  pulses={pulses}
                  onPulseComplete={clearPulse}
                  selectedAnchor={resolveSelectedAnchor(region)}
                />
              ) : null
            }
          </AvatarSvg>
          {!selectedPart ? (
            <AvatarFX pulses={pulses} onPulseComplete={clearPulse} selectedAnchor={null} />
          ) : null}
        </motion.svg>
      </div>

      <AnimatePresence>
        {selectedPart && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="pointer-events-none absolute top-10 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/80 bg-stone-900/88 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white shadow-xl backdrop-blur-sm"
          >
            {getBodyPartLabel(selectedPart)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvatarEngine;
