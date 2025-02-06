import { FC } from 'react'
import { TBurgerIngredient } from '@/@types/types.ts'
import styles from './ingredient.module.scss'
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

type TIngredientProps = {
  ingredient: TBurgerIngredient
}

const Ingredient: FC<TIngredientProps> = ({ ingredient }) => {
  return (
    <div className={styles.container}>
      <Counter count={0} size='default' />
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className={styles.image}
      />
      <div style={{ display: 'flex' }} className={`${styles.price} ga-2`}>
        <span className={'text text_type_digits-default'}>
          {ingredient.price}
        </span>
        <CurrencyIcon type={'primary'}></CurrencyIcon>
      </div>
      <span className={`${styles.title} text text_type_main-default`}>
        {ingredient.name}
      </span>
    </div>
  )
}

export default Ingredient
