import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  getBurgerIngredients,
  removeIngredient,
  selectBurgerPrice,
  TBurgerIngredient,
} from '../../model'
import { EmptyElement } from '@/features/burger/ui/burger-constructor'
import OrderDetails from '@/features/order/ui/order-details/order-details.tsx'
import { FC, useCallback, useState } from 'react'
import styles from './burger-constructor.module.scss'
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Modal,
} from '@/shared/ui'

// type TBurgerConstructorProps = {}

export const BurgerConstructor: FC = () => {
  const { bun, ingredients } = useAppSelector(getBurgerIngredients)
  const totalPrice = useAppSelector(selectBurgerPrice)
  const dispatch = useAppDispatch()

  const [newOrder, setNewOrder] = useState<string | number | null>(null)

  const generateOrder = () => {
    return Math.random().toString(16).slice(8)
  }

  const handlePlaceOrder = () => {
    setNewOrder(generateOrder())
  }

  const handleClose = useCallback(() => {
    setNewOrder(null)
  }, [])

  const handleIngredientRemove = useCallback(
    (ingredient: TBurgerIngredient) => {
      dispatch(removeIngredient(ingredient))
    },
    [dispatch]
  )

  return (
    <section className={styles.section}>
      <div className={`${styles.section__container} pl-4 pt-25 pb-10 ga-4`}>
        {bun ? (
          <ConstructorElement
            extraClass='ml-8'
            type='top'
            isLocked
            text={bun.name + ' (верх)'}
            price={bun.price}
            thumbnail={bun.image}
          />
        ) : (
          <EmptyElement type='top' extraClass='ml-8' />
        )}
        <ul
          className={`${styles.section__scrollWrapper} ${styles.section__list} ga-4  `}
        >
          {ingredients.length ? (
            ingredients.map((ingredient) => (
              <li key={ingredient.uuid}>
                <div className={styles.section__item}>
                  <DragIcon type='primary' />
                  <ConstructorElement
                    isLocked={false}
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={handleIngredientRemove.bind(null, ingredient)}
                  />
                </div>
              </li>
            ))
          ) : (
            <EmptyElement extraClass='ml-8' />
          )}
        </ul>
        {bun ? (
          <ConstructorElement
            extraClass='ml-8'
            type='bottom'
            isLocked
            text={bun.name + ' (низ)'}
            price={bun.price}
            thumbnail={bun.image}
          />
        ) : (
          <EmptyElement type='bottom' extraClass='ml-8' />
        )}
      </div>

      {/* Блок цены и кнопки */}
      <div className={`${styles.section__actions}  ga-10 pr-4 pb-10`}>
        <div className={`${styles.section__price} ga-2`}>
          <span className='text text_type_digits-medium'>{totalPrice}</span>
          <CurrencyIcon type='primary' />
        </div>
        <Button size='large' htmlType='button' onClick={handlePlaceOrder}>
          Оформить заказ
        </Button>
      </div>
      {newOrder && (
        <Modal onClose={handleClose}>
          <OrderDetails order={newOrder} />
        </Modal>
      )}
    </section>
  )
}
