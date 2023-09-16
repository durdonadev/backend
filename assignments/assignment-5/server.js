import express from "express";
import { customers, products, orders } from "./data.js";
import { v4 as uuid, validate } from "uuid";

const app = express();
app.use(express.json());
const PORT = 4000;

// GET all customers.
app.get("/customers", (req, res) => {
    res.status(200).json({
        data: customers
    });
});

// GET a single customer by ID.
app.get("/customers/:customerId", (req, res) => {
    const customerId = req.params.customerId;

    if (!validate(customerId) || !customers[customerId]) {
        return res.status(400).json({ message: "Not a valid customer ID" });
    }

    res.status(200).json({ data: customers[customerId] });
});

// Create a new customer
app.post("/customers", (req, res) => {
    const data = req.body;
    const id = uuid();
    const customer = {
        id,
        ...data
    };
    customers[id] = customer;
    res.status(201).json({ data: customer });
});

// Update the details of a customer by id
app.put("/customers/:customerId", (req, res) => {
    const customerId = req.params.customerId;
    const updatedData = req.body;

    if (!validate(customerId) || !customers[customerId]) {
        return res.status(400).json({ message: "Not a valid customer ID" });
    }

    customers[customerId] = { ...customers[customerId], ...updatedData };
    res.status(200).json({ data: customers[customerId] });
});

// Delete a customer by Id
app.delete("/customers/:customerId", (req, res) => {
    const customerId = req.params.customerId;

    if (!validate(customerId) || !customers[customerId]) {
        return res.status(400).json({ message: "Not a valid customer ID" });
    }
    delete customers[customerId];
    res.status(204).send();
});

// Get all products.
app.get("/products", (req, res) => {
    res.status(200).json({
        data: products
    });
});

// Get a product by id.
app.get("/products/:productId", (req, res) => {
    const productId = req.params.productId;
    if (!validate(productId) || !products[productId]) {
        return res.status(400).json({ message: "Not a valid product ID" });
    }

    res.status(200).json({ data: products[productId] });
});

// Create a new product
app.post("/products", (req, res) => {
    const data = req.body;
    const id = uuid();
    const product = {
        id,
        ...data
    };
    products[id] = product;
    res.status(201).json({ data: product });
});

// Update the information about a specific product.
app.put("/products/:productId", (req, res) => {
    const productId = req.params.productId;
    const updatedData = req.body;

    if (!validate(productId) || !products[productId]) {
        return res.status(400).json({ message: "Not a valid product ID" });
    }

    products[productId] = { ...products[productId], ...updatedData };
    res.status(200).json({ data: products[productId] });
});

// Delete a product
app.delete("/products/:productId", (req, res) => {
    const productId = req.params.productId;

    if (!validate(productId) || !products[productId]) {
        return res.status(400).json({ message: "Not a valid product ID" });
    }
    delete products[productId];
    res.status(204).send();
});

// GET all orders.
app.get("/orders", (req, res) => {
    res.status(200).json({
        data: orders
    });
});

// Get a order by id.
app.get("/orders/:orderId", (req, res) => {
    const orderId = req.params.orderId;
    if (!validate(orderId) || !orders[orderId]) {
        return res.status(400).json({ message: "Not a valid product ID" });
    }

    res.status(200).json({ data: orders[orderId] });
});

// Create a new order
app.post("/orders", (req, res) => {
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

    const id = uuid;
    const order = {
        id,
        customerId,
        productIds
    };
    orders[id] = order;

    res.status(201).json({ data: order });
});

// Update the information about a specific order.
app.put("/orders/:orderId", (req, res) => {
    const orderId = req.params.orderId;
    const updatedData = req.body;

    if (!validate(orderId) || !orders[orderId]) {
        return res.status(400).json({ message: "Not a valid order ID" });
    }

    orders[orderId] = { ...orders[orderId], ...updatedData };
    res.status(200).json({ data: orders[orderId] });
});

// Delete a order
app.delete("/orders/:orderId", (req, res) => {
    const orderId = req.params.orderId;

    if (!validate(orderId) || !orders[orderId]) {
        return res.status(400).json({ message: "Not a valid order ID" });
    }
    delete orders[orderId];
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
