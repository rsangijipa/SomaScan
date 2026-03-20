import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BodyPartId } from '../../types';

interface AvatarSvgProps {
  side: 'front' | 'back';
  children: (id: BodyPartId, paths: React.ReactNode) => React.ReactNode;
}

export const AvatarSvg: React.FC<AvatarSvgProps> = ({ side, children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.g
        key={side}
        initial={{ opacity: 0, x: side === 'front' ? -10 : 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: side === 'front' ? 10 : -10 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Ground Shadow */}
        <ellipse cx="180" cy="850" rx="120" ry="15" fill="rgba(31,31,31,0.03)" />

        <defs>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FDFBF7" />
          </linearGradient>
          <filter id="softGlow">
             <feGaussianBlur stdDeviation="2" result="blur" />
             <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* CABEÇA */}
        {children('head', <path d="M140 90 C140 40, 220 40, 220 90 C220 130, 180 150, 180 150 C180 150, 140 130, 140 90 Z" />)}

        {/* PESCOÇO */}
        {children('neck', <path d="M165 145 C165 145, 180 155, 195 145 L195 175 C195 175, 180 185, 165 175 Z" />)}

        {/* TRONCO */}
        {side === 'front' ? (
          <>
            {children('chest', <path d="M115 185 C140 165, 220 165, 245 185 L260 280 C260 280, 180 310, 100 280 Z" />)}
            {children('abdomen', <path d="M100 280 C135 310, 225 310, 260 280 L255 370 C255 370, 180 405, 105 370 Z" />)}
            {children('pelvis', <path d="M105 370 C135 405, 225 405, 255 370 L265 440 C220 470, 140 470, 95 440 Z" />)}
          </>
        ) : (
          <>
            {children('chest', <path d="M115 185 C140 165, 220 165, 245 185 L260 280 C225 300, 135 300, 100 280 Z" />)}
            {children('abdomen', <path d="M100 280 C135 300, 225 300, 260 280 L255 370 C225 395, 135 395, 105 370 Z" />)}
            {children('pelvis', <path d="M105 370 C135 395, 225 395, 255 370 L265 450 C220 480, 140 480, 95 450 Z" />)}
          </>
        )}

        {/* BRAÇOS - Organic Curves */}
        {children('rightArm', <path d="M65 190 Q50 280 65 370 L100 370 Q85 280 100 190 Z" transform={`rotate(${side === 'front' ? -2 : 2} 82 190)`} />)}
        {children('leftArm', <path d="M260 190 Q275 280 260 370 L295 370 Q310 280 295 190 Z" transform={`rotate(${side === 'front' ? 2 : -2} 278 190)`} />)}
        
        {/* MÃOS */}
        {children('rightHand', <path d="M55 375 Q45 405 65 435 Q85 435 95 405 Q105 375 55 375 Z" transform={`rotate(${side === 'front' ? -5 : 5} 75 375)`} />)}
        {children('leftHand', <path d="M265 375 Q255 405 295 435 Q315 435 305 405 Q295 375 265 375 Z" transform={`rotate(${side === 'front' ? 5 : -5} 285 375)`} />)}

        {/* PERNAS - Organic Curves */}
        {children('rightThigh', <path d="M105 450 Q90 550 110 650 L160 650 Q165 550 155 450 Z" />)}
        {children('leftThigh', <path d="M205 450 Q195 550 200 650 L250 650 Q270 550 255 450 Z" />)}
        
        {children('rightLeg', <path d="M110 655 Q105 750 115 840 L155 840 Q165 750 160 655 Z" />)}
        {children('leftLeg', <path d="M200 655 Q195 750 205 840 L245 840 Q255 750 250 655 Z" />)}

        {/* PÉS */}
        {children('rightFoot', <path d="M105 845 Q95 875 140 875 Q165 875 155 845 Z" />)}
        {children('leftFoot', <path d="M205 845 Q195 875 255 875 Q265 875 255 845 Z" />)}
      </motion.g>
    </AnimatePresence>
  );
};
