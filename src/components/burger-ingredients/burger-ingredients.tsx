import { FC, useMemo, useState } from 'react'
import styles from './burger-ingredients.module.scss'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { TBurgerIngredient } from '@/@types/types.ts'
import Ingredient from '@/components/ingredient/ingredient.tsx'
import ScrollableContainer
  from '@/components/scrollable-container/scrollable-container.tsx'

type TBurgerIngredientsProps = {
  ingredients: TBurgerIngredient[]
}

const BurgerIngredients: FC<TBurgerIngredientsProps> = (props) => {
  const [current, setCurrent] = useState('one')
  const ingredientsGroup = {
    bun: {
      title: 'Булки',
    },
    sauce: {
      title: 'Соусы',
    },
    main: {
      title: 'Главные ингредиенты',
    },
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

  return (
    <section className={styles.section}>
      <h1 className={'text text_type_main-large pt-10 pb-20'}>Собери бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>
          One
        </Tab>
        <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent}>
          Two
        </Tab>
        <Tab value='main' active={current === 'main'} onClick={setCurrent}>
          Three
        </Tab>
      </div>
      <ScrollableContainer className={'my-10 ga-10'} offset={30}>
        {Object.entries(ingredientsGroup).map(([key, val]) => (
          <div key={key} id={key} className={`${styles.ingredientsGroup}`}>
            <h2 className={`text text_type_main-medium mb-5`}>{val.title}</h2>
            <ul className={`${styles.list} gr-8 gc-6`}>
              {ingredients[key].map((ingredient) => (
                <li key={ingredient._id}>
                  <Ingredient ingredient={ingredient}></Ingredient>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ScrollableContainer>
    </section>
  )
}

export default BurgerIngredients
