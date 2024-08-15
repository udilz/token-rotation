
import TodoController from "../controllers/todo.controller";
import express from "express";
import { authorization } from "../middleware/authorization";

export const todoRouter = express.Router();
export const authRouter = express.Router();
todoRouter.use(authorization);

todoRouter.get("/", TodoController.handleGetAllTodos);
todoRouter.post("/", TodoController.handleCreateTodo);
todoRouter.patch("/:id", TodoController.handleUpdateTodo);
todoRouter.delete("/:id", TodoController.handleDeleteTodo);

