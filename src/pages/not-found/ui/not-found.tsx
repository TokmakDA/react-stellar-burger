import { FullPage, StatePage } from '@/shared/ui'
import type { FC } from 'react'

export const NotFoundPage: FC = () => {
  return (
    <FullPage>
      <StatePage type='notfound' />
    </FullPage>
  )
}
