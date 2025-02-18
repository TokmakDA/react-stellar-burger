import { ITEM_TYPES } from '@/features/burger/lib'
import { DraggableItem, IngredientItem } from '@/features/burger/ui'
import { TIngredient } from '@/shared/types'
import styles from './ingredients-group.module.scss'
import { FC, RefObject } from 'react'

type TIngredientsGroupProps = {
  title: string
  ingredients: TIngredient[]
  onClick: (ingredient: TIngredient | null) => void
  refElement: RefObject<HTMLElement>
}

export const IngredientsGroup: FC<TIngredientsGroupProps> = ({
  title,
  ingredients,
  onClick,
  refElement,
}) => {
  return (
    <section className={`${styles.group}`} ref={refElement}>
      <h2 className={`text text_type_main-medium mb-5`}>{title}</h2>
      <ul className={`${styles.group__list} gr-8 gc-6`}>
        {ingredients.map((ingredient: TIngredient) => (
          <li key={ingredient._id}>
            <DraggableItem<TIngredient>
              card={ingredient}
              itemType={ITEM_TYPES.INGREDIENT}
              withPreview={true}
              image={ingredient.image}
            >
              <IngredientItem ingredient={ingredient} onClick={onClick} />
            </DraggableItem>
          </li>
        ))}
      </ul>
    </section>
  )
}
