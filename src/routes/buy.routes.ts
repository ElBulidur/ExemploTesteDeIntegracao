import { Router } from "express";
import buyCreateController from "../controllers/buy/buyCreateController";
import { userAuth } from "../middlewares/userAuth.middleware";

const routes = Router();

export const buyRoutes = () => {
  routes.post("/", userAuth, buyCreateController);

  return routes;
};
