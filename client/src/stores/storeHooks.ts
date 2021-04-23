import { useContext } from "react";
import { RaceStore } from "../races";
import { PlainStore, PlainStoreContext } from "./PlainStoreProvider";

export function useStore(): PlainStore;
export function useStore<T>(selector: (store: PlainStore) => T): T;
export function useStore<T>(
  selector?: (store: PlainStore) => T
): PlainStore | T {
  const store = useContext(PlainStoreContext);

  if (store === null) {
    throw Error("Store has not been initialized");
  }

  if (selector) {
    return selector(store);
  }

  return store;
}

export function useRaceStore(): RaceStore {
  return useStore((store) => store.raceStore);
}
