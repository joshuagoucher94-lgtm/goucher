export type ShapeType = "crescent" | "triangle" | "bar";
export type MirrorSide = "left" | "right" | "none";

export type SlotId = "top-left" | "top-right" | "middle-left" | "middle-right" | "bottom-left" | "bottom-right";

export type Slot = {
  id: SlotId;
  x: number;
  y: number;
  requiredRotation: number;
  row: 0 | 1 | 2;
};

export type FragmentDefinition = {
  id: string;
  shape: ShapeType;
  dots: number;
  side: MirrorSide;
  isCorrect: boolean;
  targetSlot?: SlotId;
  requiredRotation: number;
  scale?: number;
  label: string;
};

export type FragmentState = FragmentDefinition & {
  x: number;
  y: number;
  rotation: number;
  locked: boolean;
};

export const BOARD_WIDTH = 420;
export const BOARD_HEIGHT = 520;
export const FRAGMENT_SIZE = 82;
export const STARTING_ENERGY = 16;
export const SNAP_DISTANCE = 34;

export const slots: Slot[] = [
  { id: "top-left", x: -62, y: -126, requiredRotation: 0, row: 0 },
  { id: "top-right", x: 62, y: -126, requiredRotation: 0, row: 0 },
  { id: "middle-left", x: -62, y: -12, requiredRotation: 0, row: 1 },
  { id: "middle-right", x: 62, y: -12, requiredRotation: 0, row: 1 },
  { id: "bottom-left", x: -62, y: 106, requiredRotation: 0, row: 2 },
  { id: "bottom-right", x: 62, y: 106, requiredRotation: 0, row: 2 },
];

export const fragmentDefinitions: FragmentDefinition[] = [
  { id: "crescent-left-1", shape: "crescent", dots: 1, side: "left", isCorrect: true, targetSlot: "top-left", requiredRotation: 0, label: "Left crescent, one point" },
  { id: "crescent-right-1", shape: "crescent", dots: 1, side: "right", isCorrect: true, targetSlot: "top-right", requiredRotation: 0, label: "Right crescent, one point" },
  { id: "triangle-left-2", shape: "triangle", dots: 2, side: "left", isCorrect: true, targetSlot: "middle-left", requiredRotation: 0, label: "Left triangle, two points" },
  { id: "triangle-right-2", shape: "triangle", dots: 2, side: "right", isCorrect: true, targetSlot: "middle-right", requiredRotation: 0, label: "Right triangle, two points" },
  { id: "bar-left-3", shape: "bar", dots: 3, side: "left", isCorrect: true, targetSlot: "bottom-left", requiredRotation: 0, label: "Left bar, three points" },
  { id: "bar-right-3", shape: "bar", dots: 3, side: "right", isCorrect: true, targetSlot: "bottom-right", requiredRotation: 0, label: "Right bar, three points" },
  { id: "decoy-crescent-2", shape: "crescent", dots: 2, side: "left", isCorrect: false, requiredRotation: 0, label: "Crescent decoy with two points" },
  { id: "decoy-triangle-wrong", shape: "triangle", dots: 2, side: "left", isCorrect: false, requiredRotation: 45, label: "Triangle decoy with broken angle" },
  { id: "decoy-bar-4", shape: "bar", dots: 4, side: "right", isCorrect: false, requiredRotation: 0, label: "Bar decoy with four points" },
  { id: "decoy-small-crescent", shape: "crescent", dots: 1, side: "right", isCorrect: false, requiredRotation: 0, scale: 0.78, label: "Small crescent decoy" },
];

export function normalizeRotation(rotation: number) {
  return ((rotation % 360) + 360) % 360;
}

export function isRotationMatch(a: number, b: number) {
  return normalizeRotation(a) === normalizeRotation(b);
}

export function slotToPosition(slot: Slot) {
  return {
    x: BOARD_WIDTH / 2 + slot.x - FRAGMENT_SIZE / 2,
    y: BOARD_HEIGHT / 2 + slot.y - FRAGMENT_SIZE / 2,
  };
}

export function getTargetSlot(fragment: FragmentDefinition) {
  return slots.find((slot) => slot.id === fragment.targetSlot);
}
