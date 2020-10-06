import React, { ReactNode, createContext, useMemo } from 'react'

import { RootStore } from './root'

type Props = {
  children?: ReactNode
}

export const StoreContext = createContext<RootStore | null>(null)

export const StoreProvider = ({ children }: Props) => {
  const store = useMemo(() => new RootStore(), [])

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}
