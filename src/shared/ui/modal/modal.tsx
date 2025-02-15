import { HoverWrapper, CloseIcon, Overlay } from '@/shared/ui'
import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './modal.module.scss'

interface ModalProps {
  children: ReactNode
  onClose: () => void
  disableOverlayClose?: boolean
  title?: string | null
  delay?: number // Миллисекунды ожидания перед закрытием компонента и анимации
}

export const Modal: FC<ModalProps> = ({
  children,
  onClose,
  disableOverlayClose = false,
  title = null,
  delay = 300,
}) => {
  const modalRoot = document.getElementById('modal-root') as HTMLElement | null
  const refModal = useRef<HTMLDivElement>(null)

  const [isVisible, setIsVisible] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsVisible(true)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleClose = useCallback(() => {
    setIsVisible(false)
    timeoutRef.current = setTimeout(() => {
      onClose()
    }, delay)
  }, [onClose, delay])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    document.addEventListener('keyup', handleEscape)
    return () => document.removeEventListener('keyup', handleEscape)
  }, [handleClose])

  return modalRoot
    ? createPortal(
        <div
          className={`${styles.modal}`}
          style={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity ${delay / 1000}s`,
          }}
          ref={refModal}
        >
          <div className={styles.modal__container}>
            <header className={`${styles.modal__header}`}>
              <HoverWrapper className={styles.modal__close} isScalable={true}>
                <CloseIcon type='primary' onClick={handleClose} />
              </HoverWrapper>
              {title && (
                <h2
                  className={`${styles.modal__title} text text_type_main-large`}
                >
                  {title}
                </h2>
              )}
            </header>
            {children}
          </div>
          {!disableOverlayClose && (
            <Overlay onClick={handleClose} persistent={disableOverlayClose} />
          )}
        </div>,
        modalRoot
      )
    : null
}
