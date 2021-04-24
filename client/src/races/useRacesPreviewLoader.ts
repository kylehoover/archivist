import { RacePreview } from "./raceTypes";
import { fetchRacesPreview } from "../graphql";
import { useAsync } from "../helpers";
import { useRaceStore } from "../stores";

export function useRacesPreviewLoader(): RacePreview[] {
  const raceStore = useRaceStore();

  useAsync(fetchRacesPreview, {
    key: "racesPreview",
    runImmediately: true,
    onSuccess: (data) => {
      if (data) {
        raceStore.setRacesPreview(data);
      }
    },
  });

  return raceStore.racesPreview;
}
