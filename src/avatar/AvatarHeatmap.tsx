import React from 'react';
import { BodyData, BodyPartId } from '../../types';

interface HeatmapProps {
  data: BodyData;
  side: 'front' | 'back';
}

const colors = {
  low: 'rgba(191, 219, 254, 0.4)', // Blue
  medium: 'rgba(253, 230, 138, 0.6)', // Amber
  high: 'rgba(252, 165, 165, 0.8)', // Coral
};

const getIntensityColor = (intensity?: number) => {
  if (!intensity) return 'transparent';
  if (intensity <= 1) return colors.low;
  if (intensity <= 3) return colors.medium;
  return colors.high;
};

// Heat points mapped to center of regions (approximate)
const regionCenters: Record<BodyPartId, { x: number; y: number; r: number }> = {
  head: { x: 180, y: 90, r: 50 },
  neck: { x: 180, y: 150, r: 30 },
  chest: { x: 180, y: 220, r: 80 },
  abdomen: { x: 180, y: 310, r: 70 },
  pelvis: { x: 180, y: 390, r: 60 },
  rightArm: { x: 82, y: 270, r: 50 },
  leftArm: { x: 278, y: 270, r: 50 },
  rightHand: { x: 78, y: 390, r: 35 },
  leftHand: { x: 282, y: 390, r: 35 },
  rightThigh: { x: 135, y: 500, r: 65 },
  leftThigh: { x: 225, y: 500, r: 65 },
  rightLeg: { x: 140, y: 690, r: 55 },
  leftLeg: { x: 220, y: 690, r: 55 },
  rightFoot: { x: 130, y: 805, r: 40 },
  leftFoot: { x: 230, y: 805, r: 40 }
};

export const AvatarHeatmap: React.FC<HeatmapProps> = ({ data, side }) => {
  return (
    <g style={{ mixBlendMode: 'screen', pointerEvents: 'none' }}>
      <defs>
        {(Object.keys(data) as BodyPartId[]).map(id => {
          const log = data[id];
          if (!log) return null;
          const center = regionCenters[id];
          return (
            <radialGradient key={`heat-grad-${id}`} id={`heat-grad-${id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={getIntensityColor(log.intensity)} />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          );
        })}
      </defs>

      {(Object.keys(data) as BodyPartId[]).map(id => {
        const log = data[id];
        if (!log) return null;
        const center = regionCenters[id];
        return (
          <circle
            key={`heat-point-${id}`}
            cx={center.x}
            cy={center.y}
            r={center.r * (log.intensity / 3 + 0.5)}
            fill={`url(#heat-grad-${id})`}
            style={{ filter: 'blur(8px)', opacity: 0.8 }}
          />
        );
      })}
    </g>
  );
};
