import React from 'react';
import { motion } from 'framer-motion';

const blobs = [
  { color: '#F6DDE2', size: '520px', top: '-12%', left: '-12%', duration: 26 },
  { color: '#F8E3D4', size: '420px', top: '16%', right: '-6%', duration: 20 },
  { color: '#E8E2F6', size: '560px', bottom: '-14%', left: '16%', duration: 30 },
  { color: '#DDEAF7', size: '460px', top: '44%', left: '-10%', duration: 24 },
  { color: '#E4EFE7', size: '360px', bottom: '8%', right: '6%', duration: 28 }
];

const BackgroundBlobs: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-transparent">
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-[110px] opacity-[0.17]"
          style={{
            backgroundColor: blob.color,
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            right: blob.right,
            bottom: blob.bottom,
          }}
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -40, 60, 0],
            scale: [1, 1.1, 0.9, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      <div className="absolute inset-0 bg-radial-soft opacity-80" />
      
      {/* Noise Texture (Extremely subtle) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.01] mix-blend-overlay">
        <filter id="sensory-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#sensory-grain)" />
      </svg>
    </div>
  );
};

export default BackgroundBlobs;
