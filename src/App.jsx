import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [numallowed, setnumallowed] = useState(false);
  const [charallowed, setchar] = useState(false)
  const [password, setpassword] = useState("")

  //useRef hook 
  const passwordRef = useRef(null)

  const passgen = useCallback(() => {
    let pass = ""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"

    if (numallowed) str += "1234567890"
    if (charallowed) str += "!@#$%_-*&"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }
    setpassword(pass)

  },
    [length, numallowed, charallowed, setpassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {
    passgen()

  }, [length, numallowed, charallowed, passgen])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <h1 className='text-white text-center my-3' >Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
             onClick={copyPasswordToClipboard}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numallowed}
              id="numberInput"
              onChange={() => {
                setnumallowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charallowed}
              id="CharInput"
              onChange={() => {
                setchar((prev) => !prev);
              }}
            />
            <label htmlFor="CharInput">Character</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
