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
const todo_repository_1 = __importDefault(require("../repositories/todo.repository"));
const TodoServices = {
    getAllTodos: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allTodo = yield todo_repository_1.default.getAllTodos();
            return allTodo;
        }
        catch (error) {
            console.log(error);
        }
    }),
    createTodo: (createTodo) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, title, content } = createTodo;
            if (!userId || !title || !content) {
                throw new Error("this field is required");
            }
            const newTodo = yield todo_repository_1.default.createTodo(createTodo);
            return newTodo;
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateTodo: (id, todo) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, content } = todo;
            if (!title || !content) {
                throw new Error("this field is required");
            }
            const newTodo = yield todo_repository_1.default.updateTodo(id, todo);
            return newTodo;
        }
        catch (error) {
            console.log(error);
        }
    }),
    deleteTodo: (id, todo) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const deleteTodo = yield todo_repository_1.default.deleteTodo(id, todo);
            return deleteTodo;
        }
        catch (error) {
            console.log(error);
        }
    })
};
exports.default = TodoServices;
