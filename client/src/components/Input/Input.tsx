import React, { useState } from 'react'
import classNames from 'classnames'

import { numToRem } from '../../util'
import './Input.scss'

type Props = {
  label: string,
  labelPosition?: 'embedded' | 'left' | 'top',
  maxWidth?: number,
  name: string,
  type?: 'number' | 'text',
  width?: number,
}

const Input = ({
  label,
  labelPosition = 'embedded',
  maxWidth,
  name,
  type = 'text',
  width,
}: Props) => {
  const [ inputValue, setInputValue ] = useState('')
  const hasValue = inputValue !== ''

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
        step='any'
        type={type}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <label htmlFor={name}>
        {label}
      </label>
    </div>
  )
}

export default Input
