import { Router } from "express";
import { routerDIR } from "../utils/routerDIR";
import { productsController } from "../controllers/products.controller";

const routeProducts = Router();

routeProducts.post(routerDIR.products.children.createProduct, productsController.createProduct);
routeProducts.get(routerDIR.products.children.getProducts, productsController.getProducts);

export default routeProducts;