import { useEffect } from "react";
import { Race } from "./raceTypes";
import { fetchRaces } from "../graphql";
import { useAsync } from "../helpers";
import { useStore } from "../stores";

export function useRacesLoader(): Race[] {
  const raceStore = useStore((store) => store.raceStore);
  const [loadRaces] = useAsync(fetchRaces, {
    onSuccess: (data) => {
      if (data) {
        raceStore.addRaces(data);
      }
    },
  });

  // useEffect(() => {
  //   if (raceStore.races.length === 0) {
  //     loadRaces();
  //   }
  // }, [loadRaces, raceStore.races.length]);

  return raceStore.races;
}
