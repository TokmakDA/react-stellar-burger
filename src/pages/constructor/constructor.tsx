import type { FC } from 'react'
import styles from './constructor.module.scss'
import BurgerConstructor from '@/components/burger-constructor/burger-constructor.tsx'
import BurgerIngredients from '@/components/burger-ingredients/burger-ingredients.tsx'
import { burgerIngredients } from '@/utils/data.ts'

export const ConstructorPage: FC = () => {
  return (
    <div className={`${styles.page} ga-10`}>
      <BurgerIngredients ingredients={burgerIngredients}></BurgerIngredients>
      <BurgerConstructor></BurgerConstructor>
    </div>
  )
}
