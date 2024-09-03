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
Object.defineProperty(exports, "__esModule", { value: true });
const todo_schema_1 = require("../models/todo.schema");
const TodoRepository = {
    getAllTodos: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allTodo = yield todo_schema_1.Todo.find();
            return allTodo;
        }
        catch (error) {
            console.log(error);
        }
    }),
    getSingleTodo: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getOne = yield todo_schema_1.Todo.findById(id);
            return getOne;
        }
        catch (error) {
            console.log(error);
        }
    }),
    createTodo: (todo) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newTodo = new todo_schema_1.Todo(todo);
            yield newTodo.save();
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateTodo: (id, todo) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const todoUpdate = yield todo_schema_1.Todo.findByIdAndUpdate(id, todo);
            return todoUpdate;
        }
        catch (error) {
            console.log(error);
        }
    }),
    deleteTodo: (id, todo) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const todoDelete = yield todo_schema_1.Todo.findByIdAndDelete(id, todo);
            return todoDelete;
        }
        catch (error) {
            console.log(error);
        }
    }),
};
exports.default = TodoRepository;
