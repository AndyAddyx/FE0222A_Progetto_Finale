import { User } from './user'

export interface GetUsersResponse {
  content: User[]
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  totalElements: number
  totalPages: number
}
