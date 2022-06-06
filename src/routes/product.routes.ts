import { Router } from "express";
import productCreateController from "../controllers/product/productCreate.controller";
import productDeleteSelfController from "../controllers/product/productDeleteSelf.controller";
import productListController from "../controllers/product/productList.controller";
import productListOneController from "../controllers/product/productListOne.controller";
import productUpdateController from "../controllers/product/productUpdate.controller";
import { userAuth } from "../middlewares/userAuth.middleware";

const routes = Router();
export const productRoutes = () => {
  routes.post("/", productCreateController);
  routes.get("/", productListController);
  routes.get("/:id", productListOneController);
  routes.delete("/:id", productDeleteSelfController);
  routes.patch("/:id", productUpdateController);
  return routes;
};
