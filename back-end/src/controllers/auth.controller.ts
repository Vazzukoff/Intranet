import { NextFunction, Request, Response } from "express";

import { login, register } from "@/services/auth.service";

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { username, password } = req.body;
      const authResponse = await login(username, password);
      res.status(200).json(authResponse);
    } catch (error) {
      next(error);
    }
  };

  export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log('Request body:', req.body);
      const { username, password } = req.body;
      const data = await register(username, password);
      res.status(201).json(data);
    } catch (error) {
      console.error('Registration error:', error);
      next(error);
    }
  };