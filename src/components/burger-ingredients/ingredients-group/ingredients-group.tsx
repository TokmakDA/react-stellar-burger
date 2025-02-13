import { TBurgerIngredient } from '@/@types/types.ts'
import styles from './ingredients-group.module.scss'
import IngredientItem from '@/components/burger-ingredients/ingredient-item/ingredient-item.tsx'
import { FC } from 'react'

type TIngredientsGroupProps = {
  title: string
  ingredients: TBurgerIngredient[]
  onClick: (ingredient: TBurgerIngredient | null) => void
}

const IngredientsGroup: FC<TIngredientsGroupProps> = ({
  title,
  ingredients,
  onClick,
}) => {
  return (
    <section className={`${styles.group}`}>
      <h2 className={`text text_type_main-medium mb-5`}>{title}</h2>
      <ul className={`${styles.group__list} gr-8 gc-6`}>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            <IngredientItem
              ingredient={ingredient}
              onClick={onClick}
            ></IngredientItem>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default IngredientsGroup
