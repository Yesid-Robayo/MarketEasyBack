import { Router } from "express";
import { routerDIR } from "../utils/routerDIR";
import { userController } from "../controllers/user.controller";
const routeUser = Router();

routeUser.post(routerDIR.user.children.createUser, userController.register);

export default routeUser;