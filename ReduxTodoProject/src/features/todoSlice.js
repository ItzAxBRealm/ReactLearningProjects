import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [
        {
            id: 1,
            text: "Hello World!",
            completed: false
        }
    ]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(), 
                text: action.payload,
                completed: false
            }
            state.todos.push(todo)
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            const todo = state.todos.find((todo) => todo.id === id);
            if (todo) {
                todo.text = text;
            }
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        toggleComplete: (state, action) => {
            state.todos = state.todos.map((todo) => todo.id === action.payload ? {...todo, completed: !todo.completed} : todo)
        },
    }
})

export const {addTodo, updateTodo, removeTodo, toggleComplete} = todoSlice.actions

export default todoSlice.reducer