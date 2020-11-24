import React from 'react'
import classNames from 'classnames'
import { MightHaveClassName } from '../../types'
import './LoadingIndicator.scss'

type Size = 20 | 30

interface Props extends MightHaveClassName {
  size?: Size
}

export const LoadingIndicator = ({ className, size }: Props) => {
  const clsName = classNames('LoadingIndicator', className)
  const spinnerClsName = classNames('spinner', { [`size-${size}`]: !!size })

  return (
    <div className={clsName}>
      <div className={spinnerClsName} />
    </div>
  )
}
