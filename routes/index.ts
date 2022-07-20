import { router } from "./products.router";
import express from "express";

export function routerApi(app: express.Express) {
  const routerExpress = express.Router();
  app.use("/v1/api", routerExpress);

  routerExpress.use("/items", router);
}
