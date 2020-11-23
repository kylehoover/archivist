export enum Ability {
  Strength = 'strength',
  Dexterity = 'dexterity',
  Constitution = 'constitution',
  Intelligence = 'intelligence',
  Wisdom = 'wisdom',
  Charisma = 'charisma',
}

export enum Alignment {
  Lawful = 'lawful',
  Neutral = 'neutral',
  Chaotic = 'chaotic',
  Good = 'good',
  Evil = 'evil',
}

export enum Language {
  Common = 'Common',
  Draconic = 'Draconic',
  Dwarvish = 'Dwarvish',
  Elvish = 'Elvish',
  Gnomish = 'Gnomish',
  Halfling = 'Halfling',
  Infernal = 'Infernal',
  Orc = 'Orc',
}

export enum Size {
  Tiny = 'tiny',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  Huge = 'huge',
  Gargantuan = 'gargantuan',
}

export interface AbilityScoreIncrease {
  ability: Ability | null
  isUserChosen: boolean
  value: number
}

export interface AgeInfo {
  description: string
}

export interface AlignmentInfo {
  description: string
  tendency: Alignment[]
}

export interface AsiInfo {
  description: string
  abilityScoreIncreases: AbilityScoreIncrease[]
}

export interface DateFields extends ModifiedAt {
  createdAt: Date
}

export interface LanguagesInfo {
  description: string
  languages: string[]
}

export interface MightBeSystemRecord {
  isSystemRecord: boolean
}

export interface ModifiedAt {
  modifiedAt: Date
}

export interface RacialTrait {
  name: string
  description: string
}

export interface SizeInfo {
  description: string
  size: Size
}

export interface SpeedInfo {
  description: string
  walk: number
}
