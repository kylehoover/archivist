import React, { ReactNode } from 'react'
import { observer } from 'mobx-react-lite'
import { Info } from '../Alert'
import './List.scss'

interface Props<T> {
  items?: T[],
  itemsEmptyText?: string,
  renderItem: (item: T, index: number) => ReactNode,
}

export const List = observer(<T extends unknown>({
  items = [],
  itemsEmptyText = 'There are no items in this list',
  renderItem,
}: Props<T>) => {
  if (items.length === 0) {
    return (
      <Info>
        {itemsEmptyText}
      </Info>
    )
  }

  return (
    <div className='List'>
      {items.map((item, index) => (
        <div className='item' key={index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  )
})

