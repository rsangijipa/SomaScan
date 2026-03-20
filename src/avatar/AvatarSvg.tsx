import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BodyPartId } from '@/types';
import { getBodyPartLabel } from '@/body/bodyRegionMeta';

export interface AvatarRegionAnchor {
  x: number;
  y: number;
  rx: number;
  ry: number;
  rotation?: number;
}

export interface AvatarRegionShape {
  id: BodyPartId;
  label: string;
  side: 'front' | 'back';
  path: string;
  hitPath?: string;
  anchor: AvatarRegionAnchor;
}

interface AvatarSvgProps {
  side: 'front' | 'back';
  children: (region: AvatarRegionShape) => React.ReactNode;
}

const frontPaths: Record<BodyPartId, string> = {
  head: 'M180 44 C154 44 136 65 136 95 C136 129 153 155 180 160 C207 155 224 129 224 95 C224 65 206 44 180 44 Z',
  neck: 'M161 156 C168 168 192 168 199 156 L205 192 C194 202 166 202 155 192 Z',
  chest: 'M116 190 C131 175 153 169 180 169 C207 169 229 175 244 190 C256 220 258 260 249 298 C228 314 203 321 180 323 C157 321 132 314 111 298 C102 260 104 220 116 190 Z',
  abdomen: 'M118 298 C136 314 158 323 180 325 C202 323 224 314 242 298 C246 333 243 372 232 410 C214 424 197 432 180 434 C163 432 146 424 128 410 C117 372 114 333 118 298 Z',
  pelvis: 'M127 410 C144 425 160 432 180 434 C200 432 216 425 233 410 C243 433 245 463 239 495 C223 512 201 520 180 520 C159 520 137 512 121 495 C115 463 117 433 127 410 Z',
  leftArm: 'M246 192 C268 212 282 245 287 294 C290 326 286 363 277 400 C267 407 258 407 250 401 C246 360 241 321 236 289 C231 257 233 224 246 192 Z',
  rightArm: 'M114 192 C92 212 78 245 73 294 C70 326 74 363 83 400 C93 407 102 407 110 401 C114 360 119 321 124 289 C129 257 127 224 114 192 Z',
  leftHand: 'M251 400 C265 397 279 400 287 414 C292 429 291 445 283 458 C271 464 259 462 249 454 C244 439 244 418 251 400 Z',
  rightHand: 'M109 400 C95 397 81 400 73 414 C68 429 69 445 77 458 C89 464 101 462 111 454 C116 439 116 418 109 400 Z',
  leftThigh: 'M191 495 C210 498 224 512 232 540 C238 576 237 618 230 660 C221 674 210 677 198 672 C192 620 189 561 191 495 Z',
  rightThigh: 'M169 495 C150 498 136 512 128 540 C122 576 123 618 130 660 C139 674 150 677 162 672 C168 620 171 561 169 495 Z',
  leftLeg: 'M198 672 C210 676 220 675 230 660 C236 706 236 756 227 804 C217 820 206 824 194 820 C192 772 193 723 198 672 Z',
  rightLeg: 'M162 672 C150 676 140 675 130 660 C124 706 124 756 133 804 C143 820 154 824 166 820 C168 772 167 723 162 672 Z',
  leftFoot: 'M194 820 C211 820 226 823 240 833 C243 845 238 853 225 858 C209 859 194 855 183 846 C181 835 184 827 194 820 Z',
  rightFoot: 'M166 820 C149 820 134 823 120 833 C117 845 122 853 135 858 C151 859 166 855 177 846 C179 835 176 827 166 820 Z',
};

const backPaths: Record<BodyPartId, string> = {
  head: 'M180 44 C154 44 136 65 136 96 C136 128 154 152 180 158 C206 152 224 128 224 96 C224 65 206 44 180 44 Z',
  neck: 'M162 154 C170 164 190 164 198 154 L202 187 C193 198 167 198 158 187 Z',
  chest: 'M115 188 C134 173 156 168 180 168 C204 168 226 173 245 188 C254 219 254 255 245 290 C222 305 202 312 180 314 C158 312 138 305 115 290 C106 255 106 219 115 188 Z',
  abdomen: 'M121 289 C138 303 159 312 180 314 C201 312 222 303 239 289 C243 321 241 356 232 392 C216 404 198 411 180 413 C162 411 144 404 128 392 C119 356 117 321 121 289 Z',
  pelvis: 'M129 392 C147 405 163 412 180 413 C197 412 213 405 231 392 C244 412 248 443 244 485 C230 505 208 517 180 520 C152 517 130 505 116 485 C112 443 116 412 129 392 Z',
  leftArm: 'M248 191 C268 211 281 244 284 289 C286 323 282 358 274 394 C264 401 255 402 247 396 C244 357 240 319 235 282 C232 246 236 216 248 191 Z',
  rightArm: 'M112 191 C92 211 79 244 76 289 C74 323 78 358 86 394 C96 401 105 402 113 396 C116 357 120 319 125 282 C128 246 124 216 112 191 Z',
  leftHand: 'M248 395 C261 393 274 396 284 409 C290 423 290 439 284 454 C274 460 263 460 252 455 C245 441 244 423 248 395 Z',
  rightHand: 'M112 395 C99 393 86 396 76 409 C70 423 70 439 76 454 C86 460 97 460 108 455 C115 441 116 423 112 395 Z',
  leftThigh: 'M191 486 C209 489 223 504 230 534 C235 568 234 610 229 654 C221 667 210 670 199 666 C193 613 190 553 191 486 Z',
  rightThigh: 'M169 486 C151 489 137 504 130 534 C125 568 126 610 131 654 C139 667 150 670 161 666 C167 613 170 553 169 486 Z',
  leftLeg: 'M199 666 C210 670 220 668 229 654 C235 703 234 751 225 801 C216 815 206 819 195 815 C193 767 194 718 199 666 Z',
  rightLeg: 'M161 666 C150 670 140 668 131 654 C125 703 126 751 135 801 C144 815 154 819 165 815 C167 767 166 718 161 666 Z',
  leftFoot: 'M195 815 C210 815 224 819 236 828 C240 838 236 846 225 851 C210 852 196 849 184 840 C182 830 185 822 195 815 Z',
  rightFoot: 'M165 815 C150 815 136 819 124 828 C120 838 124 846 135 851 C150 852 164 849 176 840 C178 830 175 822 165 815 Z',
};

export const AVATAR_REGION_ANCHORS: Record<BodyPartId, { front: AvatarRegionAnchor; back: AvatarRegionAnchor }> = {
  head: {
    front: { x: 180, y: 102, rx: 34, ry: 42 },
    back: { x: 180, y: 102, rx: 34, ry: 42 },
  },
  neck: {
    front: { x: 180, y: 176, rx: 18, ry: 18 },
    back: { x: 180, y: 172, rx: 18, ry: 18 },
  },
  chest: {
    front: { x: 180, y: 246, rx: 78, ry: 74 },
    back: { x: 180, y: 240, rx: 82, ry: 76 },
  },
  abdomen: {
    front: { x: 180, y: 366, rx: 64, ry: 64 },
    back: { x: 180, y: 350, rx: 60, ry: 58 },
  },
  pelvis: {
    front: { x: 180, y: 468, rx: 72, ry: 52 },
    back: { x: 180, y: 468, rx: 78, ry: 56 },
  },
  leftArm: {
    front: { x: 260, y: 298, rx: 34, ry: 96, rotation: 6 },
    back: { x: 258, y: 292, rx: 34, ry: 96, rotation: 5 },
  },
  rightArm: {
    front: { x: 100, y: 298, rx: 34, ry: 96, rotation: -6 },
    back: { x: 102, y: 292, rx: 34, ry: 96, rotation: -5 },
  },
  leftHand: {
    front: { x: 268, y: 430, rx: 26, ry: 34, rotation: 8 },
    back: { x: 266, y: 425, rx: 26, ry: 34, rotation: 8 },
  },
  rightHand: {
    front: { x: 92, y: 430, rx: 26, ry: 34, rotation: -8 },
    back: { x: 94, y: 425, rx: 26, ry: 34, rotation: -8 },
  },
  leftThigh: {
    front: { x: 210, y: 584, rx: 34, ry: 98, rotation: 2 },
    back: { x: 210, y: 574, rx: 34, ry: 96, rotation: 2 },
  },
  rightThigh: {
    front: { x: 150, y: 584, rx: 34, ry: 98, rotation: -2 },
    back: { x: 150, y: 574, rx: 34, ry: 96, rotation: -2 },
  },
  leftLeg: {
    front: { x: 211, y: 742, rx: 28, ry: 92, rotation: 2 },
    back: { x: 210, y: 738, rx: 28, ry: 92, rotation: 2 },
  },
  rightLeg: {
    front: { x: 149, y: 742, rx: 28, ry: 92, rotation: -2 },
    back: { x: 150, y: 738, rx: 28, ry: 92, rotation: -2 },
  },
  leftFoot: {
    front: { x: 210, y: 840, rx: 30, ry: 18, rotation: 8 },
    back: { x: 210, y: 835, rx: 28, ry: 18, rotation: 6 },
  },
  rightFoot: {
    front: { x: 150, y: 840, rx: 30, ry: 18, rotation: -8 },
    back: { x: 150, y: 835, rx: 28, ry: 18, rotation: -6 },
  },
};

function buildHitPath(path: string, anchor: AvatarRegionAnchor): string {
  const { x, y, rx, ry } = anchor;
  const padX = Math.max(10, rx * 0.25);
  const padY = Math.max(10, ry * 0.25);
  const ellipse = `M ${x - rx - padX} ${y} a ${rx + padX} ${ry + padY} 0 1 0 ${(rx + padX) * 2} 0 a ${rx + padX} ${ry + padY} 0 1 0 -${(rx + padX) * 2} 0`;
  return `${path} ${ellipse}`;
}

function getRegions(side: 'front' | 'back'): AvatarRegionShape[] {
  const pathMap = side === 'front' ? frontPaths : backPaths;

  return (Object.keys(pathMap) as BodyPartId[]).map((id) => {
    const anchor = AVATAR_REGION_ANCHORS[id][side];
    return {
      id,
      label: getBodyPartLabel(id),
      side,
      path: pathMap[id],
      hitPath: buildHitPath(pathMap[id], anchor),
      anchor,
    };
  });
}

export const AvatarSvg: React.FC<AvatarSvgProps> = ({ side, children }) => {
  const regions = getRegions(side);

  return (
    <AnimatePresence mode="wait">
      <motion.g
        key={side}
        initial={{ opacity: 0, x: side === 'front' ? -8 : 8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: side === 'front' ? 8 : -8 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <ellipse cx="180" cy="848" rx="108" ry="18" fill="rgba(20, 28, 38, 0.05)" />
        {regions.map((region) => children(region))}
      </motion.g>
    </AnimatePresence>
  );
};
