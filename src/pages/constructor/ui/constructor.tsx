import { BurgerConstructor } from '@/features/burger-constructor'
import { BurgerIngredients } from '@/features/burger-ingredients'
import { TBurgerIngredient } from '@/shared/types'
import { Loader, Overlay } from '@/shared/ui'
import { api } from '@/api/api.ts'
import { FC, useEffect, useState } from 'react'
import styles from './constructor.module.scss'

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
