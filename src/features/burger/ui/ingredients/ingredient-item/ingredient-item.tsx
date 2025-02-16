import { useAppSelector } from '@/app/hooks'
import { getBurgerIngredients } from '@/features/burger/model'
import { FC, useMemo } from 'react'
import { TIngredient } from '@/shared/types'
import styles from './ingredient-item.module.scss'
import { Counter, CurrencyIcon } from '@/shared/ui'

type TIngredientProps = {
  ingredient: TIngredient
  onClick: (ingredient: TIngredient | null) => void
}

export const IngredientItem: FC<TIngredientProps> = ({
  ingredient,
  onClick,
}) => {
  const { bun, ingredients } = useAppSelector(getBurgerIngredients)

  const count = useMemo(() => {
    if (ingredient.type === 'bun') {
      return bun?._id === ingredient._id ? 2 : 0
    } else {
      return (
        ingredients.filter((item) => item._id === ingredient._id).length || null
      )
    }
  }, [bun, ingredients, ingredient])

  return (
    <div className={styles.ingredientItem} onClick={() => onClick(ingredient)}>
      {count ? (
        <Counter
          count={count}
          size='default'
          extraClass={styles.ingredientItem__counter}
        />
      ) : null}
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
