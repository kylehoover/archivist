import React from 'react'
import { FormContext, useForm } from 'react-hook-form'

type FormData = Record<string, any>

type Props<T extends FormData> = {
  children: React.ReactNode
  onSubmit: (data: T) => void
}

const Form = <T extends FormData>({ children, onSubmit }: Props<T>) => {
  const formMethods = useForm<T>()

  return (
    <FormContext {...formMethods}>
      <form className='Form' onSubmit={formMethods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormContext>
  )
}

export default Form
