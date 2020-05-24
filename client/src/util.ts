/**
 * Checks if a string is null, undefined, empty, or contains only whitespace
 */
export const isEmpty = (str: string | null | undefined): boolean => {
  return str !== null && str !== undefined && (str.trim()).length === 0
}

export const numToRem = (num?: number): string => {
  return num ? `${num}rem` : ''
}
