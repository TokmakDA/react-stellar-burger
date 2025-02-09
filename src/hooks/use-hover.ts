import { useState } from 'react'

export const useHover = (initialState: boolean = false) => {
  const [isHovered, setIsHovered] = useState(initialState)

  const onMouseEnter = () => setIsHovered(true)
  const onMouseLeave = () => setIsHovered(false)

  return { isHovered, onMouseEnter, onMouseLeave }
}
