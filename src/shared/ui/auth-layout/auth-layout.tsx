import { useAuthNavigation } from '@/shared/lib/hooks'
import { Loader, Overlay } from '@/shared/ui'
import { FC, FormEvent, ReactNode } from 'react'
import { Link } from 'react-router'
import styles from './auth-layout.module.scss'

interface FooterLink {
  title: string
  link: string
  label?: string
}

interface AuthLayoutProps {
  title: string
  children: ReactNode
  footerLinks?: FooterLink[]
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  isLoading?: boolean
  errorMessage?: string | undefined | null
}

const AuthLayout: FC<AuthLayoutProps> = ({
  title,
  children,
  footerLinks = [],
  onSubmit,
  isLoading,
  errorMessage,
}) => {
  const { state } = useAuthNavigation()

  return (
    <section className={styles.section}>
      <header className={styles.section__header}>
        <h1
          className={`${styles.section__title} text_type_main-medium p-0 m-0`}
        >
          {title}
        </h1>
      </header>
      <div className={`${styles.section__main} pt-6`}>
        <form className={styles.section__form} onSubmit={onSubmit}>
          {children}
        </form>
        {errorMessage && <p className='text_color_error'>{errorMessage}</p>}
      </div>
      {footerLinks && (
        <footer className={`${styles.section__footer}  pt-20`}>
          {footerLinks.map(({ title, link, label }, index) => (
            <div
              key={index}
              className={`${styles.section__action} text_type_main-default`}
            >
              {label && <p className='m-0 p-0'>{label}</p>}
              <Link
                className={`${styles.section__link} text_type_main-default`}
                to={{ pathname: link }}
                state={state}
              >
                {title}
              </Link>
            </div>
          ))}
        </footer>
      )}
      {isLoading && (
        <Loader>
          <Overlay />
        </Loader>
      )}
    </section>
  )
}

export default AuthLayout
