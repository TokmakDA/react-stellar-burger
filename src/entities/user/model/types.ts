export type TUser = {
  email: string
  name: string
}

export interface IUserState {
  user: TUser | null
}
