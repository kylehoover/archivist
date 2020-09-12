import React from 'react'

import { Button, Form, Input } from '../../common'
import './AddCampaignForm.scss'

type Props = {
  onCancel: () => void,
  onSubmit: (data: any) => void,
}

const AddCampaignForm = ({ onCancel, onSubmit }: Props) => {
  return (
    <Form onSubmit={onSubmit}>
      <Input
        label='Campaign Name'
        name='name'
      />
      <Button color='green' type='submit'>
        Add
      </Button>
      <Button color='red' onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  )
}

export default AddCampaignForm
