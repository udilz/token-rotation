"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
exports.authRouter = express_1.default.Router();
// auth router
exports.authRouter.get("/", auth_controller_1.default.handleAllUsers);
exports.authRouter.get("/:id", auth_controller_1.default.handleGetSingleUser);
exports.authRouter.post("/", auth_controller_1.default.handleCreateUser);
exports.authRouter.patch("/:id", auth_controller_1.default.handleUpdateUser);
exports.authRouter.delete("/:id", auth_controller_1.default.handleDeleteUser);
exports.authRouter.post("/login", auth_controller_1.default.handleLogin);
exports.authRouter.post("/logout", auth_controller_1.default.handleLogout);
