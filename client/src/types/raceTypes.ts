import { HasDescription, MightBeSystemRecord, Model } from "./generalTypes";

export const abilities = ["str", "dex", "con", "int", "wis", "cha"] as const;
export type Ability = typeof abilities[number];

// export enum Ability {
//   Strength = "strength",
//   Dexterity = "dexterity",
//   Constitution = "constitution",
//   Intelligence = "intelligence",
//   Wisdom = "wisdom",
//   Charisma = "charisma",
// }

export enum Alignment {
  Lawful = "lawful",
  Neutral = "neutral",
  Chaotic = "chaotic",
  Good = "good",
  Evil = "evil",
}

export enum Language {
  Common = "Common",
  Draconic = "Draconic",
  Dwarvish = "Dwarvish",
  Elvish = "Elvish",
  Gnomish = "Gnomish",
  Halfling = "Halfling",
  Infernal = "Infernal",
  Orc = "Orc",
}

export enum Size {
  Tiny = "tiny",
  Small = "small",
  Medium = "medium",
  Large = "large",
  Huge = "huge",
  Gargantuan = "gargantuan",
}

export interface AbilityScoreIncrease {
  ability: Ability | null;
  isUserChosen: boolean;
  value: number;
}

export interface AgeInfo extends HasDescription {}

export interface AlignmentInfo extends HasDescription {
  tendency: Alignment[];
}

export interface AsiInfo extends HasDescription {
  abilityScoreIncreases: AbilityScoreIncrease[];
}

export interface LanguagesInfo extends HasDescription {
  languages: string[];
}

export interface RacialTrait extends HasDescription {
  name: string;
}

export interface SizeInfo extends HasDescription {
  size: Size;
}

export interface SpeedInfo extends HasDescription {
  walk: number;
}

export interface Race extends Model, HasDescription, MightBeSystemRecord {
  name: string;
  asiInfo: AsiInfo;
  ageInfo: AgeInfo;
  alignmentInfo: AlignmentInfo;
  sizeInfo: SizeInfo;
  speedInfo: SpeedInfo;
  languagesInfo: LanguagesInfo;
  traits: RacialTrait[];
  parentRaceId: string;
  subraceIds: string[];
  userId: string;
  version: string;
}
