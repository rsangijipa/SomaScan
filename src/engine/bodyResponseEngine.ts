import { BodyPartId, ContextTag, GuidedResponse, InterventionType, Severity } from '@/types';

interface ResponseConfig {
  primary: InterventionType;
  fallback: InterventionType;
  calm: string[];
  intense: string[];
  contextBoost?: Partial<Record<ContextTag, string[]>>;
}

const BODY_RESPONSE_MAP: Record<string, ResponseConfig> = {
  head: {
    primary: 'breathing',
    fallback: 'relaxation',
    calm: [
      'Solte a testa, o maxilar e deixe a respiracao ganhar ritmo mais longo.',
      'Descanse o olhar por alguns segundos e alivie a musculatura da face.',
    ],
    intense: [
      'Afaste-se da tela por um minuto e faca tres expiracoes longas, sem forcar.',
      'Descruze o maxilar, abaixe os ombros e deixe o ar sair mais devagar que a entrada.',
    ],
    contextBoost: {
      poor_sleep: ['A combinacao com sono ruim costuma deixar a cabeca mais reativa; reduza estimulos agora.'],
      stress: ['Se o dia estiver acelerado, priorize um minuto de pausa silenciosa antes de continuar.'],
    },
  },
  chest: {
    primary: 'breathing',
    fallback: 'somatic',
    calm: [
      'Leve uma mao ao peito e acompanhe duas respiracoes sem tentar controlar demais.',
      'Abra um pouco o esterno e deixe a expiracao sair por mais tempo que a inspiracao.',
    ],
    intense: [
      'Sente-se com apoio nas costas e foque em expiracoes lentas para reduzir a pressao no torax.',
      'Se a sensacao estiver alta, diminua o ritmo e observe se ha alivio com a respiracao mais baixa.',
    ],
    contextBoost: {
      anxiety: ['Se houver ansiedade junto, mantenha o foco na expiracao e nos pontos de apoio do corpo.'],
      palpitations: ['Com palpitacoes, prefira respiracoes menores e regulares, sem puxar o ar em excesso.'],
    },
  },
  abdomen: {
    primary: 'breathing',
    fallback: 'somatic',
    calm: [
      'Amoleca a barriga ao expirar e permita que o centro do corpo desca um pouco.',
      'Repouse uma mao sobre o abdomen e observe a expansao sem prender o ar.',
    ],
    intense: [
      'Se a tensao estiver alta, solte a parede abdominal aos poucos e evite comprimir o tronco.',
      'Tente duas expiracoes longas com a mao no abdomen para reduzir a contracao central.',
    ],
    contextBoost: {
      after_meal: ['Se apareceu depois de comer, prefira uma postura mais ereta e respiracao suave.'],
      stress: ['Estresse costuma concentrar esforco na barriga; desacelere antes de seguir.'],
    },
  },
  neck: {
    primary: 'stretch',
    fallback: 'relaxation',
    calm: ['Solte os ombros e incline a cabeca de forma curta e controlada para cada lado.'],
    intense: ['Evite movimentos amplos; faca microajustes no pescoco e relaxe a base dos ombros.'],
  },
  leftArm: {
    primary: 'stretch',
    fallback: 'relaxation',
    calm: ['Alongue o braco esquerdo com pouca amplitude e solte a musculatura do ombro.'],
    intense: ['Apoie o braco esquerdo, reduza a carga e mova o ombro com suavidade antes de estender.'],
  },
  rightArm: {
    primary: 'stretch',
    fallback: 'relaxation',
    calm: ['Alongue o braco direito com pouca amplitude e solte a musculatura do ombro.'],
    intense: ['Apoie o braco direito, reduza a carga e mova o ombro com suavidade antes de estender.'],
  },
  leftHand: {
    primary: 'relaxation',
    fallback: 'somatic',
    calm: ['Abra e feche a mao esquerda devagar, percebendo a ponta de cada dedo.'],
    intense: ['Pare a tarefa por alguns segundos, solte o punho e recupere mobilidade sem forcar.'],
  },
  rightHand: {
    primary: 'relaxation',
    fallback: 'somatic',
    calm: ['Abra e feche a mao direita devagar, percebendo a ponta de cada dedo.'],
    intense: ['Pare a tarefa por alguns segundos, solte o punho e recupere mobilidade sem forcar.'],
  },
  pelvis: {
    primary: 'somatic',
    fallback: 'breathing',
    calm: ['Sinta o peso do quadril na base e deixe a pelve descansar no apoio.'],
    intense: ['Mude o apoio do quadril e permita pequenas basculacoes para reduzir rigidez ou pressao.'],
  },
  leftThigh: {
    primary: 'stretch',
    fallback: 'somatic',
    calm: ['Alongue a coxa esquerda aos poucos e perceba onde a musculatura segura mais.'],
    intense: ['Se a coxa esquerda estiver carregada, alivie o apoio e evite alongar no limite.'],
  },
  rightThigh: {
    primary: 'stretch',
    fallback: 'somatic',
    calm: ['Alongue a coxa direita aos poucos e perceba onde a musculatura segura mais.'],
    intense: ['Se a coxa direita estiver carregada, alivie o apoio e evite alongar no limite.'],
  },
  leftLeg: {
    primary: 'stretch',
    fallback: 'somatic',
    calm: ['Mobilize tornozelo e panturrilha esquerda com movimentos curtos e soltos.'],
    intense: ['Se a panturrilha esquerda estiver densa, diminua a carga e mobilize sem pressa.'],
  },
  rightLeg: {
    primary: 'stretch',
    fallback: 'somatic',
    calm: ['Mobilize tornozelo e panturrilha direita com movimentos curtos e soltos.'],
    intense: ['Se a panturrilha direita estiver densa, diminua a carga e mobilize sem pressa.'],
  },
  leftFoot: {
    primary: 'somatic',
    fallback: 'relaxation',
    calm: ['Distribua o peso no pe esquerdo e perceba a base dos dedos no apoio.'],
    intense: ['Tire um pouco da carga do pe esquerdo e retorne aos poucos, procurando estabilidade.'],
  },
  rightFoot: {
    primary: 'somatic',
    fallback: 'relaxation',
    calm: ['Distribua o peso no pe direito e perceba a base dos dedos no apoio.'],
    intense: ['Tire um pouco da carga do pe direito e retorne aos poucos, procurando estabilidade.'],
  }
};

export function getGuidedResponse(part: BodyPartId, intensity: Severity, contextTags: ContextTag[] = []): GuidedResponse {
  const config = BODY_RESPONSE_MAP[part] || {
    primary: 'breathing',
    fallback: 'relaxation',
    calm: ['Respire com calma e observe a regiao sem tentar corrigir tudo de uma vez.'],
    intense: ['Desacelere por um instante e deixe a area perder um pouco de carga antes de seguir.'],
  };

  const messagePool = intensity >= 4 ? config.intense : config.calm;
  const baseMessage = messagePool[Math.floor(Math.random() * messagePool.length)];
  const contextualMessage = contextTags
    .flatMap((tag) => config.contextBoost?.[tag] || [])
    .slice(0, 1)
    .join(' ');
  const type = intensity >= 4 ? config.primary : (Math.random() > 0.5 ? config.primary : config.fallback);
  
  let duration = 60;
  if (intensity <= 2) duration = 30;
  if (intensity === 5) duration = 90;

  return {
    type,
    message: [baseMessage, contextualMessage].filter(Boolean).join(' '),
    duration,
    tone: intensity >= 4 ? 'direct' : 'calm'
  };
}
