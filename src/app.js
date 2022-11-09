import express from "express";
import morgan from "morgan";

import userRouter from "./user/userRouter/userRouter";
import toDoRouter from "./toDo/toDoRouter/toDoRouter";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/user", userRouter);
app.use("/api/toDos", toDoRouter);

module.exports = app;
