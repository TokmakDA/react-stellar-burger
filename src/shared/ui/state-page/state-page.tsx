import styles from './state-page.module.scss'
import { ReactNode } from 'react'
import { statePresets } from './config'

interface StatePageProps {
  type?: keyof typeof statePresets
  title?: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}

export const StatePage = ({
  type = 'empty',
  title,
  description,
  icon,
  action = null,
}: StatePageProps) => {
  const preset = statePresets[type]

  return (
    <section className={styles['state-page']}>
      <header className={styles['state-page__header']}>
        <h2 className='text text_type_main-large'>{title ?? preset.title}</h2>
      </header>

      <div className={styles['state-page__icon']}>
        {icon ?? <span>{preset.emoji}</span>}
      </div>
      <div className={styles['state-page__wrapper']}>
        <p className='text text_type_main-medium'>
          {description ?? preset.description}
        </p>
        {action}
      </div>
    </section>
  )
}
