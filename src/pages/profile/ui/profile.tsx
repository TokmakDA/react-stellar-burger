import { ProfileNavigation } from '@/features/profile/ui'
import { Outlet } from 'react-router'
import styles from './profile.module.scss'

const Profile = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <ProfileNavigation />
      </aside>
      <section className={styles.content}>
        <Outlet />
      </section>
    </div>
  )
}

export default Profile
