import { CauseResult } from '../src/types';
import { ScoredCause } from './scoring/weightedEvidence';
import { CAUSES } from './kb/causes';

export function normalizeScores(scoredCauses: ScoredCause[]): CauseResult[] {
  const totalScore = scoredCauses.reduce((acc, curr) => acc + curr.score, 0);
  
  if (totalScore === 0) return [];

  return scoredCauses.map((sc, index) => {
    const causeInfo = CAUSES[sc.id];
    
    // Probability combines base prior and local evidence
    const localProbability = sc.score / totalScore;
    const rawProbability = localProbability * 0.85 + (causeInfo?.priorProbability || 0) * 0.15;
    
    // Calculate gap between this cause and the next one (for Top 1)
    const nextScore = scoredCauses[index + 1]?.score || 0;
    const scoreGap = index === 0 ? (sc.score - nextScore) : 0;

    return {
      id: sc.id,
      title: causeInfo?.title || 'Motivo desconhecido',
      category: causeInfo?.category || 'general_overload',
      probability: Math.min(Math.round(rawProbability * 100) / 100, 1),
      confidence: calculateConfidence(sc, totalScore, scoreGap),
      reasons: sc.reasons,
      signals: {
        regions: Array.from(sc.signals.regions).slice(0, 3),
        sensations: Array.from(sc.signals.sensations).slice(0, 3),
        contexts: Array.from(sc.signals.contexts).slice(0, 3),
      },
      recommendation: causeInfo?.recommendationTemplate || '',
      urgency: causeInfo?.urgency || 'low',
    };
  });
}

function calculateConfidence(sc: ScoredCause, totalScore: number, scoreGap: number): number {
  if (totalScore === 0) return 0;
  
  // 1. Base relative strength
  let confidence = (sc.score / totalScore) * 100;

  // 2. Bonus based on Score Gap (Top 1 only)
  if (scoreGap > 0) {
    const gapBonus = (scoreGap / sc.score) * 20;
    confidence += gapBonus;
  }

  // 3. Penalty for low evidence count
  if (sc.evidenceCount < 3) {
    confidence *= 0.7;
  }

  // 4. Bonus for primary pattern match
  if (sc.primaryMatchCount >= 2) {
    confidence += 10;
  }

  return Math.round(Math.max(0, Math.min(confidence, 100)));
}
