import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { FieldError, ValidationOptions, useFormContext } from 'react-hook-form'

import { isEmpty, numToRem } from '../../util'
import './Input.scss'

type Props = {
  className?: string
  disabled?: boolean
  label: string
  labelPosition?: 'embedded' | 'left' | 'top'
  maxWidth?: number
  name: string
  type?: 'password' | 'text'
  validationOptions?: ValidationOptions
  width?: number
}

type ErrorMessageProps = {
  error: FieldError
  validationOptions: ValidationOptions
}

const ErrorMessage = ({ error, validationOptions }: ErrorMessageProps) => {
  if (error === undefined) {
    return null
  }

  let message = error.message

  if (!message) {
    if (error.type === 'max') {
      message = `Max value: ${validationOptions.max}`
    } else if (error.type === 'min') {
      message = `Min value: ${validationOptions.min}`
    } else if (error.type === 'maxLength') {
      message = `Max length: ${validationOptions.maxLength}`
    } else if (error.type === 'minLength') {
      message = `Min length: ${validationOptions.minLength}`
    } else if (error.type === 'required') {
      message = 'This field is required'
    } else {
      message = 'Invalid value'
    }
  }

  return (
    <div className='ErrorMessage'>
      {message}
    </div>
  )
}

const Input = ({
  className,
  disabled = false,
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
  const hasError = errors[name] !== undefined

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

  return (
    <div
      className={classNames('Input', `label-${labelPosition}`, className)}
      style={{
        maxWidth: numToRem(maxWidth),
        width: numToRem(width),
      }}
    >
      <input
        name={name}
        type={type}
        className={classNames({ hasValue, invalid: hasError })}
        disabled={disabled}
        ref={(element) => {
          register(element!, validationOptions)
          inputElement.current = element
        }}
      />
      <label htmlFor={name}>
        {label}
      </label>
      <ErrorMessage error={errors[name]} validationOptions={validationOptions} />
    </div>
  )
}

export default Input
