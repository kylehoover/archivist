import React from 'react'

import { CampaignsPanel } from '../../panels'
import { Container } from '../../components'

const Home = () => {
  return (
    <div className='Home'>
      <Container maxWidth={50} centered>
        <CampaignsPanel />
      </Container>
    </div>
  )
}

export default Home
