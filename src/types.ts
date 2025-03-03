export interface EquipmentItem {
  slot: string;
  bestInSlot: string;
  secondaryOption: string;
  tertiaryOption: string;
  location?: string; // Optional location type for filtering
}

export interface AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface SpellRecommendation {
  level: number;
  name: string;
  description: string;
  isHighlighted?: boolean;
}

export interface ActData {
  id: string;
  name: string;
  equipmentData: EquipmentItem[];
}

export interface ClassData {
  id: string;
  name: string;
  description: string;
  abilityScores: AbilityScores;
  acts: ActData[];
  spells: SpellRecommendation[];
}

// Location types for filtering
export type LocationType = 'all' | 'vendor' | 'quest' | 'loot' | 'craft' | 'boss';

// Tab types
export type TabType = 'armor' | 'spells';