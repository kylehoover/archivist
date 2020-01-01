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
    <div className='LinkItem'>
      <Button onClick={() => {}}>
        button
      </Button>
      <Button onClick={() => {}} outlined>
        button
      </Button>
      <Button onClick={() => {}} flat>
        button
      </Button>
    </div>
  )

  return (
    <Link className='LinkItem' to={to}>
      {children}
    </Link>
  )
}

export default LinkItem
