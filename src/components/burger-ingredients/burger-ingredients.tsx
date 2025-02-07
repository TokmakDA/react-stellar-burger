import { FC, useMemo, useState } from 'react'
import styles from './burger-ingredients.module.scss'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { TBurgerIngredient } from '@/@types/types.ts'
import IngredientItem from '@/components/ingredient-item/ingredient-item.tsx'

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
      <h1 className={'text text_type_main-large pt-10 pb-5'}>Собери бургер</h1>
      <div style={{ display: 'flex' }} className={''}>
        <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='main' active={current === 'main'} onClick={setCurrent}>
          Основные
        </Tab>
      </div>
      <div className={`${styles['scroll-wrapper']} mt-10`}>
        {Object.entries(ingredientsGroup).map(([key, val]) => (
          <div key={key} id={key} className={`${styles.container}`}>
            <h2 className={`text text_type_main-medium mb-5`}>{val.title}</h2>
            <ul className={`${styles.list} gr-8 gc-6`}>
              {ingredients[key].map((ingredient) => (
                <li key={ingredient._id}>
                  <IngredientItem ingredient={ingredient}></IngredientItem>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BurgerIngredients
