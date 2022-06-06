import { Router } from "express";

import userCreateControle from "../controllers/user/userCreate.controller";
import userDeleteSelfController from "../controllers/user/userDeleteSelf.controller";
import userListController from "../controllers/user/userList.controller";
import userListOneController from "../controllers/user/userListOne.controller";
import userLoginController from "../controllers/user/userLogin.controller";
import userUpdateController from "../controllers/user/userUpdate.controller";
import { userAuth } from "../middlewares/userAuth.middleware";

const routes = Router();

export const userRoutes = () => {
  routes.post("", userCreateControle);
  routes.post("/login", userLoginController);
  routes.get("/", userAuth, userListController);
  // routes.get("/", userListController);
  routes.get("/me", userAuth, userListOneController);
  routes.delete("/me", userAuth, userDeleteSelfController);
  routes.patch("/me/updatePassword", userAuth, userUpdateController);

  return routes;
};
