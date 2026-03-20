import React from 'react';
import { motion } from 'framer-motion';

const blobs = [
  { color: '#F6DDE2', size: '600px', top: '-10%', left: '-10%', duration: 22 },
  { color: '#F8E3D4', size: '500px', top: '20%', right: '-5%', duration: 18 },
  { color: '#E8E2F6', size: '700px', bottom: '-15%', left: '10%', duration: 28 },
  { color: '#DDEAF7', size: '550px', top: '40%', left: '-15%', duration: 20 },
  { color: '#E4EFE7', size: '450px', bottom: '10%', right: '5%', duration: 24 }
];

const BackgroundBlobs: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-transparent">
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-[100px] opacity-[0.25]"
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
      
      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.1) 100%)" />
      
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
