import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { routerApi } from "./routes";
dotenv.config();

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require("./middlewares/error.handler");

const port = process.env.PORT || 3000;
const app: Express = express();
app.use(express.json());

/*CORS Cross Origin Request Security*/
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Mi Port ->", port);
});
