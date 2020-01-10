import React from 'react'

import './Input.scss'

type Props = {
  label: string,
  labelPosition?: 'embedded' | 'left' | 'top',
  name: string,
}

const Input = ({
  label,
  labelPosition = 'top',
  name,
}: Props) => {
  return (
    <div className={`Input label-${labelPosition}`}>
      <input
        name={name}
        type='text'
      />
      <label htmlFor={name}>
        {label}
      </label>
    </div>
  )
}

export default Input
