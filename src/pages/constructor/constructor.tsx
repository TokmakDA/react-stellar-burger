import { TBurgerIngredient } from '@/@types/types.ts'
import Loader from '@/components/loader/loader.tsx'
import { Overlay } from '@/ui-kit'
import { api } from '@/api/api.ts'
import { FC, useEffect, useState } from 'react'
import styles from './constructor.module.scss'
import BurgerConstructor from '@/components/burger-constructor/burger-constructor.tsx'
import BurgerIngredients from '@/components/burger-ingredients/burger-ingredients.tsx'

export const ConstructorPage: FC = () => {
  const [isLoader, setLoader] = useState<boolean>(false)
  const [burgerIngredients, setBurgerIngredients] = useState<
    TBurgerIngredient[]
  >([])

  const [error, setError] = useState<string | null>(null)

  const fetchIngredients = async () => {
    setLoader(true)
    try {
      const res = await api.getIngredients()
      setBurgerIngredients(res.data)
      console.log(res)
    } catch (err) {
      console.error(err)
      setError('ошибка загрузки')
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    fetchIngredients()

    return () => {
      setError(null)
    }
  }, [])

  return (
    <>
      {isLoader ? (
        <Loader>
          <Overlay />
        </Loader>
      ) : error ? (
        <div> Ошибка загрузки </div>
      ) : (
        <div className={`${styles.page} ga-10`}>
          <BurgerIngredients
            ingredients={burgerIngredients}
          ></BurgerIngredients>
          <BurgerConstructor
            burgerComponents={burgerIngredients}
          ></BurgerConstructor>
        </div>
      )}
    </>
  )
}
