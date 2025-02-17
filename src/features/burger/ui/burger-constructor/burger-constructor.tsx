import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { OrderDetails, useCreateOrderMutation } from '@/entities/order'
import {
  addIngredient,
  cleanBurger,
  getBurgerIngredients,
  moveIngredient,
  removeIngredient,
  selectBurgerPrice,
  TBurgerIngredient,
} from '@/features/burger'
import { ITEM_TYPES } from '@/features/burger/lib'
import { DropTarget, EmptyElement, SortableItem } from '@/features/burger/ui'
import { TIngredient } from '@/shared/types'
import { FC, useCallback, useEffect, useState } from 'react'
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
  const [createOrder, { data: orderData, isLoading, isSuccess, isError }] =
    useCreateOrderMutation()

  const [isNewOrder, setIsNewOrder] = useState<boolean>(false)

  const handleClose = useCallback(() => {
    setIsNewOrder(false)
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

  const handleOrderClick = () => {
    setIsNewOrder(true)
    if (!ingredients.length || !bun) return
    const ingredientsIds = ingredients.map((ing) => ing._id)

    ingredientsIds.concat(bun._id).unshift(bun._id)
    createOrder({ ingredients: ingredientsIds })
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(cleanBurger())
    }
  }, [isSuccess, dispatch])

  const disabledNewOrder = ingredients.length === 0 || bun === null

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
        <Button
          size='large'
          htmlType='button'
          onClick={handleOrderClick}
          disabled={disabledNewOrder}
        >
          Оформить заказ
        </Button>
      </div>
      {isNewOrder && (
        <Modal
          onClose={handleClose}
          disableOverlayClose={isLoading}
          disabled={isLoading}
        >
          <OrderDetails
            data={orderData}
            isLoading={isLoading}
            isError={isError}
          />
        </Modal>
      )}
    </section>
  )
}
