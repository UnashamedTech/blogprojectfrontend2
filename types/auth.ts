export interface DecodedToken {
  sub: string
  email: string
  imageUrl?: string
  name: string
  roles: string[]
  iat: number
  exp: number
}
