import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeTodo, toggleComplete, updateTodo } from '../features/todoSlice';
import { editIcon, saveIcon, deleteIcon } from './icons.js';

const Todos = () => {
    const [editInput, setEditInput] = useState("");
    const [editTodo, setEditTodo] = useState(null);


    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch();
    
    const toggleCompleted = (e) => {
        dispatch(toggleComplete(e))
    }

    const update = (e) => {
        e.preventDefault();
        dispatch(updateTodo({id: editTodo, text: editInput }));
        setEditInput("");
        setEditTodo(null);
    }

  return (
    <>
    <ul className="list-none">
        {todos.map((todo) => (
          <li
            className={`mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded`}
            key={todo.id}
          >
            <div className='flex items-center justify-between gap-5'>
                <input 
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompleted(todo.id)}
                />

                {editTodo === todo.id ? (
                // Show input field when editing
                <input
                    type='text'
                    className='text-white w-[90%] bg-transparent outline-none border-none'
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                />
                ) : (
                // Show todo text when not editing
                <div className={`${todo.completed ? "line-through text-red-500" : "text-white" }`}>{todo.text}</div>
                )}
            </div>
            
            <div className='flex items-center flex-row gap-4'>
                {editTodo === todo.id ? (
                // Show "Save" button when editing
                <button className='text-white rounded-full border-2 p-2 border-[#37B5B6] hover:bg-[#222831] outline-none' onClick={update}>
                <img 
                className='hover:shadow-inner w-6'
                src={saveIcon} alt="" />
                </button>
                ) : (
                // Show "Edit" button when not editing
                <button
                className={`text-white rounded-full border-2 p-2 border-[#FDE767] ${todo.completed ? "hidden" : "inline-block"} hover:bg-[#222831] outline-none`}
                onClick={() => {
                    setEditInput(todo.text);
                    setEditTodo(todo.id);
                }}
                disabled={todo.completed ? true : false}
                >
                <img 
                className='hover:shadow-inner w-6'
                src={editIcon} alt="" />
                </button>
                )}
                <button
                className='rounded-full border-2 p-2 border-[#E84545] hover:bg-[#222831] '
                onClick={() => dispatch(removeTodo(todo.id))}>
                    <img src={deleteIcon} alt="" className='hover:shadow-inner w-6' />
                </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Todos
