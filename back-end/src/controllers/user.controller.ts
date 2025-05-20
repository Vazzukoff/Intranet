import { NextFunction, Response } from "express";

import { NotFoundError } from "@/errors/app.errors";
import { AuthenticatedRequest } from "@/interfaces/auth.interface";
import * as userRepository from "@/repositories/user.repository";
import { UserResponse } from "@/interfaces/user.interface";
import * as userService from "@/services/user.service";
import { getValidationUsername } from "@/services/auth.service";

export const getCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userRepository.getUserById(req.user!.id);
    if (!user) throw new NotFoundError("User", req.user!.id);
    const { id, username, role } = user;
    const userResponse: UserResponse = { id, username, role, createdAt: user.createdAt };
    res.json(userResponse);
  } catch (error) {
    next(error);
  }
};

export const findUsername = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const UsernameExist = await getValidationUsername(req.body.username);
    res.json(UsernameExist);
  } catch (error) {
    next(error);
  }
};

export const updateCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {

try {
    const user = await userService.updateUserData(req.user!.id, req.body.updatedUser);
    if (!user) throw new NotFoundError("User", req.user!.id);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }

};

export const deleteCurrentUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedUser = await userRepository.deleteUser(req.user!.id);
    if (!deletedUser) throw new NotFoundError("User", req.user!.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
