import { Engine } from 'json-rules-engine';
import { ScanInput } from '../../src/types';

export const rulesEngine = new Engine();

// Rule 1: Chest pain + Breathlessness/Sweating
rulesEngine.addRule({
  conditions: {
    all: [
      {
        fact: 'bodyData',
        path: '$.chest.intensity',
        operator: 'greaterThanInclusive',
        value: 4,
      },
      {
        any: [
          { fact: 'contextTags', operator: 'contains', value: 'breathlessness' },
          { fact: 'contextTags', operator: 'contains', value: 'sweating' },
          { fact: 'contextTags', operator: 'contains', value: 'nausea' },
        ],
      },
    ],
  },
  event: {
    type: 'RED_FLAG',
    params: {
      message: 'Pressao intensa no peito junto de sinais sistemicos pede avaliacao medica rapida para descartar um quadro agudo.',
      urgency: 'high',
    },
  },
});

// Rule 2: Chest pain + Radiating Pain
rulesEngine.addRule({
  conditions: {
    all: [
      { fact: 'bodyData', path: '$.chest.intensity', operator: 'greaterThanInclusive', value: 1 },
      { fact: 'contextTags', operator: 'contains', value: 'radiating_pain' },
    ],
  },
  event: {
    type: 'RED_FLAG',
    params: {
      message: 'Dor no peito com irradiacao merece avaliacao medica imediata, principalmente se estiver aumentando.',
      urgency: 'high',
    },
  },
});

// Rule 3: Numbness + Weakness + Dizziness (Neurological Alert)
rulesEngine.addRule({
  conditions: {
    all: [
      { fact: 'contextTags', operator: 'contains', value: 'weakness' },
      { fact: 'contextTags', operator: 'contains', value: 'dizziness' },
      {
        any: [
          { fact: 'bodyData', path: '$.head.intensity', operator: 'greaterThanInclusive', value: 1 },
          { fact: 'bodyData', path: '$.neck.intensity', operator: 'greaterThanInclusive', value: 1 },
        ],
      },
    ],
  },
  event: {
    type: 'RED_FLAG',
    params: {
      message: 'Fraqueza com tontura e sinais em cabeca ou pescoco merece avaliacao urgente para afastar alteracoes neurologicas relevantes.',
      urgency: 'high',
    },
  },
});

// Rule 4: Fever + Neck Stiffness
rulesEngine.addRule({
  conditions: {
    all: [
      { fact: 'contextTags', operator: 'contains', value: 'fever' },
      { fact: 'bodyData', path: '$.neck.sensation', operator: 'equal', value: 'stiffness' },
      { fact: 'bodyData', path: '$.neck.intensity', operator: 'greaterThanInclusive', value: 4 },
    ],
  },
  event: {
    type: 'RED_FLAG',
    params: {
      message: 'Febre com rigidez importante no pescoco precisa de avaliacao medica no mesmo dia.',
      urgency: 'high',
    },
  },
});

export async function checkRedFlags(input: ScanInput) {
  const { events } = await rulesEngine.run(input);
  return events.map(e => ({
    message: e.params?.message as string,
    urgency: e.params?.urgency as 'low' | 'moderate' | 'high',
  }));
}
