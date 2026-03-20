export type BodyPartId =
  | 'head'
  | 'neck'
  | 'chest'
  | 'abdomen'
  | 'leftArm'
  | 'rightArm'
  | 'leftHand'
  | 'rightHand'
  | 'pelvis'
  | 'leftThigh'
  | 'rightThigh'
  | 'leftLeg'
  | 'rightLeg'
  | 'leftFoot'
  | 'rightFoot';

export type SensationType =
  | 'tension'
  | 'heat'
  | 'weight'
  | 'neutral'
  | 'tingling'
  | 'numbness'
  | 'pain'
  | 'burning'
  | 'pressure'
  | 'stiffness';

export type Severity = 1 | 2 | 3 | 4 | 5;

export type ContextTag =
  | 'stress'
  | 'anxiety'
  | 'poor_sleep'
  | 'poor_posture'
  | 'computer_use'
  | 'recent_exertion'
  | 'after_meal'
  | 'sedentary'
  | 'repetitive_motion'
  | 'injury_recent'
  | 'breathlessness'
  | 'nausea'
  | 'sweating'
  | 'dizziness'
  | 'radiating_pain'
  | 'fever'
  | 'weakness'
  | 'palpitations';

export interface BodyLog {
  id: BodyPartId;
  label: string;
  sensation: SensationType;
  intensity: Severity;
}

export type BodyData = Partial<Record<BodyPartId, BodyLog>>;

export type AppStep = 'intro' | 'picker' | 'scanning' | 'results';

export interface ScanInput {
  bodyData: BodyData;
  contextTags: ContextTag[];
  sexProfile?: 'male' | 'female' | 'unknown';
  avatarVariant?: 'man' | 'woman';
  ageRange?: 'child' | 'adult' | 'older_adult';
  duration?: 'minutes' | 'hours' | 'days' | 'weeks';
}

export interface CauseResult {
  id: string;
  title: string;
  category:
    | 'muscular_tension'
    | 'stress_anxiety_pattern'
    | 'posture_overuse'
    | 'digestive_pattern'
    | 'neuropathic_pattern'
    | 'circulatory_attention'
    | 'headache_tension_pattern'
    | 'sciatica_pattern'
    | 'general_overload'
    | 'menstrual_pattern'
    | 'urgent_attention';
  probability: number;
  confidence: number;
  reasons: string[];
  signals: {
    regions: string[];
    sensations: string[];
    contexts: string[];
  };
  recommendation: string;
  urgency: 'low' | 'moderate' | 'high';
}

export interface InferenceOutput {
  topCauses: CauseResult[];
  redFlags: string[];
  selfCare: string[];
  shouldSeekCare: boolean;
  careLevel: 'self_monitor' | 'schedule_evaluation' | 'urgent_evaluation';
  explanationSummary: string;
}

export interface RecommendationResponse {
  summary: string;
  recommendation: string;
}

export type InterventionType = 'breathing' | 'relaxation' | 'stretch' | 'somatic';

export interface GuidedResponse {
  type: InterventionType;
  message: string;
  duration: number;
  tone: 'calm' | 'direct' | 'encouraging';
}

export interface BodySession {
  id: string;
  date: string;
  parts: BodyPartId[];
  intensity: number;
  context?: {
    sleep?: 'good' | 'poor';
    stress?: 'low' | 'medium' | 'high';
  };
}

export interface BodyInsight {
  type: string;
  confidence: number;
  message: string;
  suggestion: string;
}
