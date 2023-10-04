import express from "express";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import dotenv from "dotenv";
import { todoRouter } from "./routes/todo.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = 3000;

const client = new MongoClient(process.env.DB_URL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
let db;
const initDB = async () => {
    try {
        await client.connect();
        db = client.db("todo-app-express-mongodb");
    } catch (err) {
        console.log("Some error", err);
    }
};

initDB();

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use("/todos", todoRouter);
app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
});
