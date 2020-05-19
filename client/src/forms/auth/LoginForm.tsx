import React from 'react'

import { Form, Input } from '../../components'

type Inputs = {
  email: string
}

const onSubmit = (data: Inputs) => {
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
    </Form>
  )
}

export default LoginForm
