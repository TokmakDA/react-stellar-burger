import { useCallback, useEffect } from 'react'

interface UseIdleTimeoutProps {
  timeout: number
  onTimeout: () => void
  onActivity?: () => void
}

export const useIdleTimeout = ({
  timeout,
  onTimeout,
  onActivity,
}: UseIdleTimeoutProps): void => {
  const fireOnTimeOut = useCallback(() => {
    if (typeof onTimeout === 'function') {
      onTimeout()
    }
  }, [onTimeout])

  const fireOnActivity = useCallback(() => {
    if (typeof onActivity === 'function') {
      onActivity()
    }
  }, [onActivity])

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>

    const set = () => {
      timerId = setTimeout(fireOnTimeOut, timeout)
    }

    const clear = () => {
      clearTimeout(timerId)
    }

    const resetTimeout = () => {
      clear()
      set()
    }

    const events: string[] = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress',
      'touchcancel',
      'touchend',
      'touchmove',
      'touchstart',
    ]

    events.forEach((event) => {
      window.addEventListener(event, resetTimeout)
      window.addEventListener(event, fireOnActivity)
    })

    set()

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimeout)
        window.removeEventListener(event, fireOnActivity)
      })
      clear()
    }
  }, [timeout, fireOnTimeOut, fireOnActivity])
}
