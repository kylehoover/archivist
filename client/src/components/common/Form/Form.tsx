import React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import './Form.scss'

type FormData = Record<string, any>

type Props<T extends FormData> = {
  children: React.ReactNode
  onSubmit: SubmitHandler<T>
}

const Form = <T extends FormData>({ children, onSubmit }: Props<T>) => {
  const formMethods = useForm<T>()

  return (
    <FormProvider {...formMethods}>
      <form className='Form' onSubmit={formMethods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}

export default Form
