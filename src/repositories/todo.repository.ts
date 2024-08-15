import { Todo } from "../models/todo.models"
import { ITodo } from "../types/todo.types";


const TodoRepository = {
    getAllTodos: async () => {
        try {
            const allTodo = await Todo.find();
            return allTodo;
        } catch (error) {
            console.log(error);
        }
    },

    createTodo: async (todo: ITodo) => {
        try {
            const newTodo = new Todo(todo);
            await newTodo.save();
        } catch (error) {
            console.log(error);
        }
    },

    updateTodo: async (id: string,todo: ITodo) => {
        try {
            const todoUpdate = await Todo.findByIdAndUpdate(id, todo);
            return todoUpdate;
        } catch (error) {
            console.log(error);
        }
    },

    deleteTodo: async(id: string, todo: ITodo) => {
        try {
            const todoDelete = await Todo.findByIdAndDelete(id, todo);
            return todoDelete;
        } catch (error) {
            console.log(error)
            
        }
    }

    
}

export default TodoRepository;