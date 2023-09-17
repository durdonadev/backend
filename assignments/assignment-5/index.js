import express from "express";
import {
    customerRouter,
    productRouter,
    orderRouter
} from "./routes/crm.route.js";

const app = express();
app.use(express.json());

const PORT = 4000;

app.use("/customers", customerRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
