import { ScanInput, InferenceOutput } from '../types';
import { calculateBaseScores } from './scoring/weightedEvidence';
import { checkRedFlags } from './rules/redFlags.rules';
import { normalizeScores } from './normalizer';

export async function inferScan(input: ScanInput): Promise<InferenceOutput> {
  // 1. Calculate Base Evidence Scores (Heuristic)
  const baseScores = calculateBaseScores(input);

  // 2. Check for Hard Rules and Red Flags
  const redFlags = await checkRedFlags(input);
  const redFlagMessages = redFlags.map(rf => rf.message);

  // 3. Normalize to Probabilities and Confidence
  const normalizedCauses = normalizeScores(baseScores);

  // 4. Sort and Filter Top 3 Causes (Strictly Top 3)
  const topCauses = normalizedCauses
    .sort((a, b) => {
      // Urgent causes with red flags move to the top
      if (redFlags.length > 0) {
        if (a.urgency === 'high') return -1;
        if (b.urgency === 'high') return 1;
      }
      return b.probability - a.probability;
    })
    .slice(0, 3);

  // 5. Determine Care Level
  let careLevel: InferenceOutput['careLevel'] = 'self_monitor';
  if (redFlags.some(rf => rf.urgency === 'high')) {
    careLevel = 'urgent_evaluation';
  } else if (topCauses.some(c => c.urgency === 'moderate')) {
    careLevel = 'schedule_evaluation';
  }

  // 6. Generate Contextual Summary
  const topCause = topCauses[0];
  let explanationSummary = '';

  if (topCause && topCause.probability > 0.4) {
    const uniqueReasons = Array.from(new Set(topCause.reasons))
      .filter(r => !r.includes('Contexto alinhado'))
      .slice(0, 2);
    
    explanationSummary = `Alta correlação detectada para ${topCause.title.toLowerCase()}. `;
    explanationSummary += `A convergência de ${uniqueReasons.length > 0 ? uniqueReasons.join(' e ') : 'sinais somáticos'} indica um padrão de ${topCause.category.replace(/_/g, ' ')}.`;
  } else if (topCause) {
    explanationSummary = `Detectamos indícios de ${topCause.title.toLowerCase()}, mas o padrão ainda é difuso. Continue observando a evolução dos sinais.`;
  } else {
    explanationSummary = 'Sinais somáticos insuficientes para uma correlação clara. Mantenha a presença e monitore mudanças.';
  }

  return {
    topCauses,
    redFlags: redFlagMessages,
    selfCare: topCauses.flatMap(c => c.recommendation.split('. ')),
    shouldSeekCare: careLevel !== 'self_monitor',
    careLevel,
    explanationSummary,
  };
}
