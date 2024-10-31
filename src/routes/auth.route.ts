import { Router } from "express";
import { routerDIR } from "../utils/routerDIR";
import { authController } from "../controllers/auth.controller";

const routeAuth = Router();

routeAuth.post(routerDIR.auth.children.login, authController.login);

export default routeAuth;