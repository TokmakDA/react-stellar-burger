import { useGetIngredientsQuery } from '@/entities/ingredient'

export const useInitAppData = () => {
  useGetIngredientsQuery(undefined, {
    refetchOnReconnect: true,
    refetchOnFocus: true,
  })
}
