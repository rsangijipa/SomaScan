import { ContextTag } from '../../src/types';

export interface SymptomInfo {
  id: ContextTag;
  label: string;
  category: 'lifestyle' | 'somatic' | 'emotional' | 'clinical';
  weight: number;
}

export const SYMPTOMS: Record<ContextTag, SymptomInfo> = {
  stress: { id: 'stress', label: 'Estresse Elevado', category: 'emotional', weight: 1.5 },
  anxiety: { id: 'anxiety', label: 'Ansiedade', category: 'emotional', weight: 1.5 },
  poor_sleep: { id: 'poor_sleep', label: 'Sono Insatisfatório', category: 'lifestyle', weight: 1.2 },
  poor_posture: { id: 'poor_posture', label: 'Má Postura Prolungada', category: 'lifestyle', weight: 1.3 },
  computer_use: { id: 'computer_use', label: 'Uso Intenso de Computador', category: 'lifestyle', weight: 1.2 },
  recent_exertion: { id: 'recent_exertion', label: 'Esforço Físico Recente', category: 'lifestyle', weight: 1.4 },
  after_meal: { id: 'after_meal', label: 'Após Refeição', category: 'lifestyle', weight: 1.5 },
  sedentary: { id: 'sedentary', label: 'Sedentarismo', category: 'lifestyle', weight: 1.1 },
  repetitive_motion: { id: 'repetitive_motion', label: 'Movimentos Repetitivos', category: 'lifestyle', weight: 1.4 },
  injury_recent: { id: 'injury_recent', label: 'Lesão ou Trauma Recente', category: 'lifestyle', weight: 2.0 },
  breathlessness: { id: 'breathlessness', label: 'Falta de Ar', category: 'clinical', weight: 2.5 },
  nausea: { id: 'nausea', label: 'Náusea/Enjoo', category: 'clinical', weight: 1.8 },
  sweating: { id: 'sweating', label: 'Suor Frio/Excessivo', category: 'clinical', weight: 2.2 },
  dizziness: { id: 'dizziness', label: 'Tontura', category: 'clinical', weight: 2.0 },
  radiating_pain: { id: 'radiating_pain', label: 'Dor Irradiada', category: 'clinical', weight: 2.5 },
  fever: { id: 'fever', label: 'Febre', category: 'clinical', weight: 3.0 },
  weakness: { id: 'weakness', label: 'Fraqueza Muscular', category: 'clinical', weight: 2.0 },
  palpitations: { id: 'palpitations', label: 'Palpitações', category: 'somatic', weight: 2.0 },
};
