import React from 'react'

import FormsSection from './FormsSection'
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
