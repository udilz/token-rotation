import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";


import cookieParser from "cookie-parser";
import { todoRouter } from "./routes/todo.route";
import { authRouter } from "./routes/auth.route";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));
 

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/todos", todoRouter)
app.use("/api/v1/users", authRouter);

app.listen(process.env.PORT, () => {
    console.log(`server running at port ${process.env.PORT}`)
})