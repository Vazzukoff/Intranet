import {
    UsernameAlreadyExistsError,
    InvalidCredentialsError,
} from "@/errors/auth.errors";
import { generateToken } from "@/utils/jwt";
import { CreateUserDTO, UserResponse, UserRole } from '@/interfaces/user.interface';
import { createUser, getUserByUsername } from '@/repositories/user.repository';
import { comparePasswords, hashPassword } from '@/utils/security';

export async function login(
    username: string,
    password: string,
    //role: UserRole,
  ): Promise<{ user: UserResponse; token: string }> {
    const user = await getUserByUsername(username);
    if (!user) {
      throw new UsernameAlreadyExistsError();
    }
  
    const isPasswordValid = await comparePasswords(password, user.password!);
    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }
  
    const token = generateToken(user);
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

export async function register(
    username: string,
    password: string
): Promise<{ user: UserResponse; token: string }> {
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
        throw new UsernameAlreadyExistsError();
    }

const hashedPassword = await hashPassword(password);

const newUser: CreateUserDTO = {
    username: username,
    password: hashedPassword,
    role: UserRole.EMPLOYEE,
};

const user = await createUser(newUser);
const token = generateToken(user);

const userResponse: UserResponse = {
    id: user.id,
    username: user.username,
    role: user.role,
    createdAt: user.createdAt,
}

return { user: userResponse, token };
}

export async function getValidationUsername(
  email: string
): Promise<boolean> {
  const existingUser = await getUserByUsername(email);
  return !existingUser;
    
}

export async function getUserOrCreateUser(
  username: string,
  password: string
): Promise<{ user: UserResponse; token: string }> {
  const existingUser = await getUserByUsername(username);
  if (!existingUser) {
    const newUser: CreateUserDTO = {
      username,
      password,
      role: UserRole.EMPLOYEE,
    };

    if (!password) {
      throw new Error ("Password is required");
    } 

    const user = await createUser(newUser);
    const token = generateToken(user);

    const userResponse: UserResponse = {
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
    };

    return { user: userResponse, token };
  } else {
    const userResponse: UserResponse = {
      id: existingUser.id,
      username: existingUser.username,
      role: existingUser.role,
      createdAt: existingUser.createdAt,
    };

    return { user: userResponse, token: "" };
  }
}

export async function logout(): Promise<void> {
  // Handle logout logic, if necessary
}