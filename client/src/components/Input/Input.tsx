import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { FieldError, ValidationOptions, useFormContext } from 'react-hook-form'

import { numToRem, strIsEmpty } from '../../util'
import './Input.scss'

export type InputError = FieldError & {
  shouldFocus?: boolean
}

type Props = {
  className?: string
  disabled?: boolean
  error?: InputError
  label: string
  labelPosition?: 'embedded' | 'left' | 'top'
  maxWidth?: number
  name: string
  type?: 'password' | 'text'
  validationOptions?: ValidationOptions
  width?: number
}

type ErrorMessageProps = {
  error?: FieldError
  validationOptions: ValidationOptions
}

function getErrorMessage(error: FieldError, validationOptions: ValidationOptions): string {
  let message = (error.message || error.types?.message) as string

  if (!strIsEmpty(message)) {
    return message
  }

  switch (error.type) {
    case 'max': return `Max value: ${validationOptions.max}`
    case 'min': return `Min value: ${validationOptions.min}`
    case 'maxLength': return `Max length: ${validationOptions.maxLength}`
    case 'minLength': return `Min length: ${validationOptions.minLength}`
    case 'required': return 'This field is required'
    default: return 'Invalid value'
  }
}

const ErrorMessage = ({ error, validationOptions }: ErrorMessageProps) => {
  if (error === undefined) {
    return null
  }

  return (
    <div className='ErrorMessage'>
      {getErrorMessage(error, validationOptions)}
    </div>
  )
}

const Input = ({
  className,
  disabled = false,
  error,
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
  const fieldError: FieldError | undefined = errors[name] || error
  const hasError = fieldError !== undefined
  const shouldFocus = error?.shouldFocus

  useEffect(() => {
    if (inputElement.current !== null) {
      inputElement.current.onblur = () => {
        setHasValue(inputElement.current?.value !== '')
      }

      return () => {
        if (inputElement.current !== null) {
          inputElement.current.onblur = null
        }
      }
    }
  }, [])

  useEffect(() => {
    if (shouldFocus) {
      setTimeout(() => inputElement.current?.focus(), 10)
    }
  }, [shouldFocus])

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
      <ErrorMessage error={fieldError} validationOptions={validationOptions} />
    </div>
  )
}

export default Input
