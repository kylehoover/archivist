import React from 'react'
import classNames from 'classnames'
import './Alert.scss'

interface Props {
  children?: string,
  color?: string,
  flat?: boolean,
  icon?: string,
}

export const Alert = ({
  children,
  color = 'blue',
  flat = false,
  icon,
}: Props) => {
  return (
    <div className={classNames(`Alert ${color}-border ${color}-light`, { flat })}>
      {icon && <i className={`material-icons ${color}-text`}>{icon}</i>}
      <div className='message-text'>
        {children}
      </div>
    </div>
  )
}
