import React from 'react'

import Alert from './Alert'

type Props = {
  children: string,
  flat?: boolean,
}

const Info = ({ children, flat }: Props) => {
  return (
    <Alert color='cyan' icon='info' flat={flat}>
      {children}
    </Alert>
  )
}

export default Info
