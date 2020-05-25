import React, { useState } from 'react'

import { Container } from '../../components'
import { LoginForm } from '../../forms'
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

  return (
    <div className='FormsSection m-1'>
      <Container maxWidth={20}>
        <LoginForm
          disabled={loginFormDisabled}
          onSubmit={data => {
            setLoginFormDisabled(true)
            console.log(data)
          }}
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
