// убираем ошибку Линтера в IDE для Input
import type { TICons } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons'

declare module '@ya.praktikum/react-developer-burger-ui-components' {
  import * as React from 'react'

  export interface TInputInterface
    extends Omit<React.HTMLProps<HTMLInputElement>, 'size'> {
    value: string
    type?: 'text' | 'email' | 'password'
    placeholder?: string
    success?: boolean
    error?: boolean
    disabled?: boolean
    icon?: keyof TICons
    errorText?: string
    size?: 'default' | 'small'
    extraClass?: string
    onChange(e: React.ChangeEvent<HTMLInputElement>): void
    onIconClick?(e: React.MouseEvent<HTMLDivElement>): void
    onBlur?(e?: React.FocusEvent<HTMLInputElement>): void
    onFocus?(e?: React.FocusEvent<HTMLInputElement>): void
  }

  export const Input: React.FC<TInputInterface>
}
