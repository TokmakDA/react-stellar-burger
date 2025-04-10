import { useGetIngredientsQuery } from '@/entities/ingredient'
import { useBackgroundLocation } from '@/shared/lib/hooks'
import { TIngredient } from '@/shared/types'
import { formatNumberToRu } from '@/shared/lib/utils'
import { Loader, StatePage } from '@/shared/ui'
import { FC, useMemo } from 'react'
import { useParams } from 'react-router'
import styles from './ingredient-details.module.scss'

export const IngredientDetails: FC = () => {
  const nutrients: {
    key: keyof Pick<
      TIngredient,
      'calories' | 'proteins' | 'fat' | 'carbohydrates'
    >
    label: string
  }[] = [
    { key: 'calories', label: 'Калории, ккал' },
    { key: 'proteins', label: 'Белки, г' },
    { key: 'fat', label: 'Жиры, г' },
    { key: 'carbohydrates', label: 'Углеводы, г' },
  ]

  const { id } = useParams()
  const { data: ingredientsData, isError, isLoading } = useGetIngredientsQuery()

  const { isBackground } = useBackgroundLocation()

  const ingredient = useMemo(() => {
    return ingredientsData?.data.find((item) => item._id === id)
  }, [ingredientsData, id])

  if (!id) return <StatePage type='empty' />

  if (isLoading) {
    return (
      <section className={`${styles.details} my-6`}>
        <Loader text='Загрузка данных...' />
      </section>
    )
  }

  if (isError) return <StatePage type='error' />

  if (!ingredient) return <StatePage type='notfound' />

  return (
    <section className={`${styles.details} px-5 pb-5`}>
      <header
        className={styles.details__header}
        style={isBackground ? { alignSelf: 'start' } : {}}
      >
        <h2 className={`text text_type_main-large`}>Детали ингредиента</h2>
      </header>

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
                {formatNumberToRu(ingredient[key])}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
