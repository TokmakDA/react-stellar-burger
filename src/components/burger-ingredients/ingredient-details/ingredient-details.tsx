import { TBurgerIngredient } from '@/@types/types.ts'
import { formatNumber } from '@/utils'
import { FC } from 'react'
import styles from './ingredient-details.module.scss'

type TIngredientDetailsProps = {
  ingredient: TBurgerIngredient
}

const IngredientDetails: FC<TIngredientDetailsProps> = ({ ingredient }) => {
  const nutrients: { key: string; label: string }[] = [
    { key: 'calories', label: 'Калории, ккал' },
    { key: 'proteins', label: 'Белки, г' },
    { key: 'fat', label: 'Жиры, г' },
    { key: 'carbohydrates', label: 'Углеводы, г' },
  ] as const

  return (
    <section className={`${styles.details} px-5 pb-5`}>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className={`${styles.details__image} px-5`}
      />
      <div className={styles.details__wrapper}>
        <h3 className={`${styles.details__name} text text_type_main-medium`}>
          {ingredient.name}
        </h3>
        <ul className={`${styles.details__nutrients} list-no-style`}>
          {nutrients.map(({ key, label }) => (
            <li key={key} className={styles.details__nutrientsItem}>
              <h4 className='text text_type_main-default'>{label}</h4>
              <span className='text text_type_digits-default'>
                {formatNumber(ingredient[key as keyof TBurgerIngredient])}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default IngredientDetails
