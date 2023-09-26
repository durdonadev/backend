import express from "express";
import { postRouter } from "./routes/post.routes.js";

const app = express();
app.use(express.json());
const PORT = 4000;

app.use("/posts", postRouter);

app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
});
