import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts/todoContext';
import ThemeBtn from './components/ThemeBtn';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItems';

function App() {
  const [todos, setTodos] = useState([]);
  const [themeMode, setThemeMode] = useState("light");

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, {...todo, id: Date.now()}])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }

  const darkTheme = () => {
    setThemeMode("dark")
  }

  const lightTheme = () => {
    setThemeMode("light")
  }

  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])

  useEffect(() => {
   const todos = JSON.parse(localStorage.getItem("todos"))

   if (todos && todos.length > 0){
    setTodos(todos)
   }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete, themeMode, darkTheme, lightTheme }}>
      <div className="bg-[#F9F7F7] dark:bg-[#393E46] min-h-screen py-8 relative">
        <ThemeBtn />
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 bg-gray-200 dark:bg-[#222831] text-black dark:text-white">
              <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
              <div className="mb-4">
                  <TodoForm />
              </div>
              <div className="flex flex-wrap gap-y-3">
                  {todos.map((todo) => (
                    <div className='w-full' key={todo.id}>
                      <TodoItem todo={todo} />
                    </div>
                  ))}
              </div>
          </div>
      </div>
    </TodoProvider>
  )
}

export default App
