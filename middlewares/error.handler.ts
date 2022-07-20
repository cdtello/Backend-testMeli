import { NextFunction, Request, Response } from "express";
import { Boom } from "@hapi/boom";
import { HttpError } from "http-errors";
import Express from "express";

function logErrors(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Log Errors");
  console.error(err);
  next(err);
}

function errorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Log Handler");
  console.error(err);
  res.status(500);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(
  err: Boom,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
