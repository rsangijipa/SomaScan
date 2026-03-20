import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import { BodyInsight } from '@/types';

interface InsightCardProps {
  insight: BodyInsight;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <Card tone="emphasis" className="relative overflow-hidden p-6 transition-all duration-500 group-hover:-translate-y-0.5">
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
          <Sparkles className="w-12 h-12 text-graphite-dark" />
        </div>

        <div className="flex items-start gap-6 relative z-10">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-stone-100 shrink-0">
            <ArrowUpRight className="w-5 h-5 text-graphite-light" />
          </div>
          <div className="space-y-4">
            <h4 className="type-overline text-text-muted">Insight do seu corpo</h4>
            <p className="text-xl font-serif text-graphite-dark leading-tight italic">
              {insight.message}
            </p>
            <div className="pt-4 border-t border-white/40">
               <p className="text-[12px] text-graphite-light leading-relaxed">
                 {insight.suggestion}
               </p>
            </div>
            <div className="pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-graphite-light opacity-60">Consistencia do padrao</span>
                <span className="text-[8px] font-bold text-graphite-light">{Math.round(insight.confidence * 100)}%</span>
              </div>
              <div className="h-0.5 w-full bg-white/30 rounded-full overflow-hidden">
                 <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${insight.confidence * 100}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-graphite-light/20"
                  />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default InsightCard;
