import { BaseError } from "@common/errors";
import { NextFunction, Request, Response } from "express";

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BaseError) {
    return res.status(err.code).json({
      code: err.code,
      message: err.message,
      trace: err.stack,
      metadata: err.metadata,
    });
  }
  res.status(500).json({
    code: 500,
    message: err.message,
    trace: err.stack,
    metadata: {},
  });

  next(err);
};
