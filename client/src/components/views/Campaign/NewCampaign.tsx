import React from 'react'

import { Button, Form, Input, Panel } from '../../common'

const NewCampaign = () => {
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
          <Form className='row end middle' onSubmit={() => {}}>
            <div className='col sm-12 md'>
              <Input
                label='Campaign name'
                name='campaignName'
                validationRules={{
                  required: true,
                }}
              />
            </div>
            <div className='col'>
              <Button color='purple' type='submit'>
                Create
              </Button>
            </div>
            <div className='col'>
              <Button color='purple' outlined>
                Cancel
              </Button>
            </div>
          </Form>
        </Panel>
      </div>
    </div>
  )
}

export default NewCampaign
