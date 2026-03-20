import { BodyPartId } from '@/types';

export const BODY_PART_LABELS: Record<BodyPartId, string> = {
  head: 'Cabeca',
  neck: 'Pescoco',
  chest: 'Peito',
  abdomen: 'Abdomen',
  pelvis: 'Pelve',
  leftArm: 'Braco esquerdo',
  rightArm: 'Braco direito',
  leftHand: 'Mao esquerda',
  rightHand: 'Mao direita',
  leftThigh: 'Coxa esquerda',
  rightThigh: 'Coxa direita',
  leftLeg: 'Perna esquerda',
  rightLeg: 'Perna direita',
  leftFoot: 'Pe esquerdo',
  rightFoot: 'Pe direito',
};

export function getBodyPartLabel(id: BodyPartId): string {
  return BODY_PART_LABELS[id] || id;
}
