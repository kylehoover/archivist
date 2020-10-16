import React from 'react'
import { CampaignsPanel } from '../panels'

export const HomeView = () => {
  return (
    <div className='Home row center'>
      <div className='col sm-12 lg-8'>
        <CampaignsPanel />
      </div>
    </div>
  )
}
