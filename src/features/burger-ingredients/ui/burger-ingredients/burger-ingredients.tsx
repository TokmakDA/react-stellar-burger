import {
  IngredientDetails,
  IngredientsGroup,
} from '@/features/burger-ingredients/ui'
import { FC, useCallback, useMemo, useState } from 'react'
import styles from './burger-ingredients.module.scss'
import { TBurgerIngredient } from '@/shared/types'
import { Modal, Tab } from '@/shared/ui'

type TBurgerIngredientsProps = {
  ingredients: TBurgerIngredient[]
}

export const BurgerIngredients: FC<TBurgerIngredientsProps> = (props) => {
  const [currentTab, setCurrentTab] = useState<string | null>(null)
  const [selectedIngredient, setSelectedIngredient] =
    useState<TBurgerIngredient | null>(null)

  const ingredientsGroup = {
    bun: 'Булки',
    sauce: 'Соусы',
    main: 'Начинки',
  }

  const ingredients = useMemo(() => {
    const items: Record<string, TBurgerIngredient[]> = {
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
    (ingredient: TBurgerIngredient | null) => {
      setSelectedIngredient(ingredient)
    },
    []
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
