import { Router } from "express";

import {
    customerController,
    productController,
    orderController
} from "../controllers/crm.controller.js";

const customerRouter = Router();
const productRouter = Router();
const orderRouter = Router();

customerRouter.get("/", customerController.getAllCustomers);
customerRouter.post("/", customerController.createCustomer);
customerRouter.get("/:customerId", customerController.getCustomerById);
customerRouter.put("/:customerId", customerController.updateCustomer);
customerRouter.delete("/:customerId", customerController.deleteCustomer);

productRouter.get("/", productController.getAllProducts);
productRouter.post("/", productController.createProduct);
productRouter.get("/:productId", productController.getProductById);
productRouter.put("/:productId", productController.updateProduct);
productRouter.delete("/:productId", productController.deleteProduct);

orderRouter.get("/", orderController.getAllOrders);
orderRouter.post("/", orderController.createOrder);
orderRouter.get("/:orderId", orderController.getOrderById);
orderRouter.put("/:orderId", orderController.updateOrder);
orderRouter.delete("/:orderId", orderController.deleteOrder);

export { customerRouter };
export { productRouter };
export { orderRouter };
