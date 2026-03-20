import React, { useState, useCallback } from 'react';
import { BodyPartId } from '../../types';

export type BodySide = 'front' | 'back';

interface PulseEvent {
  id: string;
  x: number;
  y: number;
  time: number;
}

export const useAvatarState = (
  initialSelectedPart: BodyPartId | null,
  onSelectPart: (part: BodyPartId) => void
) => {
  const [side, setSide] = useState<BodySide>('front');
  const [hoveredPart, setHoveredPart] = useState<BodyPartId | null>(null);
  const [pulses, setPulses] = useState<PulseEvent[]>([]);

  const toggleSide = useCallback(() => {
    setSide(prev => prev === 'front' ? 'back' : 'front');
  }, []);

  const handleMouseEnter = useCallback((part: BodyPartId) => {
    setHoveredPart(part);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredPart(null);
  }, []);

  const handleClick = useCallback((part: BodyPartId, e: React.MouseEvent<SVGElement>) => {
    const svg = e.currentTarget.ownerSVGElement;
    if (svg) {
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgPoint = pt.matrixTransform(svg.getScreenCTM()?.inverse());
      
      const newPulse: PulseEvent = {
        id: Math.random().toString(36).substr(2, 9),
        x: svgPoint.x,
        y: svgPoint.y,
        time: Date.now()
      };
      
      setPulses(prev => [...prev.slice(-3), newPulse]); // Keep last 4 pulses
    }
    
    onSelectPart(part);
  }, [onSelectPart]);

  const clearPulse = useCallback((id: string) => {
    setPulses(prev => prev.filter(p => p.id !== id));
  }, []);

  return {
    side,
    toggleSide,
    hoveredPart,
    pulses,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    clearPulse
  };
};
