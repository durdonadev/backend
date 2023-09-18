import express from "express";
import { carRouter } from "./routes/car.route.js";
import { rentalRouter } from "./routes/rental.routes.js";
import { maintenanceRouter } from "./routes/maintenance.routes.js";

const app = express();
app.use(express.json());

const PORT = 4000;

app.use("/cars", carRouter);
app.use("/rentals", rentalRouter);
app.use("/maintenance", maintenanceRouter);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
