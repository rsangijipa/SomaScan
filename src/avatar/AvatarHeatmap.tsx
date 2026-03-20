import React from 'react';
import { BodyData, BodyPartId } from '@/types';
import { AVATAR_REGION_ANCHORS } from './AvatarSvg';

interface HeatmapProps {
  data: BodyData;
  side: 'front' | 'back';
}

const colors = {
  low: 'rgba(109, 168, 194, 0.28)',
  medium: 'rgba(232, 176, 87, 0.38)',
  high: 'rgba(209, 105, 97, 0.48)',
};

const getIntensityColor = (intensity?: number) => {
  if (!intensity) return 'transparent';
  if (intensity <= 1) return colors.low;
  if (intensity <= 3) return colors.medium;
  return colors.high;
};

export const AvatarHeatmap: React.FC<HeatmapProps> = ({ data, side }) => {
  return (
    <g style={{ mixBlendMode: 'multiply', pointerEvents: 'none' }}>
      <defs>
        {(Object.keys(data) as BodyPartId[]).map(id => {
          const log = data[id];
          if (!log) return null;
          const center = AVATAR_REGION_ANCHORS[id][side];
          return (
            <radialGradient key={`heat-grad-${id}`} id={`heat-grad-${id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={getIntensityColor(log.intensity)} stopOpacity="0.95" />
              <stop offset="50%" stopColor={getIntensityColor(log.intensity)} stopOpacity="0.45" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          );
        })}
      </defs>

      {(Object.keys(data) as BodyPartId[]).map(id => {
        const log = data[id];
        if (!log) return null;
        const center = AVATAR_REGION_ANCHORS[id][side];
        const spread = 0.9 + log.intensity * 0.12;
        return (
          <ellipse
            key={`heat-point-${id}`}
            cx={center.x}
            cy={center.y}
            rx={center.rx * spread}
            ry={center.ry * spread}
            fill={`url(#heat-grad-${id})`}
            transform={center.rotation ? `rotate(${center.rotation} ${center.x} ${center.y})` : undefined}
            style={{ filter: `blur(${6 + log.intensity * 2}px)`, opacity: 0.9 }}
          />
        );
      })}
    </g>
  );
};
