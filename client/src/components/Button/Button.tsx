import React, { ReactNode } from 'react'

import './Button.scss'

type Props = {
  children?: ReactNode,
  icon?: string,
}

const Button = ({ children, icon }: Props) => {
  return (
    <button className='Button blue'>
      {icon && <i className='material-icons'>{icon}</i>}
      {children}
    </button>
  )
}

export default Button
