import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Scanner from './components/Scanner';
import Results from './components/Results';
import { AppState, ScanInput } from './types';
import { Fingerprint, ArrowRight, Sparkles, MoveRight } from 'lucide-react';
import { AvatarProfile } from './src/avatar/avatarTypes';
import BackgroundBlobs from './src/components/BackgroundBlobs';
import AvatarWelcomePicker from './src/avatar/AvatarWelcomePicker';
// Avatar preloading no longer needed for SVG system

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState | 'picker'>('intro');
  const [avatarProfile, setAvatarProfile] = useState<AvatarProfile | null>(null);
  const [scanInput, setScanInput] = useState<ScanInput>({ 
    bodyData: {}, 
    contextTags: [] 
  });

  const handleStart = () => setAppState('picker');
  
  const handlePickerConfirm = (profile: AvatarProfile) => {
    setAvatarProfile(profile);
    setAppState('scanning');
  };

  const handleScanComplete = (input: ScanInput) => {
    setScanInput({
      ...input,
      sexProfile: avatarProfile?.sexProfile,
      avatarVariant: avatarProfile?.avatarVariant
    });
    setAppState('results');
  };

  const handleRestart = () => {
    setScanInput({ bodyData: {}, contextTags: [] });
    setAvatarProfile(null);
    setAppState('intro');
  };

  return (
    <div className="h-screen w-full bg-[#fdfbf7] flex flex-col overflow-hidden relative selection:bg-[#4F6F54]/20 selection:text-white">
      
      {/* 1. ULTRA-PREMIUM SENSORY BACKGROUND */}
      <BackgroundBlobs />

      {/* 2. PERMANENT LOGO (EDITORIAL) */}
      <header className="absolute top-0 w-full p-16 flex justify-between items-center z-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-6"
        >
          <div className="w-14 h-14 bg-white/60 backdrop-blur-xl p-4 rounded-2xl border border-white/40 shadow-sm flex items-center justify-center">
            <Fingerprint className="w-7 h-7 text-[#1F1F1F]" />
          </div>
          <div>
            <h1 className="font-serif italic text-4xl tracking-tight text-[#1F1F1F] leading-none">SomaScan</h1>
            <span className="text-[10px] font-bold tracking-[0.4em] text-[#A8A8A8] uppercase mt-1.5 block">Deep Somatic Intelligence</span>
          </div>
        </motion.div>
      </header>

      {/* 3. MAIN TRANSITION STAGE */}
      <main className="flex-1 relative z-10 h-full">
        <AnimatePresence mode="wait">
          {appState === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
              className="h-full flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="max-w-6xl space-y-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <span className="inline-flex items-center gap-3 px-8 py-2.5 bg-white/60 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold tracking-[0.4em] text-[#A8A8A8] uppercase">
                    Reflexos &middot; Versão 3.0
                  </span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 1.2, ease: "circOut" }}
                  className="text-[10rem] md:text-[14rem] font-serif font-medium text-[#1F1F1F] tracking-[-0.04em] leading-[0.8] mb-12"
                >
                  Pura <br /> <span className="text-[#A8A8A8] italic font-light">Percepção.</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 1.2 }}
                  className="text-3xl text-[#6B6B6B] font-light leading-relaxed max-w-3xl mx-auto font-serif italic"
                >
                  Escute o que o corpo diz sob a superfície do silêncio. Um mapeamento tátil, visual e profundamente privado.
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 1.2 }}
                  className="pt-16"
                >
                  <button 
                    onClick={handleStart}
                    className="group relative h-28 px-24 bg-[#1F1F1F] text-[#F5F5F3] rounded-full font-bold tracking-[0.4em] text-[12px] shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-all hover:shadow-[0_40px_80px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95 flex items-center justify-center gap-6"
                  >
                    <span>COMEÇAR VIAGEM</span>
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <MoveRight className="w-5 h-5" />
                    </div>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {appState === 'picker' && (
            <motion.div 
              key="picker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full items-center justify-center flex"
            >
              <AvatarWelcomePicker onConfirm={handlePickerConfirm} />
            </motion.div>
          )}

          {appState === 'scanning' && (
            <motion.div 
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <Scanner 
                onComplete={handleScanComplete} 
                profile={avatarProfile!}
                onBack={handleRestart}
              />
            </motion.div>
          )}

          {appState === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full"
            >
              <Results data={scanInput} onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;