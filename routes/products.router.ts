import express from "express";
import { ProductService } from "../services/product.service";

import { property, validatorHandler } from "../middlewares/validator.handler";
import { string } from "joi";
import { ProductsMeli } from "../model/products";
const { getProductSchema } = require("../schemas/product.schema");

const router = express.Router();
const service = new ProductService();

router.get("/", async (req, res: express.Response, next) => {
  try {
    const query: string = req.query?.q?.toString() || "";
    const products: ProductsMeli = await service.find(query);
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getProductSchema, property.params),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

export { router };
