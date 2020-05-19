export const isEmpty = (str?: string): boolean => {
  return str !== undefined && str.length === 0
}

export const numToRem = (num?: number): string => {
  return num ? `${num}rem` : ''
}
