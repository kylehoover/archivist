import React from 'react'
import classNames from 'classnames'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'

import { MightHaveClassName } from '../../types'

import './Form.scss'

type FormData = Record<string, any>

interface Props<T extends FormData> extends MightHaveClassName {
  children: React.ReactNode
  onSubmit: SubmitHandler<T>
}

const Form = <T extends FormData>({ children, className, onSubmit }: Props<T>) => {
  const formMethods = useForm<T>()

  return (
    <FormProvider {...formMethods}>
      <form className={classNames('Form', className)} onSubmit={formMethods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}

export default Form
