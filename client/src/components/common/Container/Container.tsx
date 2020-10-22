import React from 'react'
import classNames from 'classnames'
import { MightHaveChildren } from '../../../types'
import { numToRem } from '../../../helpers'
import './Container.scss'

interface Props extends MightHaveChildren {
  className?: string
  centered?: boolean
  maxWidth?: number
  minWidth?: number
}

export const Container = ({
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
