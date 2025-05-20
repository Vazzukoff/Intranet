import DBLocal from 'db-local'
import { CreateUserDTO, User } from "../interfaces/user.interface";
import { toSnakeCase } from "@/utils/case-converter";

export async function createUser(user: CreateUserDTO): Promise<User> {
  const { username, password, role  } = user;
  const newUser = await DBLocal.queryOne<User>(
    "INSERT INTO users (username, password, role, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *",
    [username, password, role]
  );

  if (!newUser) {
    throw new Error("Failed to create user");
  }

  return newUser;
}

export async function getUserById(id: User["id"]): Promise<User | null> {
  return await DBLocal.queryOne<User>("SELECT * FROM users WHERE id = $1", [id]);
}

export async function getUserByUsername(username: string): Promise<User | null> {
  return await DBLocal.queryOne<User>("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
}

export async function updateUser(
  id: User["id"],
  data: Partial<Omit<User, "id">>
): Promise<User> {
  const setClause = Object.keys(data)
    .map((key, index) => `${toSnakeCase(key)} = $${index + 1}`)
    .join(", ");

  const updateUser = await DBLocal.queryOne<User>(
    `UPDATE users SET ${setClause} WHERE id = $${
      Object.keys(data).length + 1
    } RETURNING *`,
    [...Object.values(data), id]
  );

  if (!updateUser) {
    throw new Error("Failed to update user");
  }

  return updateUser;
}

export async function deleteUser(id: User["id"]): Promise<User | null> {
  return await DBLocal.queryOne<User>(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );
}