import React, { MouseEvent, ReactNode } from 'react'
import classNames from 'classnames'

import './Button.scss'

type Props = {
  children?: ReactNode,
  color?: string,
  flat?: boolean,
  icon?: string,
  onClick: (e: MouseEvent) => any,
  outlined?: boolean,
}

const Button = ({
  children,
  color = 'primary',
  flat = false,
  icon,
  onClick,
  outlined = false,
}: Props) => {
  const btnClass = classNames('Button', {
    [color]: !flat && !outlined,
    [`${color}-border`]: !flat,
    [`${color}-text`]: flat || outlined,
    flat,
    outlined,
  })

  return (
    <button className={btnClass} onClick={onClick}>
      {icon && <i className='material-icons'>{icon}</i>}
      {children}
    </button>
  )
}

export default Button
