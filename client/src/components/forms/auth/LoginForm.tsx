import React, { useMemo } from 'react'
import isEmail from 'validator/lib/isEmail'
import { useHistory } from 'react-router-dom'
import { Button, Form, Input, InputError } from '../../common'
import { RequestErrorType, isRequestErrorOfType } from '../../../graphql'
import { useAsync } from '../../../helpers'
import { useStores } from '../../../stores'

export interface LoginFormData {
  email: string
  password: string
}

const LoginForm = () => {
  const history = useHistory()
  const { userStore } = useStores()
  const [loginUser, { error, isPending }] = useAsync(userStore.loginUser)

  const loginError = useMemo<InputError | undefined>(() => {
    return isRequestErrorOfType(error, RequestErrorType.InvalidCredentials)  ?
      { type: 'manual', message: 'Invalid credentials', shouldFocus: true } :
      undefined
  }, [error])

  const handleSubmit = async (formData: LoginFormData) => {
    const { isSuccess } = await loginUser(formData.email, formData.password)

    if (isSuccess) {
      history.replace('/home/')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        label='Email'
        name='email'
        disabled={isPending}
        validationRules={{
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
        validationRules={{
          maxLength: 100,
          required: true,
        }}
      />
      <Button type='submit' loading={isPending}>
        Log In
      </Button>
    </Form>
  )
}

export default LoginForm
