import { customers, products, orders } from "../data.js";
import { v4 as uuid, validate } from "uuid";

const API_KEY = "jkdfbgjh765478326578%%%***@@@@bsdhfbdhjbbhvbdsfjhgc";

class CustomerController {
    // GET all customers.
    getAllCustomers = (req, res) => {
        res.status(200).json({
            data: customers
        });
    };

    // GET a single customer by ID.
    getCustomerById = (req, res) => {
        const customerId = req.params.customerId;

        if (!validate(customerId) || !customers[customerId]) {
            return res.status(400).json({ message: "Not a valid customer ID" });
        }

        res.status(200).json({ data: customers[customerId] });
    };

    // Create a new customer
    createCustomer = (req, res) => {
        const data = req.body;
        const id = uuid();
        const customer = {
            id,
            ...data
        };
        customers[id] = customer;
        res.status(201).json({ data: customer });
    };

    // Update the details of a customer by id
    updateCustomer = (req, res) => {
        const customerId = req.params.customerId;
        const updatedData = req.body;

        if (!validate(customerId) || !customers[customerId]) {
            return res.status(400).json({ message: "Not a valid customer ID" });
        }

        customers[customerId] = { ...customers[customerId], ...updatedData };
        res.status(200).json({ data: customers[customerId] });
    };

    // Delete a customer by Id
    deleteCustomer = (req, res) => {
        const customerId = req.params.customerId;

        if (!validate(customerId) || !customers[customerId]) {
            return res.status(400).json({ message: "Not a valid customer ID" });
        }
        delete customers[customerId];
        res.status(204).send();
    };
}

class ProductController {
    // Get all products.
    getAllProducts = (req, res) => {
        res.status(200).json({
            data: products
        });
    };

    // Get a product by id.
    getProductById = (req, res) => {
        const productId = req.params.productId;
        if (!validate(productId) || !products[productId]) {
            return res.status(400).json({ message: "Not a valid product ID" });
        }

        res.status(200).json({ data: products[productId] });
    };

    // Create a new product
    createProduct = (req, res) => {
        const data = req.body;
        const id = uuid();
        const product = {
            id,
            ...data
        };
        products[id] = product;
        res.status(201).json({ data: product });
    };

    // Update the information about a specific product.
    updateProduct = (req, res) => {
        const productId = req.params.productId;
        const updatedData = req.body;

        if (!validate(productId) || !products[productId]) {
            return res.status(400).json({ message: "Not a valid product ID" });
        }

        products[productId] = { ...products[productId], ...updatedData };
        res.status(200).json({ data: products[productId] });
    };

    // Delete a product
    deleteProduct = (req, res) => {
        const productId = req.params.productId;

        if (!validate(productId) || !products[productId]) {
            return res.status(400).json({ message: "Not a valid product ID" });
        }
        delete products[productId];
        res.status(204).send();
    };
}

class OrderController {
    // GET all orders.
    getAllOrders = (req, res) => {
        res.status(200).json({
            data: orders
        });
    };

    // Get a order by id.
    getOrderById = (req, res) => {
        const orderId = req.params.orderId;
        if (!validate(orderId) || !orders[orderId]) {
            return res.status(400).json({ message: "Not a valid product ID" });
        }

        res.status(200).json({ data: orders[orderId] });
    };

    // Create a new order
    createOrder = (req, res) => {
        const { customerId, productIds } = req.body;
        if (
            !validate(customerId) ||
            !customers[customerId] ||
            !Array.isArray(productIds) ||
            productIds.some(
                (productId) => !validate(productId) || !products[productId]
            )
        ) {
            return res
                .status(400)
                .json({ message: "Not a valid customerId or productIds" });
        }

        const id = uuid();
        const order = {
            id,
            customerId,
            productIds
        };
        orders[id] = order;

        res.status(201).json({ data: order });
    };

    // Update the information about a specific order.
    updateOrder = (req, res) => {
        const orderId = req.params.orderId;
        const updatedData = req.body;

        if (!validate(orderId) || !orders[orderId]) {
            return res.status(400).json({ message: "Not a valid order ID" });
        }

        orders[orderId] = { ...orders[orderId], ...updatedData };
        res.status(200).json({ data: orders[orderId] });
    };

    // Delete a order
    deleteOrder = (req, res) => {
        const orderId = req.params.orderId;

        if (!validate(orderId) || !orders[orderId]) {
            return res.status(400).json({ message: "Not a valid order ID" });
        }
        delete orders[orderId];
        res.status(204).send();
    };
}

export const customerController = new CustomerController();
export const productController = new ProductController();
export const orderController = new OrderController();
