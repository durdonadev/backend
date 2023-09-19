import express from "express";
import { employeeRouter } from "./routes/employee.routes.js";

const app = express();
app.use(express.json());

const PORT = 3000;

app.use("/employees", employeeRouter);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
