import { BaseEntity } from "./base.interface";

export enum UserRole{
    ADMIN = 'admin',
    EMPLOYEE = 'employee',
}
export interface User extends BaseEntity{
    username: string;
    password: string;
    role: UserRole;
}

export type CreateUserDTO = Omit<User, keyof BaseEntity>;

export type UserResponse = Omit<User, 'password'>;