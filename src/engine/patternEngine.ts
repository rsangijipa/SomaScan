import { BodySession, BodyInsight, BodyPartId } from '../../types';

export function analyzePatterns(sessions: BodySession[]): BodyInsight[] {
  if (sessions.length < 2) return [];

  const insights: BodyInsight[] = [];
  const recentSessions = sessions.slice(-5); // Analyze last 5 sessions
  const now = new Date();

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
    .map(([part]) => part);

  if (persistentParts.length > 0) {
    insights.push({
      type: 'persistence',
      confidence: 0.85,
      message: 'Padrão recorrente detectado em regiões específicas.',
      suggestion: 'Observe se estas sensações surgem em horários ou atividades específicas.'
    });
  }

  if (highIntensityCount >= 3) {
    insights.push({
      type: 'high_intensity',
      confidence: 0.8,
      message: 'Tensão persistente de alta intensidade identificada.',
      suggestion: 'Considere aumentar a frequência das pausas para relaxamento preventivo.'
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
      confidence: 0.75,
      message: 'Seu padrão indica uma possível relação entre qualidade do sono e sensações viscerais.',
      suggestion: 'Pratique respiração diafragmática antes de dormir.'
    });
  }

  // Stress Pattern: High Stress + Neck/Shoulders (Arms in our map)
  const hasStressPattern = highStressSessions.some(s => 
    s.parts.some(p => p === 'neck' || p === 'leftArm' || p === 'rightArm')
  );

  if (hasStressPattern) {
    insights.push({
      type: 'stress_tension',
      confidence: 0.78,
      message: 'Seu corpo parece reagir ao estresse com tensão na região superior.',
      suggestion: 'Tente soltar os ombros voluntariamente várias vezes ao dia.'
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
      confidence: 0.7,
      message: 'Sinais de sobrecarga mental detectados em sua cartografia somática.',
      suggestion: 'Reserve momentos de silêncio absoluto, mesmo que breves.'
    });
  }

  return insights.sort((a, b) => b.confidence - a.confidence).slice(0, 2);
}
