import { ScanInput, BodyLog, BodyPartId } from '../../types';
import { MAPPINGS } from '../kb/mappings';
import { CAUSES } from '../kb/causes';

export interface ScoredCause {
  id: string;
  score: number;
  reasons: string[];
  evidenceCount: number;
  primaryMatchCount: number;
}

export function calculateBaseScores(input: ScanInput): ScoredCause[] {
  const results: ScoredCause[] = Object.keys(CAUSES).map(id => ({
    id,
    score: 0,
    reasons: [],
    evidenceCount: 0,
    primaryMatchCount: 0,
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
          causeResult.reasons.push(`${log.label}: ${log.sensation} (Forte correlação)`);
        } else {
          causeResult.reasons.push(`${log.label}: ${log.sensation}`);
        }

        // Intensity Boost: Non-linear boost for severe symptoms in matched regions
        if (log.intensity >= 4) {
          evidencePower *= 1.5;
        }

        causeResult.score += evidencePower;
        causeResult.evidenceCount++;

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
      causeResult.reasons.push('Padrão multirecional detectado (Consistência alta)');
    }

    // 3. Context Tags Score
    input.contextTags.forEach(tag => {
      const contextWeight = mapping.contexts[tag] || 0;
      if (contextWeight > 0) {
        causeResult.score += contextWeight * 2; // Context is a strong primer
        causeResult.reasons.push(`Contexto alinhado: ${tag}`);
        causeResult.evidenceCount++;
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
