import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { ValidationOptions, useFormContext } from 'react-hook-form'

import { isEmpty, numToRem } from '../../util'
import './Input.scss'

type Props = {
  className?: string
  label: string
  labelPosition?: 'embedded' | 'left' | 'top'
  maxWidth?: number
  name: string
  type?: 'password' | 'text'
  validationOptions?: ValidationOptions
  width?: number
}

const Input = ({
  className,
  label,
  labelPosition = 'embedded',
  maxWidth,
  name,
  type = 'text',
  validationOptions = {},
  width,
}: Props) => {
  const { errors, register } = useFormContext()
  const [hasValue, setHasValue] = useState(false)
  const inputElement = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (inputElement.current !== null) {
      inputElement.current.onblur = () => {
        setHasValue(!isEmpty(inputElement.current?.value))
      }

      return () => {
        if (inputElement.current !== null) {
          inputElement.current.onblur = null
        }
      }
    }
  }, [])

  console.log(errors)

  return (
    <div
      className={classNames('Input', `label-${labelPosition}`, className)}
      style={{
        maxWidth: numToRem(maxWidth),
        width: numToRem(width),
      }}
    >
      <input
        className={classNames({ hasValue })}
        name={name}
        ref={(element) => {
          register(element!, validationOptions)
          inputElement.current = element
        }}
        type={type}
      />
      <label htmlFor={name}>
        {label}
      </label>
    </div>
  )
}

export default Input
