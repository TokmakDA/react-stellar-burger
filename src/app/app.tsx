import { Router } from '@/app/router'
import { useInitAppData } from '@/shared/lib/hooks'

export const App = () => {
  useInitAppData()

  return <Router />
}
