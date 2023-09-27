import express from "express";
import { postRouter } from "./routes/post.routes.js";
import { authorRouter } from "./routes/author.routes.js";

const app = express();
app.use(express.json());
const PORT = 4000;

app.use("/posts", postRouter);
app.use("/authors", authorRouter);

app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
});
