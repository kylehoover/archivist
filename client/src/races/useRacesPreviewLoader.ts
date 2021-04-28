import { ReactNode } from "react";
import { RacePreview } from "./raceTypes";
import { fetchRacesPreview } from "../graphql";
import { useAsync } from "../helpers";
import { useRaceStore } from "../stores";

export function useRacesPreviewLoader(): [RacePreview[], any] {
  const raceStore = useRaceStore();

  const [, , LoadingPlaceholder] = useAsync(fetchRacesPreview, {
    key: "racesPreview",
    runImmediately: true,
    onSuccess: (data) => {
      if (data) {
        raceStore.setRacesPreview(data);
      }
    },
  });

  return [raceStore.racesPreview, LoadingPlaceholder];
}
