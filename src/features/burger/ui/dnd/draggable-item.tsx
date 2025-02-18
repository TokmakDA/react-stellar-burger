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
  image: string
}

interface DraggableWithoutPreview<T extends Record<string, unknown>>
  extends DraggableBaseProps<T> {
  withPreview?: false
  image?: never
}

type DraggableProps<T extends Record<string, unknown>> =
  | DraggableWithPreview<T>
  | DraggableWithoutPreview<T>

const DraggableItem = <T extends Record<string, unknown>>({
  children,
  card,
  withPreview = false,
  image,
  extraClass = '',
  itemType,
}: DraggableProps<T>) => {
  const [{ opacity }, dragRef, previewRef] = useDrag({
    type: itemType,
    item: () => card,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
    previewOptions: {
      captureDraggingState: withPreview,
    },
  })

  return (
    <>
      {withPreview && image && (
        <DragPreviewImage connect={previewRef} src={image} />
      )}

      <div ref={dragRef} className={extraClass} style={{ opacity }}>
        {children}
      </div>
    </>
  )
}

export default DraggableItem
