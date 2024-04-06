import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todoSlice';
import { icon, iconHover } from './icons.js';

const AddTodo = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false)

    const addTodoHandler = (e) => {
        e.preventDefault();
        if(input.trim() !== ''){
          dispatch(addTodo(input))
          setInput('')
        }
        else{
          return
        }
    }

  return (
    <form onSubmit={addTodoHandler} className='space-x-3 mt-12 flex justify-center'>
        <input 
        type="text"
        className='bg-[#EEEEEE] rounded border-2 border-[#00ADB5] focus:border-[#222831] w-80 text-base outline-none text-black py-1 px-3 leading-8 transition-all duration-200 ease-in-out'
        placeholder='Enter a Todo...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        <button 
        type='submit'
        className='border-0 focus:outline-none rounded hover:rotate-45 transition-all duration-300 outline-none'>
            <img 
            src={isHovered ? iconHover : icon}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)} 
            className='w-8 transition duration-200 ease-in-out' />
        </button>
  </form>
  )
}

export default AddTodo