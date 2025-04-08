import { useAppSelector } from '@/app/hooks'
import { selectIngredientsData } from '@/entities/ingredient'
import { BurgerConstructor, Ingredients } from '@/features/burger'
import { Loader, Overlay } from '@/shared/ui'
import { FC } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from './constructor-page.module.scss'

export const ConstructorPage: FC = () => {
  const { ingredients, isError, isLoading } = useAppSelector(
    selectIngredientsData
  )
  return (
    <>
      {isLoading ? (
        <Loader>
          <Overlay />
        </Loader>
      ) : isError ? (
        <div> Ошибка загрузки </div>
      ) : (
        <DndProvider backend={HTML5Backend}>
          <div className={`${styles.page} ga-10`}>
            <Ingredients ingredients={ingredients} />
            <BurgerConstructor />
          </div>
        </DndProvider>
      )}
    </>
  )
}
