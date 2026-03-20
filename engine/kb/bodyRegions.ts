import { BodyPartId } from '../../types';

export interface BodyRegionInfo {
  id: BodyPartId;
  label: string;
  isPair: boolean;
  side?: 'left' | 'right';
}

export const BODY_REGIONS: Record<BodyPartId, BodyRegionInfo> = {
  head: { id: 'head', label: 'Cabeça', isPair: false },
  neck: { id: 'neck', label: 'Pescoço', isPair: false },
  chest: { id: 'chest', label: 'Peito', isPair: false },
  abdomen: { id: 'abdomen', label: 'Abdômen', isPair: false },
  pelvis: { id: 'pelvis', label: 'Pelve', isPair: false },
  leftArm: { id: 'leftArm', label: 'Braço Esquerdo', isPair: true, side: 'left' },
  rightArm: { id: 'rightArm', label: 'Braço Direito', isPair: true, side: 'right' },
  leftHand: { id: 'leftHand', label: 'Mão Esquerda', isPair: true, side: 'left' },
  rightHand: { id: 'rightHand', label: 'Mão Direita', isPair: true, side: 'right' },
  leftThigh: { id: 'leftThigh', label: 'Coxa Esquerda', isPair: true, side: 'left' },
  rightThigh: { id: 'rightThigh', label: 'Coxa Direita', isPair: true, side: 'right' },
  leftLeg: { id: 'leftLeg', label: 'Perna Esquerda', isPair: true, side: 'left' },
  rightLeg: { id: 'rightLeg', label: 'Perna Direita', isPair: true, side: 'right' },
  leftFoot: { id: 'leftFoot', label: 'Pé Esquerdo', isPair: true, side: 'left' },
  rightFoot: { id: 'rightFoot', label: 'Pé Direito', isPair: true, side: 'right' },
};
