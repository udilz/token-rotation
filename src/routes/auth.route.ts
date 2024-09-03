import express from "express";
import AuthController from "../controllers/auth.controller";
export const authRouter = express.Router();

// auth router
authRouter.get("/", AuthController.handleAllUsers);
authRouter.get("/:id", AuthController.handleGetSingleUser);
authRouter.post("/", AuthController.handleCreateUser);
authRouter.patch("/:id", AuthController.handleUpdateUser);
authRouter.delete("/:id", AuthController.handleDeleteUser);
authRouter.post("/login", AuthController.handleLogin);
authRouter.post("/logout", AuthController.handleLogout);
