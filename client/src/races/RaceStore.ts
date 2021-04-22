import { makeAutoObservable } from "mobx";
import { Race } from "./raceTypes";

export type LoadStatus = "notLoaded" | "loaded";

export interface RaceStore {
  loadStatus: LoadStatus;
  races: Race[];
  racesById: { [id: string]: Race };
  addRaces(races: Race[]): void;
  setLoadStatus(status: LoadStatus): void;
}

export function createRaceStore(): RaceStore {
  return makeAutoObservable<RaceStore>({
    // properties
    loadStatus: "notLoaded",
    racesById: {},

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

    setLoadStatus(status: LoadStatus): void {
      console.log("set", status);
      this.loadStatus = status;
    },
  });
}
