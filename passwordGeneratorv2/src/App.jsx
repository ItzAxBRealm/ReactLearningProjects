import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 3);
    window.navigator.clipboard.writeText(password)
  }, [password])

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numbersAllowed) str += "0123456789"
    if(characters) str += "!@#$%^&*()_+-={}[]<>?/"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, characters, numbersAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, characters, numbersAllowed, setPassword])

  return (
    <>
      <div className='main-container'>
        <h2 className='heading'>Password Generator</h2>
        
        <div className='passContainer'>
          <label>Password: </label>
          <input 
          type="text"
          value={password}
          className='passwordInput'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button className='copyBtn' onClick={copyToClipboard}>
            Copy
          </button>
        </div>
        
        <div className='features'>
          <div className='lengthBox'>
            <label htmlFor="">Length: {length} </label>
            <input 
            type="range"
            min={6}
            max={30}
            className='lengthInput'
            value={length}
            onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <div className='checkBox'>
            <label htmlFor="">Numbers: </label>
            <div className="checkbox-wrapper-34">
              <input 
              className='tgl tgl-ios' 
              id='toggle-34' 
              type='checkbox'
              defaultChecked={numbersAllowed}
              onChange={() => setNumbersAllowed((prev) => !prev)}
              />
              <label className='tgl-btn' htmlFor='toggle-34'></label>
            </div>
          </div>

          <div className='checkBox'>
            <label htmlFor="">Characters: </label>
            <div className="checkbox-wrapper-34">
              <input 
              className='tgl tgl-ios' 
              id='toggle-35' 
              type='checkbox'
              defaultChecked={characters}
              onChange={() => setCharacters((prev) => !prev)}
              />
              <label className='tgl-btn' htmlFor='toggle-35'></label>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default App


