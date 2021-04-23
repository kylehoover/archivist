import { makeAutoObservable } from "mobx";
import { Race, RacePreview } from "./raceTypes";

export interface RaceStore {
  races: Race[];
  racesById: { [id: string]: Race };
  racesPreview: RacePreview[];
  addRaces(races: Race[]): void;
  setRacesPreview(races: RacePreview[]): void;
}

export function createRaceStore(): RaceStore {
  return makeAutoObservable<RaceStore>({
    // properties
    racesById: {},
    racesPreview: [],

    // computed
    get races(): Race[] {
      return Object.values(this.racesById);
    },

    //actions
    addRaces(races: Race[]): void {
      races.forEach((race) => {
        this.racesById[race.id] = race;
      });
    },

    setRacesPreview(races: RacePreview[]): void {
      this.racesPreview = races;
    },
  });
}
