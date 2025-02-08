import { FC, useMemo } from 'react'
import styles from './burger-constructor.module.scss'
import { TBurgerIngredient } from '@/@types/types'
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@/ui-kit'

type TBurgerConstructorProps = {
  burgerComponents: TBurgerIngredient[]
}

const BurgerConstructor: FC<TBurgerConstructorProps> = (props) => {
  // Для демонстрации случайно выбираем часть ингредиентов
  const burgerData = useMemo(() => {
    if (!props.burgerComponents.length) {
      return { items: [], bun: undefined }
    }
    const maxIndex = props.burgerComponents.length - 1
    const count = Math.floor(Math.random() * maxIndex)

    const items: TBurgerIngredient[] = props.burgerComponents
      .filter((item) => item.type !== 'bun')
      .sort(() => 0.5 - Math.random())
      .slice(0, count)

    const bun = props.burgerComponents.find((item) => item.type === 'bun')
    return { items, bun }
  }, [props.burgerComponents])

  return (
    <section className={styles.section}>
      <div className={`${styles.section__container} pl-4 pt-25 pb-10 ga-4`}>
        <ConstructorElement
          extraClass='ml-8'
          type='top'
          isLocked
          text={burgerData.bun?.name ?? 'Краторная булка N-200i (верх)'}
          price={burgerData.bun?.price ?? 200}
          thumbnail={
            burgerData.bun?.image ??
            'https://code.s3.yandex.net/react/code/bun-02.png'
          }
        />

        <ul
          className={`${styles.section__scrollWrapper} ${styles.section__list} ga-4  `}
        >
          {burgerData.items.map((item) => (
            <li key={item._id}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <DragIcon type='primary' />
                <ConstructorElement
                  isLocked={false}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            </li>
          ))}
        </ul>

        <ConstructorElement
          extraClass='ml-8'
          type='bottom'
          isLocked
          text={burgerData.bun?.name ?? 'Краторная булка N-200i (верх)'}
          price={burgerData.bun?.price ?? 200}
          thumbnail={
            burgerData.bun?.image ??
            'https://code.s3.yandex.net/react/code/bun-02.png'
          }
        />
      </div>

      {/* Блок цены и кнопки */}
      <div className={`${styles.section__actions}  ga-10 pr-4 pb-10`}>
        <div className={`${styles.section__price} ga-2`}>
          <span className='text text_type_digits-medium'>610</span>
          <CurrencyIcon type='primary' />
        </div>
        <Button size='large' htmlType='button'>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor
