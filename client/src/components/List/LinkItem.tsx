import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import Button from '../Button'
import './LinkItem.scss'

type Props = {
  children: ReactNode,
  to: string,
}

const LinkItem = ({ children, to }: Props) => {
  return (
    <Button color='black' linkTo={to} fillParent flat>
      {children}
    </Button>
  )
}

export default LinkItem
