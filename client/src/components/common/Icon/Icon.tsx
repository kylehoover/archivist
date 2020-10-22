import React from 'react'
import { IconName, getIcon } from './icons'
import { numToRem } from '../../../helpers'
import './Icon.scss'

type IconSize = 'small' | number

interface Props {
  name: IconName
  size?: IconSize
}

const iconSizeToNumber = {
  'small': 1.5
}

export const Icon = ({
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
