import React, { useState } from 'react'
import classNames from 'classnames'

import { numToRem } from '../../util'
import './Input.scss'

type Props = {
  label: string,
  labelPosition?: 'embedded' | 'left' | 'top',
  maxWidth?: number,
  name: string,
  width?: number,
}

const Input = ({
  label,
  labelPosition = 'embedded',
  maxWidth,
  name,
  width,
}: Props) => {
  const [ nameVal, setNameVal ] = useState('')
  const hasValue = nameVal !== ''

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
        type='text'
        value={nameVal}
        onChange={e => setNameVal(e.target.value)}
      />
      <label htmlFor={name}>
        {label}
      </label>
    </div>
  )
}

export default Input
