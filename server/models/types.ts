export enum Ability {
  Strength = 'strength',
  Dexterity = 'dexterity',
  Constitution = 'constitution',
  Intelligence = 'intelligence',
  Wisdom = 'wisdom',
  Charisma = 'charisma',
}

export interface AbilityScoreIncrease {
  ability: Ability
  value: number
}

export enum Alignment {
  Lawful = 'lawful',
  Neutral = 'neutral',
  Chaotic = 'chaotic',
  Good = 'good',
  Evil = 'evil',
}

export interface MightBeSystemRecord {
  isSystemRecord: boolean
}

export enum Size {
  Tiny = 'tiny',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  Huge = 'huge',
  Gargantuan = 'gargantuan',
}
