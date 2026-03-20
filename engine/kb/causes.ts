import { CauseResult } from '../../types';

export type CauseCategory = CauseResult['category'];

export interface CauseInfo {
  id: string;
  title: string;
  category: CauseCategory;
  priorProbability: number;
  recommendationTemplate: string;
  urgency: 'low' | 'moderate' | 'high';
}

export const CAUSES: Record<string, CauseInfo> = {
  muscular_tension: {
    id: 'muscular_tension',
    title: 'Tensão Muscular / Sobrecarga',
    category: 'muscular_tension',
    priorProbability: 0.3,
    recommendationTemplate: 'Pratique alongamentos suaves e repouso da área afetada. Calor local pode ajudar.',
    urgency: 'low',
  },
  stress_anxiety: {
    id: 'stress_anxiety',
    title: 'Padrão de Reação ao Estresse/Ansiedade',
    category: 'stress_anxiety_pattern',
    priorProbability: 0.25,
    recommendationTemplate: 'Pratique exercícios de respiração consciente e técnicas de relaxamento progressivo.',
    urgency: 'low',
  },
  posture_overuse: {
    id: 'posture_overuse',
    title: 'Desequilíbrio Postural / Uso Excessivo',
    category: 'posture_overuse',
    priorProbability: 0.2,
    recommendationTemplate: 'Faça pausas regulares e verifique sua ergonomia no trabalho. Movimente-se a cada 50 minutos.',
    urgency: 'low',
  },
  digestive_discomfort: {
    id: 'digestive_discomfort',
    title: 'Desconforto Digestivo / Padrão Visceral',
    category: 'digestive_pattern',
    priorProbability: 0.15,
    recommendationTemplate: 'Evite deitar-se logo após as refeições e observe a relação com alimentos específicos.',
    urgency: 'low',
  },
  neuropathic_irritation: {
    id: 'neuropathic_irritation',
    title: 'Irritação Nervosa / Sensibilidade Neural',
    category: 'neuropathic_pattern',
    priorProbability: 0.1,
    recommendationTemplate: 'Evite posturas que comprimam a área. Se persistir ou houver fraqueza, busque avaliação.',
    urgency: 'moderate',
  },
  circulatory_alert: {
    id: 'circulatory_alert',
    title: 'Alerta Circulatório / Cardiorrespiratório',
    category: 'circulatory_attention',
    priorProbability: 0.05,
    recommendationTemplate: 'Sinais de alerta detectados. Procure avaliação profissional para descartar problemas agudos.',
    urgency: 'high',
  },
  headache_tension: {
    id: 'headache_tension',
    title: 'Padrão de Cefaleia Tensional',
    category: 'headache_tension_pattern',
    priorProbability: 0.15,
    recommendationTemplate: 'Hidrate-se, evite telas e tente relaxar os músculos da face, mandíbula e pescoço.',
    urgency: 'low',
  },
  sciatica: {
    id: 'sciatica',
    title: 'Padrão Compatível com Ciatalgia',
    category: 'sciatica_pattern',
    priorProbability: 0.1,
    recommendationTemplate: 'Evite carregar peso. Exercícios específicos de mobilidade neural podem ser úteis após avaliação.',
    urgency: 'moderate',
  },
  general_fatigue: {
    id: 'general_fatigue',
    title: 'Fadiga Geral / Sobrecarga Sistêmica',
    category: 'general_overload',
    priorProbability: 0.1,
    recommendationTemplate: 'Priorize o sono e a hidratação. Diminua o ritmo das atividades físicas por 48 horas.',
    urgency: 'low',
  },
  menstrual_pattern: {
    id: 'menstrual_pattern',
    title: 'Padrão de Ciclo / Próximo ao Período',
    category: 'menstrual_pattern',
    priorProbability: 0.1,
    recommendationTemplate: 'Considere o uso de calor local suave e infusões relaxantes. Monitore se o padrão se repete ciclicamente.',
    urgency: 'low',
  },
  urgent_eval: {
    id: 'urgent_eval',
    title: 'Necessidade de Avaliação Urgente',
    category: 'urgent_attention',
    priorProbability: 0.01,
    recommendationTemplate: 'Procure um serviço de pronto-atendimento agora para avaliação clínica imediata.',
    urgency: 'high',
  },
};
