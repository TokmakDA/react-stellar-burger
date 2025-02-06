import { RefObject, useLayoutEffect, useState } from 'react'

export const useHover = (initialState: boolean = false) => {
  const [isHovered, setIsHovered] = useState(initialState)

  const onMouseEnter = () => setIsHovered(true)
  const onMouseLeave = () => setIsHovered(false)

  return { isHovered, onMouseEnter, onMouseLeave }
}

export const useDynamicHeight = (
  ref: RefObject<HTMLElement>,
  offset: number = 20
) => {
  const [maxHeight, setMaxHeight] = useState<number>(0)

  useLayoutEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const topOffset = ref.current.getBoundingClientRect().top
        const windowHeight = window.innerHeight
        setMaxHeight(windowHeight - topOffset - offset)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [ref, offset])

  return maxHeight
}
