export enum UserRole {
  NORMAL = 'NORMAL',
  ADMIN = 'ADMIN',
}

export interface User {
  email: string
  email_verified: boolean
  family_name: string
  given_name: string
  name: string
  nickname: string
  picture: string
  sub: string
  updated_at: string
  'https://winglink.api/email': string
  'https://winglink.api/roles': string[]
}
