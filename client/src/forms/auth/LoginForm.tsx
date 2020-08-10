import React, { useState } from 'react'
import isEmail from 'validator/lib/isEmail'
import { useHistory } from 'react-router-dom'

import { Button, Form, Input, InputError } from '../../components'
import { RequestErrorType } from '../../graphql'
import { useStores } from '../../stores'

export type LoginFormData = {
  email: string
  password: string
}

const LoginForm = () => {
  const [disabled, setDisabled] = useState(false)
  const [loginFailed, setLoginFailed] = useState(false)
  const { userStore } = useStores()
  const history = useHistory()

  const loginError: InputError | undefined = loginFailed ?
    { type: 'manual', message: 'Invalid credentials', shouldFocus: true } :
    undefined

  const handleSubmit = async (data: LoginFormData) => {
    setDisabled(true)
    setLoginFailed(false)

    try {
      await userStore.loginUser(data.email, data.password)
    } catch (err) {
      setDisabled(false)
      
      if (err.type === RequestErrorType.InvalidCredentials) {
        setLoginFailed(true)
      } else {
        // TODO: display toast that we failed to communicate with the server
      }

      return
    }

    history.replace('/home/')
  }

  return (
    <Form onSubmit={handleSubmit}>
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
        error={loginError}
        validationOptions={{
          maxLength: 100,
          required: true,
        }}
      />
      <Button type='submit' disabled={disabled}>
        Log In
      </Button>
    </Form>
  )
}

export default LoginForm
