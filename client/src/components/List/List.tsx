import React from 'react'
import classNames from 'classnames'

import './List.scss'

type Props = {
  items?: any[],
  textIfEmpty?: string,
}

const List = ({
  items = [],
  textIfEmpty = 'There are no items in this list',
}: Props) => {
  const isEmpty = items.length === 0

  return (
    <div className='List'>
      {isEmpty &&
        <div className='empty-list-text'>
          <i className='material-icons'>info</i>
          {textIfEmpty}
        </div>
      }

      {items.map((item, index) => (
        <div className='item' key={index}>
          Item: {item}
        </div>
      ))}
    </div>
  )
}

export default List
