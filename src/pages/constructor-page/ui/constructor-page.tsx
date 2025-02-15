import { BurgerConstructor } from '@/features/burger-constructor'
import {
  BurgerIngredients,
  useGetIngredientsQuery,
} from '@/features/burger-ingredients'
import { Loader, Overlay } from '@/shared/ui'
import { FC } from 'react'
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
        <div className={`${styles.page} ga-10`}>
          <BurgerIngredients ingredients={ingredientsData?.data || []} />
          <BurgerConstructor burgerComponents={ingredientsData?.data || []} />
        </div>
      )}
    </>
  )
}
