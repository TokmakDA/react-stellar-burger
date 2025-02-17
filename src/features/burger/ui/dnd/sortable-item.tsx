import { ReactNode, useRef } from 'react'
import { useDrag, useDrop, XYCoord } from 'react-dnd'

interface IHasId {
  _id: string
}

interface ICard extends IHasId {
  index: number
}
interface SortableProps<T extends IHasId> {
  card: ICard
  children: ReactNode
  moveCard: (fromIndex: number, toIndex: number) => void
  itemType: string
  list: T[]
}

const SortableItem = <T extends IHasId>({
  card,
  children,
  moveCard,
  itemType,
  list,
}: SortableProps<T>) => {
  const ref = useRef<HTMLDivElement | null>(null)

  // Используем useDrag для обработки перетаскивания
  const [{ handlerId, opacity, cursor }, connectDrag] = useDrag({
    type: itemType,
    item: card,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
      opacity: monitor.isDragging() ? 0 : 1,
      cursor: monitor.canDrag() ? 'move' : 'not-allowed',
    }),
    canDrag() {
      const index = card.index
      // Запрещаем перетаскивание, если предыдущий и следующий элементы идентичны
      return list[index - 1]?._id !== list[index + 1]?._id
    },
  })

  // Используем useDrop для обработки логики перемещения элементов
  const [, connectDrop] = useDrop({
    accept: itemType,
    hover(item: ICard, monitor) {
      if (!ref.current) return

      const dragId = item._id
      const hoverId = card._id
      const dragIndex = item.index
      const hoverIndex = card.index

      // Исключаем случаи, когда элемент перетаскивается сам на себя
      if (dragIndex === hoverIndex || dragId === hoverId) return

      // Определяем границы элемента, над которым находимся
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Если тянем вниз и ещё не достигли середины — игнорируем
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return

      // Если тянем вверх и ещё не достигли середины — игнорируем
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      // Исключаем случаи, когда аналогичный элемент уже находится на правильном месте
      if (
        (dragIndex < hoverIndex && list[hoverIndex + 1]?._id === dragId) ||
        list[hoverIndex]?._id === dragId
      ) {
        return
      }
      if (
        (dragIndex > hoverIndex && list[hoverIndex - 1]?._id === dragId) ||
        list[hoverIndex]?._id === dragId
      ) {
        return
      }

      // Вызываем функцию перемещения карточек
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  connectDrag(connectDrop(ref))

  return (
    <div ref={ref} style={{ opacity, cursor }} data-handler-uuid={handlerId}>
      {children}
    </div>
  )
}

export default SortableItem
