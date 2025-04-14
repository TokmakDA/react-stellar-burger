import { BurgerTestId } from '@/shared/const/test-ids'
import { TIngredient } from '@/shared/types'
import { FC, ReactNode } from 'react'
import styles from './drop-target.module.scss'
import { useDrop } from 'react-dnd'

type TDropTargetProps = {
  children: ReactNode
  onDropHandler: (item: TIngredient) => void
  extraClass?: string
  itemType: string
}

const DropTarget: FC<TDropTargetProps> = ({
  children,
  onDropHandler,
  extraClass = '',
  itemType,
}) => {
  const [{ isHover, isOver }, dropRef] = useDrop({
    accept: itemType,

    drop(item: TIngredient) {
      onDropHandler(item)
    },

    collect: (monitor) => ({
      isHover: monitor.isOver(),
      isOver: monitor.canDrop(),
    }),
  })

  const className = [
    styles.target__borger,
    isHover && styles.target__borger_hover,
    isOver && !isHover && styles.target__borger_over,
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <div
      ref={dropRef}
      className={`${styles.target} ${extraClass}`}
      data-testid={BurgerTestId.DropArea}
    >
      {children}
      {(isHover || isOver) && <div className={className}></div>}
    </div>
  )
}

export default DropTarget
