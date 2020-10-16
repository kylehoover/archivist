import React from 'react'
import { AddCampaignForm } from '../../forms'
import { Panel } from '../../common'

export const NewCampaignView = () => {
  return (
    <div className='NewCampaign row center'>
      <div className='col sm-12 lg-8'>
        <h1 className='mb-2'>
          New Campaign
        </h1>
        <Panel color='purple'>
          <p>
            Keep track of encounters, locations, and 
            your party's characters. Get started by entering a name for your campagin. 
            Don't overthink it! You can always change it later.
          </p>
          <AddCampaignForm />
        </Panel>
      </div>
    </div>
  )
}
