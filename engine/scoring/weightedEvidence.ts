import { getBodyPartLabel } from '../../src/body/bodyRegionMeta';
import { ScanInput, BodyPartId, ContextTag, SensationType } from '../../src/types';
import { MAPPINGS } from '../kb/mappings';
import { CAUSES } from '../kb/causes';

const contextLabels: Record<ContextTag, string> = {
  stress: 'estresse',
  anxiety: 'ansiedade',
  poor_sleep: 'sono ruim',
  poor_posture: 'ma postura',
  computer_use: 'uso intenso de computador',
  recent_exertion: 'esforco fisico recente',
  after_meal: 'apos refeicao',
  sedentary: 'sedentarismo',
  repetitive_motion: 'movimento repetitivo',
  injury_recent: 'lesao recente',
  breathlessness: 'falta de ar',
  nausea: 'nausea',
  sweating: 'suor frio',
  dizziness: 'tontura',
  radiating_pain: 'dor irradiada',
  fever: 'febre',
  weakness: 'fraqueza',
  palpitations: 'palpitacoes',
};

const sensationLabels: Record<SensationType, string> = {
  tension: 'tensao',
  heat: 'calor',
  weight: 'peso',
  neutral: 'neutralidade',
  tingling: 'formigamento',
  numbness: 'dormencia',
  pain: 'dor',
  burning: 'queimacao',
  pressure: 'pressao',
  stiffness: 'rigidez',
};

export interface ScoredCause {
  id: string;
  score: number;
  reasons: string[];
  evidenceCount: number;
  primaryMatchCount: number;
  signals: {
    regions: Set<string>;
    sensations: Set<string>;
    contexts: Set<string>;
  };
}

export function calculateBaseScores(input: ScanInput): ScoredCause[] {
  const results: ScoredCause[] = Object.keys(CAUSES).map(id => ({
    id,
    score: 0,
    reasons: [],
    evidenceCount: 0,
    primaryMatchCount: 0,
    signals: {
      regions: new Set<string>(),
      sensations: new Set<string>(),
      contexts: new Set<string>(),
    },
  }));

  for (const causeId in MAPPINGS) {
    const mapping = MAPPINGS[causeId];
    const causeResult = results.find(r => r.id === causeId);
    if (!causeResult) continue;

    const primaryRegions = Object.entries(mapping.regions)
      .filter(([_, weight]) => weight >= 1.5)
      .map(([id]) => id as BodyPartId);

    // 1. Regions & Sensations Score (with Heuristics)
    Object.entries(input.bodyData).forEach(([partId, log]) => {
      if (!log) return;
      
      const regionWeight = mapping.regions[partId as BodyPartId] || 0;
      const sensationWeight = mapping.sensations[log.sensation] || 0;
      
      if (regionWeight > 0) {
        // Base scoring
        let evidencePower = regionWeight * (log.intensity / 2);
        
        // Sensation alignment boost
        if (sensationWeight > 0) {
          evidencePower *= (1 + sensationWeight * 0.5);
          causeResult.reasons.push(`${getBodyPartLabel(partId as BodyPartId)} com ${sensationLabels[log.sensation]} alinhado ao padrao principal`);
        } else {
          causeResult.reasons.push(`${getBodyPartLabel(partId as BodyPartId)} contribuiu com ${sensationLabels[log.sensation]}`);
        }

        // Intensity Boost: Non-linear boost for severe symptoms in matched regions
        if (log.intensity >= 4) {
          evidencePower *= 1.5;
        }

        causeResult.score += evidencePower;
        causeResult.evidenceCount++;
        causeResult.signals.regions.add(getBodyPartLabel(partId as BodyPartId));
        causeResult.signals.sensations.add(sensationLabels[log.sensation]);

        if (primaryRegions.includes(partId as BodyPartId)) {
          causeResult.primaryMatchCount++;
        }
      }
    });

    // 2. Pattern Clustering Bonus
    // If multiple primary regions are matched, apply a cluster multiplier
    if (primaryRegions.length > 1 && causeResult.primaryMatchCount >= 2) {
      const clusterMultiplier = 1 + (causeResult.primaryMatchCount / primaryRegions.length) * 0.5;
      causeResult.score *= clusterMultiplier;
      causeResult.reasons.push('Padrao corporal recorrente em mais de uma regiao relevante');
    }

    // 3. Context Tags Score
    input.contextTags.forEach(tag => {
      const contextWeight = mapping.contexts[tag] || 0;
      if (contextWeight > 0) {
        causeResult.score += contextWeight * 1.8;
        causeResult.reasons.push(`Contexto associado: ${contextLabels[tag]}`);
        causeResult.evidenceCount++;
        causeResult.signals.contexts.add(contextLabels[tag]);
      }
    });

    // 4. Sex Profile Adjustment (Biological Heuristics)
    if (input.sexProfile === 'female' && causeId === 'menstrual_pattern') {
      causeResult.score *= 1.2;
    } else if (input.sexProfile === 'male' && causeId === 'menstrual_pattern') {
      causeResult.score *= 0.05; 
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
