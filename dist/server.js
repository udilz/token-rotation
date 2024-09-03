"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const todo_route_1 = require("./routes/todo.route");
const auth_route_1 = require("./routes/auth.route");
dotenv_1.default.config();
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("connected to mongodb"))
    .catch((err) => console.log(err));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/v1/todos", todo_route_1.todoRouter);
app.use("/api/v1/users", auth_route_1.authRouter);
app.listen(process.env.PORT, () => {
    console.log(`server running at port ${process.env.PORT}`);
});
