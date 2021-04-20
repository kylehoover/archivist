import { makeAutoObservable } from "mobx";
import React, { createContext } from "react";
import { HasChildren } from "../types";
import { Race } from "../types/raceTypes";

interface Props extends HasChildren {}

interface PlainStore {
  races: { [id: string]: Race };
}

export const PlainStoreContext = createContext<PlainStore | null>(null);

export function PlainStoreProvider(props: Props) {
  const { children } = props;
  const store: PlainStore = makeAutoObservable({
    races: {},
  });

  return (
    <PlainStoreContext.Provider value={store}>
      {children}
    </PlainStoreContext.Provider>
  );
}
