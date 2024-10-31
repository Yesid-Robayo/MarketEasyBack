import { Router } from "express";
import routeUser from "./user.route";
import routeAuth from "./auth.route";
import { routerDIR } from "../utils/routerDIR";
import routeProducts from "./products.route";
import routeCart from "./cart.route";

const router = Router();

router.use(routerDIR.user.main, routeUser);
router.use(routerDIR.auth.main, routeAuth);
router.use(routerDIR.products.main, routeProducts);
router.use(routerDIR.cart.main, routeCart);

export default router;