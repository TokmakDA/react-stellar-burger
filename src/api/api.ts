// TypeScript Version with Typing

import { TBurgerIngredient } from '@/@types/types.ts'

interface ApiOptions {
  baseUrl: string
  headers: Record<string, string>
}

interface RequestParams {
  [key: string]: string | number | boolean
}

interface IngredientsResponse {
  success: boolean
  data: TBurgerIngredient[]
}

class Api {
  private readonly _baseUrl: string
  private readonly _headers: Record<string, string>

  constructor(options: ApiOptions) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  private _checkResponse = async <T>(res: Response): Promise<T> => {
    if (res.ok) {
      return (await res.json()) as T
    }
    throw await res.json()
  }

  private _makeRequest = async <T>(
    url: string,
    method: string,
    body?: Record<string, unknown>,
    params?: RequestParams
  ): Promise<T> => {
    const parameters = params
      ? '?' + new URLSearchParams(params as Record<string, string>).toString()
      : ''

    const config: RequestInit = {
      method,
      headers: this._headers,
    }

    if (body !== undefined) {
      config.body = JSON.stringify(body)
    }

    const res = await fetch(`${this._baseUrl}${url}${parameters}`, config)
    return this._checkResponse<T>(res)
  }

  public getIngredients = (): Promise<IngredientsResponse> => {
    return this._makeRequest<IngredientsResponse>('ingredients/', 'GET')
  }
}

const config: ApiOptions = {
  baseUrl: 'https://norma.nomoreparties.space/api/',
  headers: {
    'Content-Type': 'application/json',
  },
}

export const api = new Api(config)
