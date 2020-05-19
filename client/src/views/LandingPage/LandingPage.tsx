import React from 'react'

import { LoginForm } from '../../forms'
import './LandingPage.scss'

type VerticalLineProps = {
  height?: string
}

const IntroductionSection = () => {
  return (
    <div className='IntroductionSection'>
      <h1>
        Archivist
      </h1>
    </div>
  )
}

const FormsSection = () => {
  return (
    <div className='FormsSection'>
      <LoginForm />
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
