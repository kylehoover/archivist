import React from 'react'

import { Container } from '../../common'
import { CampaignsPanel } from '../../panels'

const Row = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='row'>
      {children}
    </div>
  )
}

const Col = ({ size }: { size: string }) => {
  return (
    <div className={`col ${size}`}>
      <div className='box'>
        {size}
      </div>
    </div>
  )
}

const Home = () => {
  return (
    <div className='Home'>
      {/* <Container maxWidth={50} centered>
        <h1>
          Welcome!
        </h1>
      </Container>
      <CampaignsPanel /> */}
      <Row>
        <Col size='sm-1' />
        <Col size='sm-1' />
        <Col size='sm-1' />
        <Col size='sm-3' />
        <Col size='sm-1' />
        <Col size='sm-3' />
        <Col size='sm-2' />
      </Row>
      <Row>
        <Col size='sm-5 md-4' />
        <Col size='sm-4' />
        <Col size='sm-3 md-4' />
      </Row>
      <Row>
        <Col size='sm-2' />
        <Col size='sm' />
      </Row>
    </div>
  )
}

export default Home
