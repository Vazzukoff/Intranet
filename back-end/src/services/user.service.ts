import { User, UserResponse } from "@/interfaces/user.interface";
import { updateUser } from "@/repositories/user.repository";
import { generateToken } from "@/utils/jwt";
import { hashPassword } from "@/utils/security";


export async function updateUserData(
    id: User["id"],
    updatedUser: Partial<User>
  ): Promise<{ user: UserResponse; token: string }> {
    
    if(updatedUser.password){
      const hashedPassword = await hashPassword(updatedUser.password);
      updatedUser.password = hashedPassword;
    }
    const userData = await updateUser(id, updatedUser);
    const token = generateToken(userData);
  
    const user: UserResponse = {
      id: id,
      username: userData.username,
      role: userData.role,
      createdAt: userData.createdAt,
    };
  
    return { user, token };
  }