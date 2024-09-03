import TodoRepository from "../repositories/todo.repository";
import {ITodo} from "../types/todo.types";

const TodoServices = {
  getAllTodos: async () => {
    try {
      const allTodo = await TodoRepository.getAllTodos();
      return allTodo;
    } catch (error) {
      console.log(error);
    }
  },

  getSingleTodo: async (id: string) => {
    try {
      const getOne = await TodoRepository.getSingleTodo(id);
      return getOne;
    } catch (error) {
      console.log(error);
    }
  },

  createTodo: async (createTodo: ITodo) => {
    try {
      const {userId, title, content} = createTodo;
      if (!userId || !title || !content) {
        throw new Error("this field is required");
      }
      const newTodo = await TodoRepository.createTodo(createTodo);
      return newTodo;
    } catch (error) {
      console.log(error);
    }
  },

  updateTodo: async (id: string, todo: ITodo) => {
    try {
      const {title, content} = todo;
      if (!title || !content) {
        throw new Error("this field is required");
      }
      const newTodo = await TodoRepository.updateTodo(id, todo);
      return newTodo;
    } catch (error) {
      console.log(error);
    }
  },

  deleteTodo: async (id: string, todo: ITodo) => {
    try {
      const deleteTodo = await TodoRepository.deleteTodo(id, todo);
      return deleteTodo;
    } catch (error) {
      console.log(error);
    }
  },
};

export default TodoServices;
