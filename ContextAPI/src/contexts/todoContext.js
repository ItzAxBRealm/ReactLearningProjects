import { createContext, useContext } from "react";

export const todoContext = createContext({
    todos: [
        {
            todo: "Hello",
            id: 1,
            completed: false
        }
    ],

    addTodo : (todo) => {},
    updateTodo : (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {},

    themeMode: "light",
    darkTheme: () => {},
    lightTheme: () => {}
});

export default function useTodo(){
    return useContext(todoContext);
}

export const TodoProvider = todoContext.Provider;