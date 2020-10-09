import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Button, Form, Input } from '../../common'
import { MightHaveReferrer } from '../../../types'
import { useCampaignCreator } from '../../../stores'

export interface AddCampaignFormData {
  name: string
}

const AddCampaignForm = () => {
  const history = useHistory()
  const { state: locationState } = useLocation<MightHaveReferrer>()
  const [createCampaign, { isPending }] = useCampaignCreator()

  const handleSubmit = async (formData: AddCampaignFormData) => {
    const { data, isSuccess } = await createCampaign(formData)

    if (isSuccess && data !== null) {
      history.push(`/campaign/${data.id}/`)
    }
  }

  const handleCancel = () => {
    // TODO: create useReferrerNavigator
    const path = locationState?.referrer ?? '/home/'
    history.push(path)
  }

  return (
    <Form className='row end middle' onSubmit={handleSubmit}>
      <div className='col sm-12 md'>
        <Input
          label='Campaign name'
          name='name'
          validationRules={{
            maxLength: 50,
            required: true,
          }}
          disabled={isPending}
        />
      </div>
      <div className='col'>
        <Button color='purple' type='submit' disabled={isPending}>
          Create
        </Button>
      </div>
      <div className='col'>
        <Button
          outlined
          color='purple'
          disabled={isPending}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </Form>
  )
}

export default AddCampaignForm
