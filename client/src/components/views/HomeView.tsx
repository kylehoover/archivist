import React from 'react'
import { CampaignsPanel } from '../panels'
import { useRacesLoader } from '../../stores'

export const HomeView = () => {
  useRacesLoader()

  return (
    <div className='Home row center'>
      <div className='col sm-12 lg-8'>
        <CampaignsPanel />
      </div>
    </div>
  )
}
