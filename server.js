import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectToDb from "./Config/ConnectToDb.js";
import AuthRouter from "./Routes/AuthRouter.js";
import errorHandler from "./Middleware/errorhandler.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is running✅😎 ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to  Web Novel App" });
});
// app.all("/", (req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });
connectToDb();

app.use("/auth", AuthRouter);

app.use("/{*any}", errorHandler);
