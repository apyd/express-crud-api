import type { UUID } from "node:crypto"

export type UserRole = 'admin' | 'user'

export type CreateUserRequestBody = {
    email: string,
    password: string,
    role: UserRole
}

export type LoginUserRequestBody = Omit<CreateUserRequestBody, 'role'>

export type UserId = UUID;

export type CurrentUser = {
    id: UserId,
    email: string,
    password: string,
    role: string
}