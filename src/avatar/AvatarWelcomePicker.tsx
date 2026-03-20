import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Users, ChevronRight, Check, Info } from 'lucide-react';
import { AvatarVariant, SexProfile, AvatarProfile } from './avatarTypes';

interface AvatarWelcomePickerProps {
  onConfirm: (profile: AvatarProfile) => void;
}

const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`relative overflow-hidden bg-white/75 backdrop-blur-[12px] border border-white/40 shadow-[0_40px_80px_rgba(0,0,0,0.05)] rounded-[3rem] ${className}`}>
    <div className="absolute top-0 left-0 right-0 h-px bg-white/60 opacity-80" />
    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
    <div className="relative z-10 h-full">{children}</div>
  </div>
);

const AvatarWelcomePicker: React.FC<AvatarWelcomePickerProps> = ({ onConfirm }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [variant, setVariant] = useState<AvatarVariant>('man');
  const [profile, setProfile] = useState<SexProfile>('unknown');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-[#F5F5F3]/80 backdrop-blur-2xl">
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-4xl"
          >
            <GlassCard className="p-16 lg:p-24">
              <div className="text-center mb-16">
                <span className="text-[10px] font-bold tracking-[0.4em] text-[#A8A8A8] uppercase mb-4 block">IDENTIDADE VISUAL</span>
                <h2 className="text-7xl font-serif font-medium text-[#1F1F1F] tracking-tight mb-6">Escolha seu <br /><span className="italic text-[#A8A8A8] font-light">Avatar.</span></h2>
                <p className="text-[#6B6B6B] text-sm font-light max-w-md mx-auto">Selecione a representação visual que melhor harmoniza com sua experiência para este mapeamento.</p>
              </div>

              <div className="grid grid-cols-2 gap-10 mb-16">
                {(['man', 'woman'] as AvatarVariant[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`
                      relative group p-12 rounded-[2.5rem] border transition-all duration-500 flex flex-col items-center gap-8
                      ${variant === v 
                        ? 'bg-[#1F1F1F] border-[#1F1F1F] text-white shadow-2xl scale-105' 
                        : 'bg-white border-stone-100 text-[#6B6B6B] hover:border-stone-200'}
                    `}
                  >
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-colors ${variant === v ? 'bg-white/10 text-white' : 'bg-stone-50 text-[#A8A8A8]'}`}>
                      <User className="w-10 h-10" />
                    </div>
                    <span className="text-[12px] font-bold uppercase tracking-[0.3em] font-sans">
                      {v === 'man' ? 'Masculino' : 'Feminino'}
                    </span>
                    {variant === v && (
                      <motion.div layoutId="check" className="absolute top-6 right-6 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full h-24 bg-[#1F1F1F] text-white rounded-full font-bold tracking-[0.4em] text-[12px] flex items-center justify-center gap-6 shadow-xl hover:scale-[1.02] transition-all"
              >
                PROXÍMA ETAPA <ChevronRight className="w-5 h-5" />
              </button>
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-4xl"
          >
            <GlassCard className="p-16 lg:p-24">
              <div className="text-center mb-16">
                <span className="text-[10px] font-bold tracking-[0.4em] text-[#A8A8A8] uppercase mb-4 block">MODELO BIOLÓGICO</span>
                <h2 className="text-7xl font-serif font-medium text-[#1F1F1F] tracking-tight mb-6">Fisiologia & <br /><span className="italic text-[#A8A8A8] font-light">Contexto.</span></h2>
                <p className="text-[#6B6B6B] text-sm font-light max-w-md mx-auto">Esta informação auxilia o motor de inteligência a calibrar os pesos das hipóteses diagnósticas.</p>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-16">
                {(['male', 'female', 'unknown'] as SexProfile[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setProfile(p)}
                    className={`
                      relative group p-10 rounded-[2rem] border transition-all duration-500 flex flex-col items-center gap-6
                      ${profile === p 
                        ? 'bg-[#1F1F1F] border-[#1F1F1F] text-white shadow-2xl scale-105' 
                        : 'bg-white border-stone-100 text-[#6B6B6B] hover:border-stone-200'}
                    `}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] font-sans text-center">
                      {p === 'male' ? 'Masculino' : p === 'female' ? 'Feminino' : 'Indiferente'}
                    </span>
                    {profile === p && (
                      <motion.div layoutId="check2" className="absolute top-4 right-4 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>

              <div className="bg-stone-50/50 p-8 rounded-3xl border border-stone-100 mb-12 flex gap-6">
                <Info className="w-6 h-6 text-[#A8A8A8] shrink-0" />
                <p className="text-[11px] text-[#A8A8A8] leading-relaxed">
                  Esta seleção altera apenas as probabilidades estatísticas internas (ex: ciclo menstrual, padrões hormonais). O mapa anatômico permanece universal.
                </p>
              </div>

              <div className="flex gap-6">
                <button 
                  onClick={() => setStep(1)}
                  className="h-24 px-12 border border-stone-200 text-[#A8A8A8] rounded-full font-bold tracking-[0.3em] text-[10px] hover:bg-stone-50 transition-all uppercase"
                >
                  Voltar
                </button>
                <button 
                  onClick={() => onConfirm({ avatarVariant: variant, sexProfile: profile })}
                  className="flex-1 h-24 bg-[#1F1F1F] text-white rounded-full font-bold tracking-[0.4em] text-[12px] shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-6"
                >
                  CONFIRMAR PERFIL <Check className="w-5 h-5" />
                </button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvatarWelcomePicker;
