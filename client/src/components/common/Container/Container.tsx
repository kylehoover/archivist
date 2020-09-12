import React, { ReactNode } from 'react'
import classNames from 'classnames'

import { numToRem } from '../../../util'
import './Container.scss'

type Props = {
  className?: string
  centered?: boolean
  children?: ReactNode
  maxWidth?: number
  minWidth?: number
}

const Container = ({
  className,
  centered = false,
  children,
  maxWidth,
  minWidth,
}: Props) => {
  return (
    <div
      className={classNames('Container', className, { centered })}
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
