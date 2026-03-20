import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ChevronRight, Check, Info } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { AvatarVariant, SexProfile, AvatarProfile } from './avatarTypes';

interface AvatarWelcomePickerProps {
  initialProfile?: AvatarProfile | null;
  onConfirm: (profile: AvatarProfile) => void;
  onBack: () => void;
}

const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <Card tone="emphasis" className={`relative overflow-hidden rounded-[2rem] ${className}`}>
    <div className="absolute top-0 left-0 right-0 h-px bg-white/60 opacity-80" />
    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
    <div className="relative z-10 h-full">{children}</div>
  </Card>
);

const AvatarWelcomePicker: React.FC<AvatarWelcomePickerProps> = ({ initialProfile, onConfirm, onBack }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [variant, setVariant] = useState<AvatarVariant>(initialProfile?.avatarVariant || 'man');
  const [profile, setProfile] = useState<SexProfile>(initialProfile?.sexProfile || 'unknown');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-[#F5F5F3]/82 backdrop-blur-2xl">
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-4xl"
          >
            <GlassCard className="p-8 sm:p-12 lg:p-20">
              <div className="text-center mb-16">
                <Badge>Identidade visual</Badge>
                <h2 className="type-title mt-5 text-[clamp(2.8rem,7vw,4.6rem)]">Escolha seu <br /><span className="italic text-text-muted font-light">Avatar.</span></h2>
                <p className="type-body mt-6 max-w-md mx-auto text-text-secondary">Selecione a representacao visual que melhor harmoniza com sua experiencia para este mapeamento.</p>
              </div>

              <div className="grid grid-cols-1 gap-6 mb-12 sm:grid-cols-2 sm:gap-8 lg:gap-10 lg:mb-16">
                {(['man', 'woman'] as AvatarVariant[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`
                      relative group p-8 sm:p-10 rounded-[2rem] border transition-all duration-300 flex flex-col items-center gap-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-petrol
                      ${variant === v 
                        ? 'bg-accent-petrol border-accent-petrol text-white shadow-2xl scale-[1.02]' 
                        : 'bg-white border-border-soft text-text-secondary hover:border-border-strong'}
                    `}
                  >
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-colors ${variant === v ? 'bg-white/10 text-white' : 'bg-surface-secondary text-text-muted'}`}>
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

              <div className="flex gap-6">
                <Button
                  onClick={onBack}
                  variant="secondary"
                  size="lg"
                  className="px-6 sm:px-10"
                >
                  Voltar
                </Button>
                <Button 
                  onClick={() => setStep(2)}
                  variant="primary"
                  size="lg"
                  className="flex-1"
                >
                  PROXÍMA ETAPA <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
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
            <GlassCard className="p-8 sm:p-12 lg:p-20">
              <div className="text-center mb-16">
                <Badge>Modelo biologico</Badge>
                <h2 className="type-title mt-5 text-[clamp(2.8rem,7vw,4.6rem)]">Fisiologia & <br /><span className="italic text-text-muted font-light">Contexto.</span></h2>
                <p className="type-body mt-6 max-w-md mx-auto text-text-secondary">Esta informacao ajuda o motor local a calibrar os pesos das hipoteses com mais prudencia.</p>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-12 sm:grid-cols-3 sm:gap-6 sm:mb-16">
                {(['male', 'female', 'unknown'] as SexProfile[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setProfile(p)}
                    className={`
                      relative group min-h-[120px] p-6 sm:p-8 rounded-[2rem] border transition-all duration-300 flex flex-col items-center justify-center gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-petrol
                      ${profile === p 
                        ? 'bg-accent-petrol border-accent-petrol text-white shadow-2xl scale-[1.02]' 
                        : 'bg-white border-border-soft text-text-secondary hover:border-border-strong'}
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

              <div className="bg-surface-secondary p-6 sm:p-8 rounded-3xl border border-border-soft mb-10 sm:mb-12 flex gap-4 sm:gap-6">
                <Info className="w-6 h-6 text-text-muted shrink-0" />
                <p className="type-small text-text-secondary">
                  Esta selecao altera apenas as probabilidades estatisticas internas. O mapa anatomico continua universal.
                </p>
              </div>

              <div className="flex gap-6">
                <Button 
                  onClick={() => setStep(1)}
                  variant="secondary"
                  size="lg"
                  className="px-6 sm:px-10"
                >
                  Voltar
                </Button>
                <Button 
                  onClick={() => onConfirm({ avatarVariant: variant, sexProfile: profile })}
                  variant="primary"
                  size="lg"
                  className="flex-1"
                >
                  CONFIRMAR PERFIL <Check className="w-5 h-5" />
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AvatarWelcomePicker;
