import express from "express";
import "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import { configDotenv } from "dotenv";
import bodyParser from "body-parser";
configDotenv();

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use("/api/user", userRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/location", locationRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
