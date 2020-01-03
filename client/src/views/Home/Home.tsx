import React from 'react'

import Container from '../../components/Container'
import { CampaignsPanel } from '../../panels'

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
