import { useEffect } from "react";
import { Race } from "./raceTypes";
import { fetchRaces } from "../graphql";
import { useAsync } from "../helpers";
import { useStore } from "../stores";

export function useRacesLoader(): Race[] {
  const raceStore = useStore((store) => store.raceStore);
  console.log("hook", raceStore.loadStatus);
  const [loadRaces] = useAsync(fetchRaces, {
    loadStatus: raceStore.loadStatus,
    onSuccess: (data) => {
      if (data) {
        raceStore.addRaces(data);
      }
    },
    updateLoadStatus: raceStore.setLoadStatus,
  });

  // useEffect(() => {
  //   if (raceStore.races.length === 0) {
  //     loadRaces();
  //   }
  // }, [loadRaces, raceStore.races.length]);

  return raceStore.races;
}
