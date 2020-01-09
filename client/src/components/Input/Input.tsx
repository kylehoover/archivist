import React from 'react'

import './Input.scss'

type Props = {
  label: string,
}

const Input = ({ label }: Props) => {
  return (
    <div className='Input'>
      <label>
        {label}
      </label>
      <input
        type='text'
      />
    </div>
  )
}

export default Input
