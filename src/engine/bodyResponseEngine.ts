import { BodyPartId, InterventionType, GuidedResponse, Severity } from '../../types';

interface ResponseConfig {
  primary: InterventionType;
  secondary: InterventionType;
  messages: string[];
}

const BODY_RESPONSE_MAP: Record<string, ResponseConfig> = {
  head: {
    primary: 'breathing',
    secondary: 'relaxation',
    messages: [
      'Respire profundamente por 1 minuto',
      'Solte a tensão do rosto e da testa',
      'Afrouxe o maxilar lentamente'
    ]
  },
  chest: {
    primary: 'breathing',
    secondary: 'somatic',
    messages: [
      'Inspire pelo nariz e solte lentamente pela boca',
      'Coloque a mão no peito e acompanhe a respiração',
      'Permita que o ar expanda o tórax com calma'
    ]
  },
  abdomen: {
    primary: 'breathing',
    secondary: 'somatic',
    messages: [
      'Respire levando o ar até o abdômen',
      'Relaxe a barriga ao expirar',
      'Solte qualquer contração interna'
    ]
  },
  neck: {
    primary: 'stretch',
    secondary: 'relaxation',
    messages: [
      'Incline levemente a cabeça para os lados',
      'Solte os ombros',
      'Faça movimentos suaves de rotação'
    ]
  },
  leftArm: {
    primary: 'stretch',
    secondary: 'relaxation',
    messages: [
      'Estique o braço suavemente',
      'Solte a musculatura do ombro',
      'Relaxe a mão e os dedos'
    ]
  },
  rightArm: {
    primary: 'stretch',
    secondary: 'relaxation',
    messages: [
      'Estique o braço suavemente',
      'Solte a musculatura do ombro',
      'Relaxe a mão e os dedos'
    ]
  },
  leftHand: {
    primary: 'relaxation',
    secondary: 'somatic',
    messages: [
      'Abra e feche a mão suavemente',
      'Sinta o toque dos dedos',
      'Solte a tensão do punho'
    ]
  },
  rightHand: {
    primary: 'relaxation',
    secondary: 'somatic',
    messages: [
      'Abra e feche a mão suavemente',
      'Sinta o toque dos dedos',
      'Solte a tensão do punho'
    ]
  },
  pelvis: {
    primary: 'somatic',
    secondary: 'breathing',
    messages: [
      'Respire e perceba a base do corpo',
      'Solte a região do quadril',
      'Permita que o corpo se acomode'
    ]
  },
  leftThigh: {
    primary: 'stretch',
    secondary: 'somatic',
    messages: [
      'Alongue a perna lentamente',
      'Sinta o peso do corpo apoiado',
      'Relaxe a musculatura da coxa'
    ]
  },
  rightThigh: {
    primary: 'stretch',
    secondary: 'somatic',
    messages: [
      'Alongue a perna lentamente',
      'Sinta o peso do corpo apoiado',
      'Relaxe a musculatura da coxa'
    ]
  },
  leftLeg: {
    primary: 'stretch',
    secondary: 'somatic',
    messages: [
      'Mobilize o tornozelo suavemente',
      'Perceba o contato do pé com o chão',
      'Solte a musculatura da panturrilha'
    ]
  },
  rightLeg: {
    primary: 'stretch',
    secondary: 'somatic',
    messages: [
      'Mobilize o tornozelo suavemente',
      'Perceba o contato do pé com o chão',
      'Solte a musculatura da panturrilha'
    ]
  },
  leftFoot: {
    primary: 'somatic',
    secondary: 'relaxation',
    messages: [
      'Sinta o contato de cada dedo com o chão',
      'Relaxe a planta do pé',
      'Perceba a estabilidade da sua base'
    ]
  },
  rightFoot: {
    primary: 'somatic',
    secondary: 'relaxation',
    messages: [
      'Sinta o contato de cada dedo com o chão',
      'Relaxe a planta do pé',
      'Perceba a estabilidade da sua base'
    ]
  }
};

export function getGuidedResponse(part: BodyPartId, intensity: Severity): GuidedResponse {
  const config = BODY_RESPONSE_MAP[part] || {
    primary: 'breathing',
    secondary: 'relaxation',
    messages: ['Respire calmamente e observe a sensação.', 'Permita que a área relaxe aos poucos.']
  };

  const messageIndex = Math.floor(Math.random() * config.messages.length);
  const type = intensity >= 4 ? config.primary : (Math.random() > 0.5 ? config.primary : config.secondary);
  
  // Duration: 30s for intensity 1-2, 60s for 3-4, 90s for 5
  let duration = 60;
  if (intensity <= 2) duration = 30;
  if (intensity === 5) duration = 90;

  return {
    type,
    message: config.messages[messageIndex],
    duration,
    tone: intensity >= 4 ? 'direct' : 'calm'
  };
}
