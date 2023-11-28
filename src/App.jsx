import { useState, useCallback, useEffect,useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy} from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [chars, setChars] = useState(false)
  const [password, setPassword] = useState("")
  const [isCopied, setIsCopied] = useState(false);


  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 
    if (numberAllowed) str += "0123456789"
    if (chars) str += "~`!@#$%^&*()_-+={[}]|:;<,>.?/"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }

    setPassword(pass)

  }, [length, numberAllowed, chars, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0, 3)
    window.navigator.clipboard.writeText(password)
    setIsCopied(true);
  
    setTimeout(() => {
      setIsCopied(false);
    }, 1000); // Reset isCopied after 2 seconds
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, chars, passwordGenerator])

  return (
    <>
      <div id='main-container' className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-rose-400 bg-indigo-950 border-2 border-rose-400'>
        <h1 className=' text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
          id='password-Input'
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-gray-300 px-4 shadow-inner shrink-0'><FontAwesomeIcon icon={faCopy} /></button>
          {isCopied && <div className="text-green-500 ml-2">Copied!</div>}
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min={8}
            max={50}
            id='slider'
            value={length}
            className='cursor-point'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label className='mr-4'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numberAllowed}
            id='numberInput'
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }} />
            <label className='mr-4'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={chars}
            id='charsInput'
            onChange={() => {
              setChars((prev) => !prev);
            }} />
            <label htmlFor='characterInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
