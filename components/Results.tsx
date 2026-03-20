import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanInput, InferenceOutput, BodyLog } from '../types';
import AvatarEngine from '../src/avatar/AvatarEngine';
import { inferScan } from '../engine';
import { analyzePatterns } from '../src/engine/patternEngine';
import InsightCard from '../src/components/InsightCard';
import { BodySession, BodyInsight } from '../types';
import { RefreshCcw, Droplet, Sun, Wind, Sparkles, AlertTriangle, Info, ChevronRight, Activity, MoveRight, Fingerprint } from 'lucide-react';

interface ResultsProps {
  data: ScanInput;
  onRestart: () => void;
}

const GlassCard: React.FC<{ children: React.ReactNode; className?: string; gradient?: string }> = ({ children, className = "", gradient = "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.65))" }) => (
  <div className={`relative overflow-hidden backdrop-blur-[14px] border border-white/45 shadow-[0_40px_100px_rgba(0,0,0,0.03)] rounded-[3rem] ${className}`} style={{ background: gradient }}>
    <div className="absolute top-0 left-0 right-0 h-px bg-white/60 opacity-80" />
    <div className="relative z-10 h-full">{children}</div>
  </div>
);

const Results: React.FC<ResultsProps> = ({ data, onRestart }) => {
  const [result, setResult] = useState<InferenceOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<BodyInsight[]>([]);

  useEffect(() => {
    const processInference = async () => {
      setLoading(true);
      
      // Simulate/Load history for pattern analysis
      const historyStr = localStorage.getItem('somascan_history') || '[]';
      const history: BodySession[] = JSON.parse(historyStr);
      
      // Update history with current scan
      const currentSession: BodySession = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        parts: Object.keys(data.bodyData) as any,
        intensity: (Object.values(data.bodyData) as (BodyLog | undefined)[]).reduce((acc: number, curr) => acc + (curr?.intensity || 0), 0) / (Object.keys(data.bodyData).length || 1),
        context: {
          sleep: data.contextTags.includes('poor_sleep') ? 'poor' : 'good',
          stress: data.contextTags.includes('stress') ? 'high' : 'low'
        }
      };
      
      const updatedHistory = [...history, currentSession].slice(-10);
      localStorage.setItem('somascan_history', JSON.stringify(updatedHistory));

      await new Promise(resolve => setTimeout(resolve, 3000));
      const output = await inferScan(data);
      
      // Analyze patterns
      const patternInsights = analyzePatterns(updatedHistory);
      
      setResult(output);
      setInsights(patternInsights);
      setLoading(false);
    };
    processInference();
  }, [data]);

  return (
    <div className="flex flex-col h-full max-w-[1600px] mx-auto p-12 lg:p-24 overflow-y-auto no-scrollbar relative z-10">
      
      {/* Editorial Header */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="text-center mb-24 lg:mb-32"
      >
        <div className="inline-flex items-center gap-4 mb-8 px-6 py-2 bg-white/40 border border-white/60 rounded-full">
          <Activity className="w-3.5 h-3.5 text-graphite-dark" />
          <span className="text-[10px] font-bold tracking-[0.5em] text-graphite-light uppercase">Somatography Report v3.0</span>
        </div>
        <h2 className="text-9xl md:text-[11rem] font-serif font-medium text-graphite-dark tracking-tight leading-[0.8] mt-6">
          Integração & <br /><span className="italic font-light text-graphite-light">Evidência.</span>
        </h2>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-start justify-center flex-1 mb-32">
        
        {/* 1. VISUAL MAP STAGE (Sculpture View) */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/3 flex flex-col gap-12"
        >
          <GlassCard className="flex-1 p-16" gradient="linear-gradient(180deg, rgba(255,255,255,0.78), rgba(232,226,246,0.35))">
            <div className="h-full w-full">
              <AvatarEngine 
                data={data.bodyData} 
                selectedPart={null} 
                onSelectPart={() => {}} 
              />
            </div>
          </GlassCard>
        </motion.div>

        {/* 2. INSIGHTS & ANALYTICS */}
        <div className="w-full lg:w-1/2 max-w-3xl">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-40 flex flex-col items-center text-center space-y-16"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 rounded-full border-t-[3px] border-graphite-dark border-r-[3px] border-r-transparent"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Fingerprint className="w-10 h-10 text-graphite-light/30 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-8">
                  <p className="text-3xl font-serif italic text-graphite-dark font-light">Sintonizando frequências somáticas...</p>
                  <div className="h-px bg-white/30 w-64 mx-auto relative overflow-hidden">
                     <motion.div 
                      initial={{ left: "-100%" }}
                      animate={{ left: "100%" }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-0 bottom-0 w-1/2 bg-graphite-dark"
                     />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="space-y-16"
              >
                {/* Critical Red Flags */}
                {result?.redFlags && result.redFlags.length > 0 && (
                  <motion.div 
                    initial={{ scale: 0.96, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-red-50/70 backdrop-blur-3xl border border-red-100 p-12 rounded-[3.5rem] flex items-start gap-10 shadow-[0_40px_100px_rgba(239,68,68,0.08)]"
                  >
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-red-50 flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-red-900 text-[11px] font-bold uppercase tracking-[0.5em] mb-4">Atenção Prioritária</h4>
                      {result.redFlags.map((flag, idx) => (
                        <p key={idx} className="text-red-800 text-lg font-medium leading-relaxed font-serif italic">{flag}</p>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Primary Narrative Card */}
                <GlassCard className="p-16 lg:p-24" gradient="linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.65))">
                  <div className="flex items-center gap-6 mb-12 opacity-30">
                    <div className="w-2 h-2 rounded-full bg-graphite-dark" />
                    <span className="text-graphite-dark text-[11px] font-bold tracking-[0.5em] uppercase">Síntese Intuita</span>
                  </div>
                  
                  <h3 className="text-5xl md:text-6xl font-serif text-graphite-dark leading-[1.05] tracking-tight mb-20">
                     {result?.explanationSummary}
                  </h3>
                  
                  <div className="space-y-12 pt-16 border-t border-white/30">
                    {result?.topCauses.map((cause, idx) => (
                      <div key={idx} className="space-y-5">
                        <div className="flex justify-between items-end">
                          <span className="text-[12px] font-bold text-graphite-dark uppercase tracking-[0.4em] mb-1">{cause.title}</span>
                          <div className="flex flex-col items-end">
                            <span className="text-2xl font-serif italic text-graphite-dark font-light">{Math.round(cause.probability * 100)}%</span>
                            <span className="text-[9px] font-bold text-graphite-light/50 uppercase tracking-widest">Confiança {cause.confidence}%</span>
                          </div>
                        </div>
                        <div className="h-1 bg-white/40 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${cause.probability * 100}%` }}
                            transition={{ duration: 2, delay: 1 + (idx * 0.3), ease: [0.16, 1, 0.3, 1] }}
                            className={`h-full ${idx === 0 ? 'bg-graphite-dark' : 'bg-graphite-light'}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* Self-Care Rituals Card */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <GlassCard className="p-16" gradient="linear-gradient(180deg, rgba(255,255,255,0.78), rgba(221,234,247,0.35))">
                    <div className="flex items-center gap-6 mb-12">
                      <div className="w-16 h-16 rounded-3xl bg-azul-nevoa flex items-center justify-center">
                        <Activity className="w-8 h-8 text-graphite-dark" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-serif">Fluxo Energético</h2>
                        <p className="text-[11px] text-graphite-light tracking-[0.2em] font-bold uppercase">Estado Ativo</p>
                      </div>
                    </div>
                    
                    <ul className="space-y-12 relative z-10">
                      {result?.selfCare.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-10 group cursor-default">
                          <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center shrink-0 mt-1 transition-all group-hover:bg-white/40">
                            <ChevronRight className="w-4 h-4 text-graphite-light" />
                          </div>
                          <p className="text-2xl text-graphite font-light leading-relaxed font-serif italic">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>

                    <div className="grid grid-cols-3 gap-12 mt-24 pt-16 border-t border-white/20 relative z-10">
                      <div className="text-center space-y-5">
                        <Wind className="w-6 h-6 text-graphite-light mx-auto" strokeWidth={1.5} />
                        <span className="block text-[10px] text-graphite-light font-bold uppercase tracking-[0.5em]">Fluir</span>
                      </div>
                      <div className="text-center space-y-5">
                        <Droplet className="w-6 h-6 text-graphite-light mx-auto" strokeWidth={1.5} />
                        <span className="block text-[10px] text-graphite-light font-bold uppercase tracking-[0.6em]">Nutrir</span>
                      </div>
                      <div className="text-center space-y-5">
                        <Info className="w-6 h-6 text-graphite-light mx-auto" strokeWidth={1.5} />
                        <span className="block text-[10px] text-graphite-light font-bold uppercase tracking-[0.6em]">Notar</span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Behavioral Pattern Insights */}
                <AnimatePresence>
                  {insights.length > 0 && (
                    <motion.div 
                      key="insights"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-8"
                    >
                      <div className="flex items-center gap-6 px-12 opacity-40">
                         <div className="h-px bg-graphite-light flex-1" />
                         <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-graphite-light">Tendências & Insights</span>
                         <div className="h-px bg-graphite-light flex-1" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {insights.map((insight, idx) => (
                          <InsightCard key={idx} insight={insight} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <footer className="mt-12 flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onRestart}
                    className="px-12 py-5 bg-gradient-to-br from-pessego-claro to-rosa-nevoa text-graphite-dark rounded-full font-bold tracking-[0.3em] text-[10px] flex items-center gap-4 shadow-xl uppercase transition-all"
                  >
                    <RefreshCcw className="w-4 h-4" /> Novo Mapeamento
                  </motion.button>
                </footer>

                {/* Information Disclaimer */}
                <div className="px-12 py-10 bg-white/40 rounded-[3rem] border border-white/60 flex items-center gap-10">
                  <Info className="w-6 h-6 text-graphite-light shrink-0" strokeWidth={1.5} />
                  <p className="text-[11px] text-graphite-light leading-[1.8] font-light">
                    Esta ferramenta é exclusivamente para integração perceptiva e exploração somática. <span className="font-bold text-graphite-dark">Não substitui aconselhamento médico profissional.</span> 
                    {result?.shouldSeekCare && " Recomendamos a avaliação de um especialista para os sinais identificados."}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Results;