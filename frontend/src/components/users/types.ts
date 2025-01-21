export enum UserRole {
  NORMAL = 'NORMAL',
  ADMIN = 'ADMIN',
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: UserRole
}
