import {
  BurgerConstructor,
  Ingredients,
  useGetIngredientsQuery,
} from '@/features/burger'
import { Loader, Overlay } from '@/shared/ui'
import { FC } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from './constructor-page.module.scss'

export const ConstructorPage: FC = () => {
  const { data: ingredientsData, isError, isLoading } = useGetIngredientsQuery()

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
            <Ingredients ingredients={ingredientsData?.data || []} />
            <BurgerConstructor />
          </div>
        </DndProvider>
      )}
    </>
  )
}
