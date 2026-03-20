import { BODY_PART_LABELS } from '@/body/bodyRegionMeta';
import { ContextTag, SensationType } from '@/types';
import {
  Activity,
  AlertCircle,
  Anchor,
  Flame,
  Layers,
  Maximize2,
  Minus,
  Thermometer,
  Zap,
} from 'lucide-react';

export const bodyPartLabels = BODY_PART_LABELS;

export const contextTagLabels: Record<ContextTag, string> = {
  stress: 'Estresse',
  anxiety: 'Ansiedade',
  poor_sleep: 'Sono ruim',
  poor_posture: 'Ma postura',
  computer_use: 'Uso de PC',
  recent_exertion: 'Esforco fisico',
  after_meal: 'Pos-refeicao',
  sedentary: 'Sedentarismo',
  repetitive_motion: 'Movimento repetitivo',
  injury_recent: 'Lesao recente',
  breathlessness: 'Falta de ar',
  nausea: 'Nausea',
  sweating: 'Suor frio',
  dizziness: 'Tontura',
  radiating_pain: 'Dor irradiada',
  fever: 'Febre',
  weakness: 'Fraqueza',
  palpitations: 'Palpitacoes',
};

export const sensationConfig: Record<
  SensationType,
  { icon: typeof Activity; label: string; color: string }
> = {
  tension: { icon: Activity, label: 'Tensao', color: '#E0F2FE' },
  heat: { icon: Thermometer, label: 'Calor', color: '#FEF3C7' },
  weight: { icon: Anchor, label: 'Peso', color: '#F1F5F9' },
  tingling: { icon: Zap, label: 'Formigar', color: '#FDF2F8' },
  neutral: { icon: Minus, label: 'Neutro', color: '#F8FAFC' },
  numbness: { icon: Minus, label: 'Dormencia', color: '#F8FAFC' },
  pain: { icon: AlertCircle, label: 'Dor', color: '#FEE2E2' },
  burning: { icon: Flame, label: 'Queimacao', color: '#FFEDD5' },
  pressure: { icon: Maximize2, label: 'Pressao', color: '#F0FDFA' },
  stiffness: { icon: Layers, label: 'Rigidez', color: '#F5F3FF' },
};

export const scannerSteps = [
  { id: 'intro', label: 'Introducao' },
  { id: 'picker', label: 'Perfil' },
  { id: 'scanning', label: 'Mapeamento' },
  { id: 'results', label: 'Resultado' },
] as const;
