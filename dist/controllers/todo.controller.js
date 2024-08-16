"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_services_1 = __importDefault(require("../services/todo.services"));
const TodoController = {
    handleGetAllTodos: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allTodo = yield todo_services_1.default.getAllTodos();
            return res.status(200).json({ message: "berhasil ambil data todo", data: allTodo });
        }
        catch (error) {
            console.log(error);
        }
    }),
    handleCreateTodo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, title, content } = req.body;
            const createTodo = yield todo_services_1.default.createTodo({ userId, title, content });
            return res.status(201).json({ message: "berhasil create data todo", data: createTodo });
        }
        catch (error) {
            console.log(error);
        }
    }),
    handleUpdateTodo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const todoId = req.params.id;
            const { userId, title, content } = req.body;
            const newTodo = yield todo_services_1.default.updateTodo(todoId, { userId, title, content });
            return res.status(200).json({ message: "berhasil update data todo", data: newTodo });
        }
        catch (error) {
            console.log(error);
        }
    }),
    handleDeleteTodo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const todoId = req.params.id;
            const { userId, title, content } = req.body;
            const deleteTodo = yield todo_services_1.default.deleteTodo(todoId, { userId, title, content });
            return res.status(200).json({ message: "berhasil delete todo", data: deleteTodo });
        }
        catch (error) {
            console.log(error);
        }
    })
};
exports.default = TodoController;
