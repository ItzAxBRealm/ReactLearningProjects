import React from 'react'
import './ThemeBtn.css'
import useTodo from '../contexts/todoContext'


function ThemeBtn(className = "") {
    const { themeMode, darkTheme, lightTheme } = useTodo()

    const changeTheme = (e) => {
        const darkModeStatus = e.currentTarget.checked
        if (darkModeStatus){
            darkTheme()
        }
        else {
            lightTheme()
        }
    }

  return (
    <div className={`checkbox-container absolute right-10 top-10`}>
        <label className="switch">
        <input 
        onClick={changeTheme}
        checked={themeMode === "dark"}
        type="checkbox"
        />
        <span className="slider border border-orange-600 dark:border-blue-400"></span>
        </label>
    </div>
  )
}

export default ThemeBtn