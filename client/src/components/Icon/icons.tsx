import React from 'react'

export type IconName = 'logo'

export function getIcon(name: IconName): JSX.Element {
  switch (name) {
    case 'logo': return LogoIcon()
  }
}

export const LogoIcon = () => {
  return (
    <svg viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 2 2 m 0 20 l 10 -20 l 10 20 h -2 l -6 -12 l -6 12 h -2 l 7 -14 l -1 -2 l -8 16 z"
      />
    </svg>
  )
}
