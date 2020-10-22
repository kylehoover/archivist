import React from 'react'
import { Button } from '../Button'
import { HasChildren } from '../../../types'
import './LinkItem.scss'

interface Props extends HasChildren {
  to: string
}

export const LinkItem = ({ children, to }: Props) => {
  return (
    <Button color='black' linkTo={to} fillParent flat>
      {children}
    </Button>
  )
}
