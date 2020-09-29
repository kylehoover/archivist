import React, { MouseEvent, ReactNode } from 'react'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'

import './Button.scss'

type Props = {
  children?: ReactNode,
  color?: string,
  disabled?: boolean,
  fillParent?: boolean,
  flat?: boolean,
  icon?: string,
  linkTo?: string,
  onClick?: (e: MouseEvent) => any,
  outlined?: boolean,
  type?: 'button' | 'submit',
}

const Button = ({
  children,
  color = 'primary',
  disabled = false,
  fillParent = false,
  flat = false,
  icon,
  linkTo,
  onClick,
  outlined = false,
  type = 'button',
}: Props) => {
  const history = useHistory()

  const handleClick = (e: MouseEvent) => {
    if (linkTo !== undefined) {
      history.push(linkTo)
    } else if (onClick !== undefined) {
      onClick(e)
    }
  }

  const btnClass = classNames('Button', {
    [color]: !flat && !outlined,
    [`${color}-border`]: !flat,
    [`${color}-text`]: flat || outlined,
    fillParent,
    flat,
    outlined,
  })

  return (
    <button
      className={btnClass}
      type={type}
      disabled={disabled}
      onClick={handleClick}
    >
      {icon && <i className='material-icons'>{icon}</i>}
      {children}
    </button>
  )
}

export default Button
