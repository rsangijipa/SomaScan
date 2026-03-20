import { BodyPartId, SensationType, ContextTag } from '../../types';

export interface CauseMapping {
  regions: Partial<Record<BodyPartId, number>>;
  sensations: Partial<Record<SensationType, number>>;
  contexts: Partial<Record<ContextTag, number>>;
}

export const MAPPINGS: Record<string, CauseMapping> = {
  muscular_tension: {
    regions: { neck: 2, head: 1, chest: 0.8, rightArm: 1.2, leftArm: 1.2, pelvis: 0.5, rightThigh: 0.8, leftThigh: 0.8 },
    sensations: { tension: 2.5, stiffness: 2.2, weight: 1.5, pain: 1.2, pressure: 0.8 },
    contexts: { recent_exertion: 2.5, poor_posture: 2, computer_use: 1.8, sedentary: 1.2 },
  },
  stress_anxiety: {
    regions: { chest: 2.5, abdomen: 2, neck: 1.8, head: 1.5, pelvis: 0.8 },
    sensations: { pressure: 2.5, tension: 2, weight: 1.8, heat: 1.5, tingling: 1.2, burning: 0.5 },
    contexts: { stress: 3, anxiety: 3, palpitations: 2.5, breathlessness: 2.2, sweating: 2, poor_sleep: 1.8 },
  },
  posture_overuse: {
    regions: { neck: 2.5, head: 1.2, rightArm: 2, leftArm: 2, pelvis: 1.5, rightThigh: 0.5, leftThigh: 0.5 },
    sensations: { stiffness: 2.5, tension: 2, numbness: 1.8, tingling: 1.5, weight: 1.2 },
    contexts: { poor_posture: 3, computer_use: 2.5, repetitive_motion: 2.5, sedentary: 2, after_meal: 0.5 },
  },
  digestive_discomfort: {
    regions: { abdomen: 3, chest: 1.5, neck: 0.5 },
    sensations: { burning: 2.5, pressure: 2, weight: 1.8, heat: 1.5, pain: 1.2 },
    contexts: { after_meal: 3.5, nausea: 2.5, stress: 1.2 },
  },
  neuropathic_irritation: {
    regions: { leftArm: 1.5, rightArm: 1.5, leftLeg: 1.5, rightLeg: 1.5, leftHand: 2.5, rightHand: 2.5, leftFoot: 2.5, rightFoot: 2.5, neck: 1, head: 0.5 },
    sensations: { numbness: 3, tingling: 3, burning: 2, pain: 1.5, stiffness: 0.8 },
    contexts: { repetitive_motion: 2, injury_recent: 2.2, radiating_pain: 2.5, weakness: 2.2 },
  },
  headache_tension: {
    regions: { head: 3.5, neck: 2, rightArm: 0.2, leftArm: 0.2 },
    sensations: { pressure: 3, tension: 2.5, stiffness: 2.2, weight: 1.2, heat: 1 },
    contexts: { stress: 2.5, poor_sleep: 2.2, computer_use: 2, dizziness: 1.5 },
  },
  sciatica: {
    regions: { pelvis: 2.5, leftLeg: 2.2, rightLeg: 2.2, leftFoot: 1.5, rightFoot: 1.5, leftThigh: 1.8, rightThigh: 1.8 },
    sensations: { tingling: 2.5, numbness: 2.5, pain: 2, burning: 1.8, weight: 1 },
    contexts: { radiating_pain: 3.5, injury_recent: 2, sedentary: 1.8, recent_exertion: 1.2 },
  },
  circulatory_alert: {
    regions: { chest: 5, leftArm: 3, head: 1.5, neck: 1, abdomen: 0.8 },
    sensations: { pressure: 5, pain: 4, burning: 2, weight: 2, tingling: 1.5 },
    contexts: { breathlessness: 5, sweating: 4, nausea: 3, palpitations: 3, radiating_pain: 3, dizziness: 2.5 },
  },
  menstrual_pattern: {
    regions: { pelvis: 4, abdomen: 3, head: 1, chest: 1 },
    sensations: { weight: 3, pain: 2.5, tension: 2, pressure: 2, burning: 1 },
    contexts: { nausea: 1.5, poor_sleep: 1.2, stress: 1 },
  },
  urgent_eval: {
    regions: { chest: 4, head: 3, neck: 2, abdomen: 2 },
    sensations: { pain: 4, pressure: 4, numbness: 3, tingling: 3 },
    contexts: { breathlessness: 5, radiating_pain: 5, dizziness: 4, sweating: 4, weakness: 4 },
  },
};
