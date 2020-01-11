import React, { ReactNode } from 'react'
import classNames from 'classnames'

import { numToRem } from '../../util'
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
        maxWidth: numToRem(maxWidth),
        minWidth: numToRem(minWidth),
      }}
    >
      {children}
    </div>
  )
}

export default Container
