import express from "express";
import { bookRouter } from "./routes/book.route.js";

const app = express();
app.use(express.json());

const PORT = 4000;

// Get all books (with optional genre filter)

app.use("/books", bookRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
