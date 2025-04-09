import { TIngredient } from '@/shared/types'
import { CurrencyIcon } from '@/shared/ui'
import { GradientCircle } from '@/shared/ui/gradient-circle/gradient-circle.tsx'
import { FC } from 'react'
import styles from './order-ingredient.module.scss'

type OrderIngredientProps = {
  ingredient: Pick<TIngredient, 'name' | '_id' | 'image_mobile' | 'price'> & {
    count: number
  }
}

export const OrderIngredient: FC<OrderIngredientProps> = ({ ingredient }) => {
  console.log(ingredient)

  return (
    <div className={styles.ingredient}>
      <GradientCircle>
        <img src={ingredient.image_mobile} alt={ingredient.name} />
      </GradientCircle>
      <span>{ingredient.name}</span>
      <div className={styles.ingredient__price}>
        <span className='text text_type_digits-default'>
          {ingredient.count} x {ingredient.price}
        </span>
        <CurrencyIcon type='primary' />
      </div>
    </div>
  )
}
