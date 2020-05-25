import React, { createContext, useMemo } from 'react'

import RootStore from './RootStore'

type Props = {
  children?: React.ReactNode
}

export const StoreContext = createContext<RootStore | null>(null)

const StoreProvider = ({ children }: Props) => {
  const store = useMemo(() => new RootStore(), [])

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
