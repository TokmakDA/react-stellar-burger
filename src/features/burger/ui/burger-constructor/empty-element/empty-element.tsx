import { FC } from 'react'
import styles from './empty-element.module.scss'

type TEmptyElementProps = {
  type?: 'top' | 'bottom'
  extraClass?: string
}
const EmptyElement: FC<TEmptyElementProps> = ({
  type = undefined,
  extraClass,
}) => {
  return (
    <div
      className={`${styles.container} ${extraClass} ${type ? styles[`container__type_${type}`] : ''}`}
    >
      {type ? 'Выбурите булки' : 'Выбурите ингредиент'}
    </div>
  )
}

export default EmptyElement
