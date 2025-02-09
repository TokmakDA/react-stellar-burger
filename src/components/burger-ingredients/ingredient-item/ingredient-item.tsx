import { FC } from 'react'
import { TBurgerIngredient } from '@/@types/types.ts'

import styles from './ingredient-item.module.scss'
import { Counter, CurrencyIcon } from '@/ui-kit'

type TIngredientProps = {
  ingredient: TBurgerIngredient
  onClick: (ingredient: TBurgerIngredient | null) => void
}

const IngredientItem: FC<TIngredientProps> = ({ ingredient, onClick }) => {
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
      <div className={styles.ingredientItem__price}>
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

export default IngredientItem
