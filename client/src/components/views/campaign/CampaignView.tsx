import React from 'react'
import { Form, Input, Panel } from '../../common'

export const CampaignView = () => {
  return (
    <div className='Campaign'>
      <h1 className='mb-2'>Campaign Name</h1>
      <Form onSubmit={() => {}}>
        <Input
          label='Campaign name'
          name='campaignName'
          size='large'
        />
      </Form>
      <div className='row'>
        <div className='col sm-12 lg-6'>
          <Panel title='Encounters' color='purple' />
        </div>
        <div className='col sm-12 lg-6'>
          <Panel title='Characters' color='blue' />
        </div>
        <div className='col sm-12 lg-6'>
          <Panel title='Locations' color='green' />
        </div>
      </div>
    </div>
  )
}
