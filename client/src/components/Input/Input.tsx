import React from 'react'
import classNames from 'classnames'

import { numToRem } from '../../util'
import './Input.scss'

type Props = {
  label: string,
  labelPosition?: 'embedded' | 'left' | 'top',
  maxWidth?: number,
  name: string,
  register: any,
  type?: 'number' | 'text',
  watch: any,
  width?: number,
}

const Input = ({
  label,
  labelPosition = 'embedded',
  maxWidth,
  name,
  register,
  type = 'text',
  watch,
  width,
}: Props) => {
  let hasValue = false

  if (labelPosition === 'embedded') {
    hasValue = watch(name, '') !== ''
  }

  return (
    <div
      className={classNames(`Input label-${labelPosition}`)}
      style={{
        maxWidth: numToRem(maxWidth),
        width: numToRem(width),
      }}
    >
      <input
        className={classNames({ hasValue })}
        name={name}
        ref={register}
        step='any'
        type={type}
      />
      <label htmlFor={name}>
        {label}
      </label>
    </div>
  )
}

export default Input
