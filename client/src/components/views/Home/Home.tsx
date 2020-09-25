import React from 'react'

import { Container } from '../../common'
import { CampaignsPanel } from '../../panels'

const Home = () => {
  return (
    <div className='Home'>
      <Container maxWidth={50} centered>
        <h1>
          Welcome!
        </h1>
      </Container>
      <CampaignsPanel />
    </div>
  )
}

export default Home
