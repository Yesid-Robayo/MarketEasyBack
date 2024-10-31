import { Router } from "express";
import { routerDIR } from "../utils/routerDIR";
import { cartController } from "../controllers/cart.controller";

const routeCart = Router();

routeCart.get(routerDIR.cart.children.getCart, cartController.getCart);
routeCart.post(routerDIR.cart.children.addProductToCart, cartController.addProductToCart);
routeCart.delete(routerDIR.cart.children.deleteProductFromCart, cartController.deleteProductFromCart);
routeCart.put(routerDIR.cart.children.updateProductQuantity, cartController.updateProductQuantity);
routeCart.post(routerDIR.cart.children.getCountProduct, cartController.getCountProduct);
export default routeCart;