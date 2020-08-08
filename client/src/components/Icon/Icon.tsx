import React from 'react'

import { IconName, getIcon } from './icons'
import { numToRem } from '../../util'
import './Icon.scss'

type IconSize = 'small' | number

type Props = {
  name: IconName
  size?: IconSize
}

const iconSizeToNumber = {
  'small': 1.5
}

const Icon = ({
  name,
  size = 'small',
}: Props) => {
  const fontSize = typeof(size) === 'number' ? size : iconSizeToNumber[size]

  return (
    <span className='Icon' style={{ fontSize: numToRem(fontSize) }}>
      {getIcon(name)}
    </span>
  )
}

export default Icon
