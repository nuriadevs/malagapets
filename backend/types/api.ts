export type Paginated<T> = {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export type ApiError = {
  error: string
  status: number
}

export type ApiSuccess<T> = {
  data: T
  status: number
}
