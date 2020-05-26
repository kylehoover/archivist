import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Container } from '../../components'
import { LoginForm, LoginFormData } from '../../forms'
import { useStores } from '../../stores'
import './LandingPage.scss'

type VerticalLineProps = {
  height?: string
}

const IntroductionSection = () => {
  return (
    <div className='IntroductionSection m-1'>
      <h1>
        Archivist
      </h1>
    </div>
  )
}

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

    history.push('/home/')
  }

  return (
    <div className='FormsSection m-1'>
      <Container maxWidth={20}>
        <LoginForm
          disabled={loginFormDisabled}
          onSubmit={handleSubmit}
        />
      </Container>
    </div>
  )
}

const VerticalLine = (props: VerticalLineProps) => {
  const { height } = props

  return (
    <div className='VerticalLine' style={{ height }} />
  )
}

const LandingPage = () => {
  return (
    <div className='LandingPage'>
      <IntroductionSection />
      <VerticalLine height='50%' />
      <FormsSection />
    </div>
  )
}

export default LandingPage
