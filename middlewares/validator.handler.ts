import { NextFunction, Request, Response } from "express";

import boom from "@hapi/boom";

enum property {
  body = "body",
  query = "query",
  params = "params",
}

function validatorHandler(schema: any, property: property) {
  return (req: Request, res: Response, next: NextFunction) => {
    // req.body
    // req.params
    // req.query
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

export { validatorHandler, property };
