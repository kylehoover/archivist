import { makeAutoObservable } from "mobx";
import { Race } from "../types/raceTypes";

export interface RaceStore {
  races: Race[];
  racesById: { [id: string]: Race };
}

export function createRaceStore(): RaceStore {
  return makeAutoObservable({
    // properties
    racesById: {},

    // computed
    get races(): Race[] {
      return Object.values(this.racesById);
    },

    //actions
  });
}
