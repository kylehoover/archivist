import { createContext } from "react";
import { HasChildren } from "../types";
import { createRaceStore, RaceStore } from "../races";

interface Props extends HasChildren {}

export interface PlainStore {
  raceStore: RaceStore;
}

export const PlainStoreContext = createContext<PlainStore | null>(null);

export function PlainStoreProvider(props: Props) {
  const { children } = props;
  const store: PlainStore = {
    raceStore: createRaceStore(),
  };

  return (
    <PlainStoreContext.Provider value={store}>
      {children}
    </PlainStoreContext.Provider>
  );
}
