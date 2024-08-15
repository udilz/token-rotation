import { Request, Response } from "express";
import TodoServices from "../services/todo.services";


const TodoController = {
    handleGetAllTodos: async (_: Request,res: Response) => {
        try {
            const allTodo = await TodoServices.getAllTodos();
            return res.status(200).json({message: "berhasil ambil data todo", data: allTodo});
        } catch (error) {
            console.log(error);
        }
    },

    handleCreateTodo: async(req:Request, res: Response) => {
        try {
            const {userId, title, content} = req.body;
            const createTodo = await TodoServices.createTodo({userId,title,content});
            return res.status(201).json({message: "berhasil create data todo", data: createTodo});
        } catch (error) {
            console.log(error)
        }
    },

    handleUpdateTodo: async(req: Request, res: Response) => {
        try {
            const todoId = req.params.id;
            const {userId, title, content} = req.body;
            const newTodo = await TodoServices.updateTodo(todoId, {userId,title, content})
            return res.status(200).json({message: "berhasil update data todo", data: newTodo});
        } catch (error) {
            console.log(error);
        }
    },

    handleDeleteTodo: async(req: Request, res: Response) => {
        try {
            const todoId = req.params.id;
            const {userId,title, content} = req.body
            const deleteTodo = await  TodoServices.deleteTodo(todoId, {userId,title,content});
            return res.status(200).json({message: "berhasil delete todo", data: deleteTodo})
        } catch (error) {
            console.log(error);
        }
    }

}

export default TodoController;