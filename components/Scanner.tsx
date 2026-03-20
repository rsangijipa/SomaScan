import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, Thermometer, Activity, Anchor, Zap, Minus, X, 
  AlertCircle, Flame, Maximize2, Layers, ChevronRight, 
  Fingerprint, Sparkles, Wind, Droplet, Sun, MoveRight, HelpCircle, ArrowLeft, Trash2, ChevronLeft
} from 'lucide-react';
import AvatarEngine from '../src/avatar/AvatarEngine';
import { AvatarProfile } from '../src/avatar/avatarTypes';
import { BodyData, BodyPartId, SensationType, BodyLog, ScanInput, ContextTag, Severity } from '../types';
import { useGuidedResponse } from '../src/hooks/useGuidedResponse';
import GuidedResponseCard from '../src/components/GuidedResponseCard';

interface ScannerProps {
  onComplete: (data: ScanInput) => void;
  profile: AvatarProfile;
  onBack: () => void;
}

const bodyPartTranslations: Record<string, string> = {
  head: 'Cabeça', neck: 'Pescoço', chest: 'Peito', abdomen: 'Abdômen', pelvis: 'Pelve',
  leftArm: 'Braço Esq.', rightArm: 'Braço Dir.', leftHand: 'Mão Esq.', rightHand: 'Mão Dir.',
  leftThigh: 'Coxa Esq.', rightThigh: 'Coxa Dir.', leftLeg: 'Perna Esq.', rightLeg: 'Perna Dir.',
  leftFoot: 'Pé Esq.', rightFoot: 'Pé Dir.',
};

const contextTagLabels: Record<ContextTag, string> = {
  stress: 'Estresse', anxiety: 'Ansiedade', poor_sleep: 'Sono Ruim', poor_posture: 'Má Postura',
  computer_use: 'Uso de PC', recent_exertion: 'Esforço Físico', after_meal: 'Pós-Refeição',
  sedentary: 'Sedentarismo', repetitive_motion: 'Mov. Repetitivo', injury_recent: 'Lesão Recente',
  breathlessness: 'Falta de Ar', nausea: 'Náusea/Enjoo', sweating: 'Suor Frio', dizziness: 'Tontura',
  radiating_pain: 'Dor Irradiada', fever: 'Febre', weakness: 'Fraqueza', palpitations: 'Palpitações',
};

const sensationConfig: Record<SensationType, { icon: any; label: string; color: string }> = {
  tension: { icon: Activity, label: 'Tensão', color: '#E0F2FE' },
  heat: { icon: Thermometer, label: 'Calor', color: '#FEF3C7' },
  weight: { icon: Anchor, label: 'Peso', color: '#F1F5F9' },
  tingling: { icon: Zap, label: 'Formigar', color: '#FDF2F8' },
  neutral: { icon: Minus, label: 'Neutro', color: '#F8FAFC' },
  numbness: { icon: Minus, label: 'Dormência', color: '#F8FAFC' },
  pain: { icon: AlertCircle, label: 'Dor', color: '#FEE2E2' },
  burning: { icon: Flame, label: 'Queimação', color: '#FFEDD5' },
  pressure: { icon: Maximize2, label: 'Pressão', color: '#F0FDFA' },
  stiffness: { icon: Layers, label: 'Rigidez', color: '#F5F3FF' }
};

const Scanner: React.FC<ScannerProps> = ({ onComplete, profile, onBack }) => {
  const [data, setData] = useState<BodyData>({});
  const [contextTags, setContextTags] = useState<ContextTag[]>([]);
  const [selectedPart, setSelectedPart] = useState<BodyPartId | null>(null);
  const [showContextSelector, setShowContextSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempSensation, setTempSensation] = useState<SensationType | null>(null);
  const [tempIntensity, setTempIntensity] = useState<Severity>(3);
  const [side, setSide] = useState<'front' | 'back'>('front');
  
  const { activeResponse, triggerResponse, clearResponse } = useGuidedResponse();

  useEffect(() => {
    if (selectedPart) {
      clearResponse();
      const existing = data[selectedPart];
      if (existing) {
        setTempSensation(existing.sensation);
        setTempIntensity(existing.intensity);
      } else {
        setTempSensation(null);
        setTempIntensity(3);
      }
    }
  }, [selectedPart, data]);

  const handleSavePart = () => {
    if (!selectedPart || !tempSensation) return;
    triggerResponse(selectedPart, tempIntensity);
    setData(prev => ({
      ...prev,
      [selectedPart]: {
        id: selectedPart, label: bodyPartTranslations[selectedPart] || selectedPart,
        sensation: tempSensation, intensity: tempIntensity
      } as BodyLog
    }));
    setSelectedPart(null);
  };

  const handleClearPart = () => {
    if (!selectedPart) return;
    const newData = { ...data };
    delete newData[selectedPart];
    setData(newData);
    setSelectedPart(null);
  };

  const handleFinalize = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    onComplete({ bodyData: data, contextTags, sexProfile: profile.sexProfile });
  };

  const hasData = Object.keys(data).length > 0;

  return (
    <div className="h-screen w-screen flex flex-col bg-[#FDFBF7] text-[#1F1F1F] overflow-hidden relative font-sans">
      
      {/* 1. FIXED HEADER */}
      <header className="h-24 px-12 lg:px-20 flex items-center justify-between border-b border-stone-100 bg-white/40 backdrop-blur-md z-50">
        <div className="flex items-center gap-8">
          <button onClick={onBack} className="p-3 hover:bg-stone-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-stone-400" />
          </button>
          <div className="hidden lg:block border-l border-stone-100 h-8" />
          <div className="flex items-center gap-4">
             <Fingerprint className="w-6 h-6 text-stone-300" />
             <div className="flex flex-col">
               <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">Passo 1 de 3</span>
               <span className="text-sm font-bold tracking-tight">Mapeamento Somático</span>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="hidden sm:flex items-center gap-2 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-[#1F1F1F] transition-colors">
            <HelpCircle className="w-4 h-4" /> Ajuda
          </button>
          <button 
            onClick={handleFinalize}
            disabled={!hasData}
            className={`px-10 py-3 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase transition-all shadow-sm
              ${hasData ? 'bg-[#2D4F5E] text-white shadow-[#2D4F5E]/20' : 'bg-stone-100 text-stone-300'}`}
          >
            Continuar
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA (3-Zone Grid) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* 2. LEFT COLUMN (Contextual) */}
        <aside className="w-full lg:w-[400px] border-r border-stone-100 p-12 lg:p-16 flex flex-col gap-12 bg-white/20 hide-scrollbar overflow-y-auto">
          <section className="space-y-4">
            <h2 className="text-6xl font-serif text-[#1F1F1F] tracking-tight leading-[0.9]">
              Cartografar <br /><span className="italic text-stone-400 font-light">Sinais.</span>
            </h2>
            <p className="text-[#6B6B6B] text-[13px] leading-relaxed font-light max-w-[280px]">
              Sintonize com as frequências do seu corpo hoje. Toque para registrar sensações.
            </p>
          </section>

          <div className="space-y-6">
            <button 
              onClick={() => setShowContextSelector(true)}
              className="w-full p-6 bg-white border border-stone-100 rounded-[2rem] flex items-center justify-between hover:border-stone-200 transition-all group"
            >
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center text-stone-400 group-hover:bg-[#2D4F5E] group-hover:text-white transition-all">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-[#1F1F1F]">Padrões Ativos</span>
                  <span className="text-[10px] text-stone-400">{contextTags.length} marcadores</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-300" />
            </button>

            {hasData && (
              <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
                <h4 className="text-[10px] font-bold text-stone-300 uppercase tracking-[0.3em] px-2">Registros Locais</h4>
                <div className="grid grid-cols-1 gap-2">
                  {(Object.values(data) as BodyLog[]).map(log => (
                    <div key={log.id} className="bg-white/60 p-4 rounded-3xl border border-stone-100 flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: sensationConfig[log.sensation].color === '#F8FAFC' ? '#2D4F5E' : sensationConfig[log.sensation].color }} />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F1F1F]">{log.label}</span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-medium italic">{sensationConfig[log.sensation].label} &middot; {log.intensity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* 3. CENTER ZONE (The Arena) */}
        <main className="flex-1 relative bg-white/10 flex items-center justify-center p-8 overflow-hidden">
          <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center z-10">
             <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-stone-300">Toque em uma área do corpo</span>
          </div>
          
          <div className="w-full h-full max-w-5xl relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
               <Fingerprint className="w-[600px] h-[600px]" strokeWidth={0.5} />
            </div>
            <AvatarEngine selectedPart={selectedPart} onSelectPart={setSelectedPart} data={data} overrideSide={side} />
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 p-2 bg-white/60 backdrop-blur-xl border border-white/60 rounded-full shadow-lg z-20">
             <button 
                onClick={() => setSide('front')}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${side === 'front' ? 'bg-[#2D4F5E] text-white shadow-lg' : 'text-stone-400 hover:bg-stone-50'}`}
             >
                Frente
             </button>
             <button 
                onClick={() => setSide('back')}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${side === 'back' ? 'bg-[#2D4F5E] text-white shadow-lg' : 'text-stone-400 hover:bg-stone-50'}`}
             >
                Costas
             </button>
          </div>
        </main>

        {/* 4. RIGHT PANEL (Contextual Selection) */}
        <AnimatePresence>
          {selectedPart && (
            <motion.aside
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-[380px] border-l border-stone-100 bg-white/80 backdrop-blur-3xl p-10 flex flex-col z-40 overflow-y-auto no-scrollbar"
            >
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-5xl font-serif text-[#1F1F1F] tracking-tighter">{bodyPartTranslations[selectedPart] || selectedPart}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mt-2">Definir Percepção</p>
                </div>
                <button onClick={() => setSelectedPart(null)} className="p-2 text-stone-300 hover:text-stone-900"><X className="w-5 h-5" /></button>
              </div>

              <div className="space-y-12">
                <div className="grid grid-cols-2 gap-3">
                  {(Object.keys(sensationConfig) as SensationType[]).map(type => {
                    const config = sensationConfig[type];
                    const active = tempSensation === type;
                    return (
                      <button
                        key={type}
                        onClick={() => setTempSensation(type)}
                        className={`p-4 rounded-[1.5rem] border flex flex-col gap-3 transition-all
                          ${active ? 'bg-[#2D4F5E] border-[#2D4F5E] text-white shadow-lg' : 'bg-white border-stone-100 text-[#1F1F1F] hover:border-stone-200'}`}
                      >
                        <config.icon className={`w-5 h-5 ${active ? 'text-white' : 'text-stone-300'}`} />
                        <span className="text-[11px] font-bold uppercase tracking-wider">{config.label}</span>
                      </button>
                    );
                  })}
                </div>

                {tempSensation && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pt-8 border-t border-stone-100">
                    <div className="flex justify-between items-end">
                      <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-stone-300">Intensidade</span>
                      <span className="text-4xl font-serif">{tempIntensity}</span>
                    </div>
                    <input 
                      type="range" min="1" max="5" step="1" 
                      value={tempIntensity} 
                      onChange={(e) => setTempIntensity(parseInt(e.target.value) as Severity)}
                      className="w-full h-1 bg-stone-100 rounded-full appearance-none accent-[#2D4F5E] cursor-pointer"
                    />
                  </motion.div>
                )}

                {activeResponse && (
                  <div className="pt-8 border-t border-stone-100">
                    <GuidedResponseCard response={activeResponse} onClose={clearResponse} />
                  </div>
                )}
              </div>

              <div className="mt-auto pt-12 flex gap-4">
                <button onClick={handleClearPart} className="flex-1 py-4 border border-stone-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-300 hover:text-red-400 hover:border-red-100 transition-all">Limpar</button>
                <button 
                  onClick={handleSavePart}
                  disabled={!tempSensation}
                  className={`flex-[2] py-4 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all
                    ${tempSensation ? 'bg-[#2D4F5E] text-white shadow-lg' : 'bg-stone-100 text-stone-300'}`}
                >
                  Salvar
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* 5. BOTTOM NAVIGATION */}
      <footer className="h-24 px-12 lg:px-20 border-t border-stone-100 bg-white/20 backdrop-blur-md flex items-center justify-between z-30">
        <button onClick={onBack} className="text-[11px] font-bold uppercase tracking-[0.3em] text-stone-400 hover:text-[#1F1F1F] transition-colors">Voltar</button>
        <div className="flex items-center gap-12">
          <button className="hidden sm:block text-[11px] font-bold uppercase tracking-[0.3em] text-stone-400 hover:text-[#1F1F1F] transition-colors">Pular</button>
          <button 
            onClick={handleFinalize}
            disabled={!hasData}
            className={`flex items-center gap-4 px-12 py-4 rounded-full text-[11px] font-bold tracking-[0.3em] uppercase transition-all
              ${hasData ? 'bg-[#1F1F1F] text-white shadow-xl hover:scale-105 active:scale-95' : 'bg-stone-100 text-stone-300 cursor-not-allowed'}`}
          >
            Concluir <MoveRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* Context Selector Modal (unchanged but stylized) */}
      <AnimatePresence>
        {showContextSelector && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-stone-900/10 backdrop-blur-2xl flex items-center justify-center p-8">
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[3rem] p-16 w-full max-w-3xl shadow-2xl relative overflow-hidden border border-stone-100">
                <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none">
                   <Fingerprint className="w-64 h-64" />
                </div>
                <div className="flex justify-between items-start mb-12 relative z-10">
                   <div>
                     <h3 className="text-7xl font-serif text-[#1F1F1F] tracking-tighter">Padrões & <br /><span className="italic text-stone-400 font-light">Sinais.</span></h3>
                     <p className="text-stone-400 text-sm mt-4 font-light">Identifique fatores que influenciam seu momento presente.</p>
                   </div>
                   <button onClick={() => setShowContextSelector(false)} className="p-4 hover:bg-stone-50 rounded-2xl transition-all"><X className="w-6 h-6 text-stone-300" /></button>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-12 relative z-10">
                   {(Object.keys(contextTagLabels) as ContextTag[]).map(tag => {
                     const active = contextTags.includes(tag);
                     return (
                       <button
                         key={tag} onClick={() => active ? setContextTags(prev => prev.filter(t => t !== tag)) : setContextTags(prev => [...prev, tag])}
                         className={`p-6 rounded-[1.5rem] border text-left flex items-center justify-between transition-all
                           ${active ? 'bg-[#1F1F1F] border-[#1F1F1F] text-white' : 'bg-white border-stone-100 text-stone-400 hover:border-stone-200'}`}
                       >
                         <span className="text-[11px] font-bold uppercase tracking-wider">{contextTagLabels[tag]}</span>
                         {active && <Check className="w-4 h-4" />}
                       </button>
                     );
                   })}
                </div>
                <button onClick={() => setShowContextSelector(false)} className="w-full py-6 bg-[#2D4F5E] text-white rounded-full font-bold uppercase tracking-widest text-[11px] shadow-lg relative z-10">Consolidar Escolhas</button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[200] bg-[#FDFBF7] flex flex-col items-center justify-center font-serif">
             <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="w-24 h-24 border-t-2 border-[#2D4F5E] rounded-full mb-12" />
             <p className="text-4xl text-[#1F1F1F] italic font-light animate-pulse">Tecendo percepções...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Scanner;