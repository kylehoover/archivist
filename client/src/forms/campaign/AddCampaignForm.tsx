import React from 'react'
import { useForm } from 'react-hook-form'

import Button from '../../components/Button'
import Input from '../../components/Input'

import './AddCampaignForm.scss'

type Props = {
  onCancel: () => void,
  onSubmit: (data: any) => void,
}

const AddCampaignForm = ({ onCancel, onSubmit }: Props) => {
  const { handleSubmit, register, watch } = useForm()

  return (
    <form className='AddCampaignForm' onSubmit={handleSubmit(onSubmit)}>
      <Input
        label='Campaign Name'
        name='name'
        register={register({ required: true })}
        watch={watch}
      />
      <Button color='green' type='submit'>
        Add
      </Button>
      <Button color='red' onClick={onCancel}>
        Cancel
      </Button>
    </form>
  )
}

export default AddCampaignForm
