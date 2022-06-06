import { Router } from "express";
import cartAddProdControle from "../controllers/cart/cartAddProd.controller";
import cartDelProdControle from "../controllers/cart/cartDelProd.controller";
import { userAuth } from "../middlewares/userAuth.middleware";

const routes = Router();

export const cartRoutes = () => {
  routes.post("/", userAuth, cartAddProdControle);
  routes.delete("/:product_id", userAuth, cartDelProdControle);
  return routes;
};
