import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/app.errors";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err instanceof AppError) {
    res.status(err.status).json({
      error: {
        message: err.message,
        code: err.code,
      },
    });
    return;
  }

  res.status(500).json({
    error: {
      message: "Internal Server Error",
      code: "INTERNAL_ERROR",
    },
  });
}