import React, { MouseEvent } from 'react'
import classNames from 'classnames'
import { MightHaveChildren } from '../../../types'
import { useHistory } from 'react-router-dom'
import './Button.scss'
import { LoadingIndicator } from '../LoadingIndicator'

interface Props extends MightHaveChildren {
  color?: string,
  disabled?: boolean,
  fillParent?: boolean,
  flat?: boolean,
  icon?: string,
  linkTo?: string,
  loading?: boolean,
  onClick?: (e: MouseEvent) => any,
  outlined?: boolean,
  type?: 'button' | 'submit',
}

export const Button = ({
  children,
  color = 'primary',
  disabled = false,
  fillParent = false,
  flat = false,
  icon,
  linkTo,
  loading = false,
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
      disabled={disabled || loading}
      onClick={handleClick}
    >
      {loading && (
        <LoadingIndicator />
      )}

      {!loading && (
        <>
          {icon && <i className='material-icons'>{icon}</i>}
          {children}
        </>
      )}
    </button>
  )
}
