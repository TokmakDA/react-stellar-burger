import { useAppDispatch } from '@/app/hooks'
import { addIngredient } from '@/features/burger/model'
import {
  IngredientDetails,
  IngredientsGroup,
} from '@/features/burger/ui/ingredients'
import { FC, useCallback, useMemo, useState } from 'react'
import styles from './ingredients.module.scss'
import { TIngredient } from '@/shared/types'
import { Modal, Tab } from '@/shared/ui'

type TBurgerIngredientsProps = {
  ingredients: TIngredient[]
}

export const Ingredients: FC<TBurgerIngredientsProps> = (props) => {
  const dispatch = useAppDispatch()

  const [currentTab, setCurrentTab] = useState<string | null>(null)
  const [selectedIngredient, setSelectedIngredient] =
    useState<TIngredient | null>(null)

  const ingredientsGroup = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки',
  }

  const ingredients = useMemo(() => {
    const items: Record<string, TIngredient[]> = {
      bun: [],
      sauce: [],
      main: [],
    }
    props.ingredients.forEach((ingredient) => {
      items[ingredient.type] = items[ingredient.type] || []
      items[ingredient.type].push(ingredient)
    })

    return items
  }, [props.ingredients])

  const handleIngredientClick = useCallback(
    (ingredient: TIngredient | null) => {
      setSelectedIngredient(ingredient)
      if (ingredient) dispatch(addIngredient({ ingredient }))
    },
    [dispatch]
  )

  return (
    <section className={styles.section}>
      <h1 className={'text text_type_main-large pt-10 pb-5'}>Собери бургер</h1>
      <nav>
        <ul style={{ display: 'flex' }} className={'list-no-style'}>
          {Object.entries(ingredientsGroup).map(([key, val]) => {
            return (
              <li key={key}>
                <Tab
                  value={key}
                  active={currentTab === key}
                  onClick={() => setCurrentTab(key)}
                >
                  {val}
                </Tab>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className={`${styles.section__scrollWrapper} mt-10 ga-10`}>
        {Object.entries(ingredientsGroup).map(([key, val]) => (
          <IngredientsGroup
            key={key}
            title={val}
            ingredients={ingredients[key]}
            onClick={handleIngredientClick}
          />
        ))}
      </div>

      {selectedIngredient && (
        <Modal
          onClose={() => handleIngredientClick(null)}
          title='Детали ингредиента'
        >
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </section>
  )
}
