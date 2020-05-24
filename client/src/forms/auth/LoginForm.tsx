import React from 'react'

import { Button, Form, Input } from '../../components'

type FormData = {
  email: string
}

const onSubmit = (data: FormData) => {
  console.log(data)
}

const LoginForm = () => {
  return (
    <Form onSubmit={onSubmit}>
      <Input
        label='Email'
        name='email'
        validationOptions={{
          maxLength: 100,
          required: true,
        }}
      />
      <Input
        label='Password'
        name='password'
        className='mb-1'
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
