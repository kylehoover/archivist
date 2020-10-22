import React from 'react'
import { Alert } from './Alert'

interface Props {
  children: string,
  flat?: boolean,
}

export const Info = ({ children, flat }: Props) => {
  return (
    <Alert color='cyan' icon='info' flat={flat}>
      {children}
    </Alert>
  )
}
