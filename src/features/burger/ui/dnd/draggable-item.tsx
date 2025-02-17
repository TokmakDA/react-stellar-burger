import { ReactNode } from 'react'
import { useDrag, DragPreviewImage } from 'react-dnd'

interface DraggableBaseProps<T extends Record<string, unknown>> {
  children: ReactNode
  card: T
  extraClass?: string
  itemType: string
}

interface DraggableWithPreview<T extends Record<string, unknown>>
  extends DraggableBaseProps<T> {
  withPreview: true
  imageKey: keyof T
}

interface DraggableWithoutPreview<T extends Record<string, unknown>>
  extends DraggableBaseProps<T> {
  withPreview?: false
  imageKey?: never
}

type DraggableProps<T extends Record<string, unknown>> =
  | DraggableWithPreview<T>
  | DraggableWithoutPreview<T>

const DraggableItem = <T extends Record<string, unknown>>({
  children,
  card,
  withPreview = false,
  imageKey,
  extraClass = '',
  itemType,
}: DraggableProps<T>) => {
  const [, dragRef, previewRef] = useDrag({
    type: itemType,
    item: () => card,
  })

  const imageUrl =
    withPreview && imageKey ? (card[imageKey] as string | undefined) || '' : ''

  return (
    <>
      {withPreview && imageUrl && (
        <DragPreviewImage connect={previewRef} src={imageUrl} />
      )}
      <div ref={dragRef} className={extraClass}>
        {children}
      </div>
    </>
  )
}

export default DraggableItem
