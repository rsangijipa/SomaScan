import { ScanInput, InferenceOutput } from '../src/types';
import { calculateBaseScores } from './scoring/weightedEvidence';
import { checkRedFlags } from './rules/redFlags.rules';
import { normalizeScores } from './normalizer';

export async function inferScan(input: ScanInput): Promise<InferenceOutput> {
  const baseScores = calculateBaseScores(input);
  const redFlags = await checkRedFlags(input);
  const redFlagMessages = redFlags.map(rf => rf.message);
  const normalizedCauses = normalizeScores(baseScores);
  const topCauses = normalizedCauses
    .sort((a, b) => {
      if (redFlags.length > 0) {
        if (a.urgency === 'high') return -1;
        if (b.urgency === 'high') return 1;
      }
      return b.probability - a.probability;
    })
    .slice(0, 3);

  let careLevel: InferenceOutput['careLevel'] = 'self_monitor';
  if (redFlags.some(rf => rf.urgency === 'high')) {
    careLevel = 'urgent_evaluation';
  } else if (topCauses.some(c => c.urgency === 'moderate')) {
    careLevel = 'schedule_evaluation';
  }

  const topCause = topCauses[0];
  let explanationSummary = '';

  if (topCause && topCause.probability > 0.45) {
    const regions = topCause.signals.regions.join(', ');
    const sensations = topCause.signals.sensations.join(', ');
    explanationSummary = `${topCause.title} aparece como a leitura mais consistente deste check-in.`;
    if (regions || sensations) {
      explanationSummary += ` A combinacao entre ${regions || 'regioes marcadas'} e ${sensations || 'sensacoes registradas'} elevou essa hipotese.`;
    }
  } else if (topCause) {
    explanationSummary = `${topCause.title} surgiu como possibilidade, mas o padrao ainda esta distribuido e pede nova observacao em check-ins futuros.`;
  } else {
    explanationSummary = 'Os sinais registrados ainda nao formam uma leitura local clara. Vale acompanhar a evolucao em novos mapeamentos.';
  }

  const selfCare = Array.from(
    new Set(
      topCauses
        .flatMap((cause) => cause.recommendation.split('. '))
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );

  return {
    topCauses,
    redFlags: redFlagMessages,
    selfCare,
    shouldSeekCare: careLevel !== 'self_monitor',
    careLevel,
    explanationSummary,
  };
}
