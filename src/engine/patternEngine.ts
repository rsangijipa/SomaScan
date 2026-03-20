import { getBodyPartLabel } from '@/body/bodyRegionMeta';
import { BodySession, BodyInsight } from '@/types';

export function analyzePatterns(sessions: BodySession[]): BodyInsight[] {
  if (sessions.length < 2) return [];

  const insights: BodyInsight[] = [];
  const recentSessions = sessions.slice(-5);

  // 1. REPETITION & PERSISTENCE
  const partFrequency: Record<string, number> = {};
  let totalIntensity = 0;
  let highIntensityCount = 0;

  recentSessions.forEach(s => {
    s.parts.forEach(p => {
      partFrequency[p] = (partFrequency[p] || 0) + 1;
    });
    totalIntensity += s.intensity;
    if (s.intensity >= 4) highIntensityCount++;
  });

  const persistentParts = Object.entries(partFrequency)
    .filter(([_, freq]) => freq >= 3)
    .map(([part]) => getBodyPartLabel(part as BodySession['parts'][number]));

  if (persistentParts.length > 0) {
    insights.push({
      type: 'persistence',
      confidence: 0.82,
      message: `As regioes ${persistentParts.slice(0, 2).join(' e ')} reapareceram em varios registros recentes.`,
      suggestion: 'Vale observar o que costuma acontecer antes dessas marcacoes: postura, carga, sono ou ritmo do dia.'
    });
  }

  if (highIntensityCount >= 3) {
    insights.push({
      type: 'high_intensity',
      confidence: 0.76,
      message: 'A intensidade media recente ficou alta em mais de um check-in.',
      suggestion: 'Use pausas curtas com mais frequencia e veja se a intensidade cai antes do proximo registro.'
    });
  }

  // 2. CONTEXTUAL CORRELATIONS
  const poorSleepSessions = recentSessions.filter(s => s.context?.sleep === 'poor');
  const highStressSessions = recentSessions.filter(s => s.context?.stress === 'high');

  // Anxiety Pattern: Poor Sleep + Chest/Abdomen
  const hasAnxietyPattern = poorSleepSessions.some(s => 
    s.parts.some(p => p === 'chest' || p === 'abdomen')
  );

  if (hasAnxietyPattern) {
    insights.push({
      type: 'anxiety_somatic',
      confidence: 0.72,
      message: 'Sono ruim apareceu junto de sinais no peito ou abdomen em sessoes recentes.',
      suggestion: 'Se esse padrao se repetir, experimente reduzir estimulos e desacelerar a respiracao antes de dormir.'
    });
  }

  // Stress Pattern: High Stress + Neck/Shoulders (Arms in our map)
  const hasStressPattern = highStressSessions.some(s => 
    s.parts.some(p => p === 'neck' || p === 'leftArm' || p === 'rightArm')
  );

  if (hasStressPattern) {
    insights.push({
      type: 'stress_tension',
      confidence: 0.75,
      message: 'Quando o estresse sobe, a regiao superior do corpo tende a ser a primeira a responder.',
      suggestion: 'Soltar ombros, nuca e respiracao em pausas curtas pode reduzir a recorrencia do padrao.'
    });
  }

  // Mental Overload: Multiple Upper Regions
  const hasOverloadPattern = recentSessions.some(s => {
    const upperParts = s.parts.filter(p => ['head', 'neck', 'chest'].includes(p));
    return upperParts.length >= 2;
  });

  if (hasOverloadPattern) {
    insights.push({
      type: 'mental_overload',
      confidence: 0.68,
      message: 'Cabeca, pescoco e peito apareceram juntos em mais de um registro, sugerindo sobrecarga acumulada.',
      suggestion: 'Vale criar pequenos intervalos de silencio ou pausa de tela entre blocos intensos do dia.'
    });
  }

  return insights.sort((a, b) => b.confidence - a.confidence).slice(0, 3);
}
