import { NextFunction, Request, Response } from "express";

import { objectToCamelCase } from "@/utils/case-converter";

export const camelCaseMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.body) {
    req.body = objectToCamelCase(req.body);
  }
  if (req.query) {
    req.query = objectToCamelCase(req.query);
  }
  if (req.params) {
    req.params = objectToCamelCase(req.params);
  }
  next();
};