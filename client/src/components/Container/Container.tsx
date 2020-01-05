import React, { ReactNode } from 'react'
import classNames from 'classnames'

import './Container.scss'

type Props = {
  centered?: boolean,
  children?: ReactNode,
  maxWidth?: number,
  minWidth?: number,
}

const Container = ({
  centered = false,
  children,
  maxWidth,
  minWidth = 30,
}: Props) => {
  return (
    <div
      className={classNames('Container', { centered })}
      style={{
        maxWidth: maxWidth ? `${maxWidth}rem` : 'none',
        minWidth: `${minWidth}rem`,
      }}
    >
      {children}
    </div>
  )
}

export default Container
