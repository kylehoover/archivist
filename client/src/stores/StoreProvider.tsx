import React, { createContext, useMemo } from 'react'
import { MightHaveChildren } from '../types'
import { RootStore } from './root'

interface Props extends MightHaveChildren {}

export const StoreContext = createContext<RootStore | null>(null)

export const StoreProvider = ({ children }: Props) => {
  const store = useMemo(() => new RootStore(), [])

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}
