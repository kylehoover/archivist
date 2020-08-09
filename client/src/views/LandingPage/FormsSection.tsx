import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Container } from '../../components'
import { LoginForm, LoginFormData } from '../../forms'
import { useStores } from '../../stores'

const FormsSection = () => {
  const [loginFormDisabled, setLoginFormDisabled] = useState(false)
  const { userStore } = useStores()
  const history = useHistory()

  const handleSubmit = async (data: LoginFormData) => {
    setLoginFormDisabled(true)

    try {
      await userStore.loginUser(data.email, data.password)
    } catch (err) {
      console.log('Failed to log the user in')
      setLoginFormDisabled(false)
      return
    }

    history.replace('/home/')
  }

  return (
    <div className='FormsSection'>
      <Container maxWidth={22}>
        <LoginForm
          disabled={loginFormDisabled}
          onSubmit={handleSubmit}
        />
      </Container>
    </div>
  )
}

export default FormsSection
