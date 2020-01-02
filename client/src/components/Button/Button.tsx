import React, { MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import './Button.scss'

type Props = {
  children?: ReactNode,
  color?: string,
  fillParent?: boolean,
  flat?: boolean,
  icon?: string,
  linkTo?: string,
  onClick?: (e: MouseEvent) => any,
  outlined?: boolean,
}

const Button = ({
  children,
  color = 'primary',
  fillParent = false,
  flat = false,
  icon,
  linkTo = '',
  onClick,
  outlined = false,
}: Props) => {
  const ButtonTag = linkTo ? Link : 'button'

  const btnClass = classNames('Button', {
    [color]: !flat && !outlined,
    [`${color}-border`]: !flat,
    [`${color}-text`]: flat || outlined,
    fillParent,
    flat,
    outlined,
  })

  return (
    <ButtonTag className={btnClass} onClick={onClick} to={linkTo}>
      {icon && <i className='material-icons'>{icon}</i>}
      {children}
    </ButtonTag>
  )
}

export default Button
