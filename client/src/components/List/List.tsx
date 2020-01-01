import React from 'react'

import { Info } from '../Alert'
import './List.scss'

type Props = {
  items?: any[],
  textIfEmpty?: string,
}

const List = ({
  items = [],
  textIfEmpty = 'There are no items in this list',
}: Props) => {
  if (items.length === 0) {
    return (
      <Info>
        {textIfEmpty}
      </Info>
    )
  }

  return (
    <div className='List'>
      {items.map((item, index) => (
        <div className='item' key={index}>
          Item: {item}
        </div>
      ))}
    </div>
  )
}

export default List
