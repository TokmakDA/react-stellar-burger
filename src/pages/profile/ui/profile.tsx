import { ProfileNavigation } from '@/features/profile/ui'
import { Outlet } from 'react-router'
import styles from './profile.module.scss'

const Profile = () => {
  return (
    <div className={styles.page}>
      <aside className={styles.page__sidebar}>
        <ProfileNavigation />
      </aside>
      <Outlet />
    </div>
  )
}

export default Profile
