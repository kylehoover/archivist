import React from 'react'
import isEmail from 'validator/lib/isEmail'

import { Button, Form, Input } from '../../components'

export type LoginFormData = {
  email: string
  password: string
}

type Props = {
  disabled?: boolean,
  onSubmit: (data: LoginFormData) => void
}

const LoginForm = ({ disabled = false, onSubmit }: Props) => {
  return (
    <Form onSubmit={onSubmit}>
      <Input
        label='Email'
        name='email'
        disabled={disabled}
        validationOptions={{
          maxLength: 100,
          required: true,
          validate: value => isEmail(value) || 'Invalid email'
        }}
      />
      <Input
        label='Password'
        name='password'
        type='password'
        className='mb-1'
        disabled={disabled}
        validationOptions={{
          maxLength: 100,
          required: true,
        }}
      />
      <Button type='submit'>
        Log In
      </Button>
    </Form>
  )
}

export default LoginForm
