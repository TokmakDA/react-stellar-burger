import { useAppDispatch } from '@/app/hooks'
import { setIngredientDetails } from '@/entities/ingredient'
import { IngredientsGroup } from '@/features/burger/ui'
import {
  FC,
  RefObject,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useLocation, useNavigate } from 'react-router'
import styles from './ingredients.module.scss'
import { TIngredient } from '@/shared/types'
import { Tab } from '@/shared/ui'

type TBurgerIngredientsProps = {
  ingredients: TIngredient[]
}

type TIngredientType = 'bun' | 'sauce' | 'main'

type TIngredientsGroup = Record<
  TIngredientType,
  {
    title: string
    ref: RefObject<HTMLElement>
  }
>

export const Ingredients: FC<TBurgerIngredientsProps> = (props) => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const location = useLocation()

  // const selectedIngredient = useAppSelector(getIngredient)

  // делаем currentTab либо TIngredientType
  const [currentTab, setCurrentTab] = useState<TIngredientType>('bun')

  // ref для контейнера с разделами ингредиентов
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const ingredientsGroup: TIngredientsGroup = {
    bun: { title: 'Булки', ref: useRef<HTMLElement>(null) },
    sauce: { title: 'Соусы', ref: useRef<HTMLElement>(null) },
    main: { title: 'Начинки', ref: useRef<HTMLElement>(null) },
  }

  // разбиваем ингредиенты по типам bun, sauce, main
  const ingredientsByType = useMemo(() => {
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

  // клик по ингредиенту вызывает экшен
  const handleIngredientClick = useCallback(
    (ingredient: TIngredient) => {
      console.log(ingredient)
      dispatch(setIngredientDetails(ingredient))
      navigate(`/ingredients/${ingredient._id}`, {
        state: { background: { ...location } },
      })
    },
    [dispatch, navigate, location]
  )

  // при клике по табу проскроллим к нужному разделу
  const onTabClick = useCallback((key: TIngredientType) => {
    setCurrentTab(key)
    ingredientsGroup[key].ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // при монтировании/размонтировании подключаем обработчик scroll
  useLayoutEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (
      !scrollContainer ||
      !Object.values(ingredientsGroup).every((group) => group.ref.current)
    ) {
      return
    }

    const handleScroll = () => {
      // Формируем массив секций (тип + ref)
      const sections = Object.entries(ingredientsGroup).map(([k, val]) => ({
        type: k as TIngredientType,
        ref: val.ref,
      }))

      const scrollTop = scrollContainer.getBoundingClientRect().top

      // Собираем массив { type, distance }
      const distances = sections.map(({ type, ref }) => ({
        type,
        distance: Math.abs(
          ref.current!.getBoundingClientRect().top - scrollTop
        ),
      }))

      // Находим секцию с минимальным distance
      // reduce пройдётся по массиву и выберет объект, у которого distance меньше
      const closestSection = distances.reduce((closest, current) =>
        current.distance < closest.distance ? current : closest
      )

      setCurrentTab(closestSection.type)
    }

    scrollContainer.addEventListener('scroll', handleScroll)
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className={styles.section}>
      <h1 className='text text_type_main-large pt-10 pb-5'>Собери бургер</h1>

      {/* Табы */}
      <nav>
        <ul style={{ display: 'flex' }} className='list-no-style'>
          {Object.entries(ingredientsGroup).map(([key, val]) => {
            const typeKey = key as TIngredientType
            return (
              <li key={key}>
                <Tab
                  value={typeKey}
                  active={currentTab === typeKey}
                  onClick={() => onTabClick(typeKey)}
                >
                  {val.title}
                </Tab>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Контейнер для скролла */}
      <div
        ref={scrollContainerRef}
        className={`${styles.section__scrollWrapper} mt-10 ga-10`}
      >
        {Object.entries(ingredientsGroup).map(([key, val]) => {
          const typeKey = key as TIngredientType
          return (
            <IngredientsGroup
              refElement={val.ref}
              key={key}
              title={val.title}
              ingredients={ingredientsByType[typeKey]}
              onClick={handleIngredientClick}
            />
          )
        })}
      </div>
    </section>
  )
}
