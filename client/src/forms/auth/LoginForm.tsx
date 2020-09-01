import React, { useEffect } from 'react'
import isEmail from 'validator/lib/isEmail'
import { useHistory } from 'react-router-dom'

import { Button, Form, Input, InputError } from '../../components'
import { RequestError, RequestErrorType } from '../../graphql'
import { useAsync } from '../../hooks'
import { useStores } from '../../stores'

export type LoginFormData = {
  email: string
  password: string
}

const LoginForm = () => {
  const { userStore } = useStores()
  const history = useHistory()
  const {
    error,
    execute: loginUser,
    isPending,
    isSuccess,
  } = useAsync<void, RequestError>(userStore.loginUser)

  const loginError: InputError | undefined = error?.type === RequestErrorType.InvalidCredentials  ?
    { type: 'manual', message: 'Invalid credentials', shouldFocus: true } :
    undefined

  useEffect(() => {
    if (isSuccess) {
      history.replace('/home/')
    }
  }, [history, isSuccess])

  const handleSubmit = async (data: LoginFormData) => {
    await loginUser(data.email, data.password)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label='Email'
        name='email'
        disabled={isPending}
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
        disabled={isPending}
        error={loginError}
        validationOptions={{
          maxLength: 100,
          required: true,
        }}
      />
      <Button type='submit' disabled={isPending}>
        Log In
      </Button>
    </Form>
  )
}

export default LoginForm
