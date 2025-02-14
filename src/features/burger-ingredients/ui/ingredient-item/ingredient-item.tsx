import { FC } from 'react'
import { TBurgerIngredient } from '@/shared/types'
import styles from './ingredient-item.module.scss'
import { Counter, CurrencyIcon } from '@/shared/ui'

type TIngredientProps = {
  ingredient: TBurgerIngredient
  onClick: (ingredient: TBurgerIngredient | null) => void
}

export const IngredientItem: FC<TIngredientProps> = ({
  ingredient,
  onClick,
}) => {
  return (
    <div className={styles.ingredientItem} onClick={() => onClick(ingredient)}>
      <Counter
        count={0}
        size='default'
        extraClass={styles.ingredientItem__counter}
      />
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className={styles.ingredientItem__image}
      />
      <div className={`${styles.ingredientItem__price} ga-2`}>
        <span className='text text_type_digits-default'>
          {ingredient.price}
        </span>
        <CurrencyIcon type='primary' />
      </div>
      <h3
        className={`${styles.ingredientItem__title} text text_type_main-default`}
      >
        {ingredient.name}
      </h3>
    </div>
  )
}
