import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  addIngredient,
  getBurgerIngredients,
  moveIngredient,
  removeIngredient,
  selectBurgerPrice,
  TBurgerIngredient,
} from '@/features/burger'
import { ITEM_TYPES } from '@/features/burger/lib'
import { DropTarget, EmptyElement } from '@/features/burger/ui'
import OrderDetails from '@/features/order/ui/order-details/order-details.tsx'
import { TIngredient } from '@/shared/types'
import { FC, useCallback, useState } from 'react'
import SortableItem from '../dnd/sortable-item.tsx'
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

  const handleIngredientAdd = useCallback(
    (ingredient: TIngredient) => {
      dispatch(addIngredient({ ingredient }))
    },
    [dispatch]
  )

  const moveCard = useCallback(
    (from: number, after: number) => {
      dispatch(moveIngredient({ from, after }))
    },
    [dispatch]
  )

  return (
    <section className={styles.section}>
      <div className={`${styles.section__container} pl-4 pt-25 pb-10 ga-4`}>
        <DropTarget
          itemType={ITEM_TYPES.INGREDIENT}
          onDropHandler={handleIngredientAdd}
          extraClass='ga-4'
        >
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
              ingredients.map((ingredient, idx) => (
                <li key={ingredient.uuid}>
                  <SortableItem
                    list={ingredients}
                    moveCard={moveCard}
                    itemType={ITEM_TYPES.BURGER_ITEM}
                    card={{
                      _id: ingredient._id,
                      index: idx,
                    }}
                  >
                    <div className={styles.section__item}>
                      <DragIcon type='primary' />
                      <ConstructorElement
                        isLocked={false}
                        text={ingredient.name}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                        handleClose={handleIngredientRemove.bind(
                          null,
                          ingredient
                        )}
                      />
                    </div>
                  </SortableItem>
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
        </DropTarget>
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
