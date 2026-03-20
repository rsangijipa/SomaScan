import { BodyPartId } from '@/types';

export type AvatarVariant = 'man' | 'woman';
export type SexProfile = 'male' | 'female' | 'unknown';

export interface AvatarProfile {
  avatarVariant: AvatarVariant;
  sexProfile: SexProfile;
}

export type BodyPartLabel = string;
export type { BodyPartId };
