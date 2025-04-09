import styles from '@/entities/order/ui/order-card/order-card.module.scss'

export const EmptyPage = () => {
  return (
    <section className={styles['empty-page']}>
      <header className={styles['empty-page__header']}>
        <h2 className={`text text_type_main-large`}>Данные отсутствуют </h2>
      </header>
      <div className={styles['empty-page__wrapper']}>
        <p className='text text_type_main-default'>
          Попробуйте обновить страницу или повторить позже.
        </p>
      </div>
    </section>
  )
}
