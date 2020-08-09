import React from 'react'

import FormsSection from './FormsSection'
import { Container } from '../../components'
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

const VerticalLine = (props: VerticalLineProps) => {
  const { height } = props

  return (
    <div className='VerticalLine' style={{ height }} />
  )
}

const LandingPage = () => {
  return (
    <div className='LandingPage'>
      <Container maxWidth={22} minWidth={15} centered>
        <div id='content'>
          <IntroductionSection />
          <VerticalLine height='50%' />
          <FormsSection />
        </div>
      </Container>
    </div>
  )
}

export default LandingPage
