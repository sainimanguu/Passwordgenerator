import { useState, useCallback, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useEffect } from 'react';


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  //ref hook
  const passwordref = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);

    }
    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword])

  const copypasswordtoclip = useCallback(() => {
    passwordref.current?.select();//effect ke liye
    passwordref.current?.setSelectionRange(0, 200)
    window.navigator.clipboard.writeText(password)
  }, [password])

  //effect hookk!
  useEffect(() => { passwordGenerator() }, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <>
      <div className="absolute inset-10 flex 
                    items-start justify-center
                    text-white z-30">
        <div className="bg-red-400 p-10 
                        rounded-lg shadow-lg">
          <h1 class="text-3xl font-bold mb-5 text-center">
            Password Generator
          </h1>
          <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input
              type="text"
              value={password}
              className='outline-none w-full py-1 px-3'
              placeholder='Password'
              readOnly
              ref={passwordref}
            />


            <button onClick={copypasswordtoclip} className='"transition-opacity duration-100 ease-in-out 
                       bg-green-600 hover:opacity-75 transform 
                      hover:-translate-x-1-y-1 hover:scale-90 active:bg-red-600
                 '>Copy</button>
          </div>

          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input
                type='range'
                min={8}
                max={20}
                value={length}
                className='cursor-pointer'
                onChange={(e) => { setLength(e.target.value) }}
              />
              <label>Length: {length}</label>
            </div>


            <div className='flex items-center'>
              <input
                type='checkbox'
                defaultChecked={numberAllowed}
                class="w-4 h-4 accent-black"
                id='numberInput'
                onChange={() => { setNumberAllowed((prev) => !prev) }}
              />
              <label for="numberInput"
                class="ms-2 text-white font-medium " htmlFor='numberInput'>
                Number</label>
            </div>

            <div className='flex items-center'>
              <input
                type='checkbox'
                defaultChecked={charAllowed}
                class="w-4 h-4 accent-black"
                id='charInput'
                onChange={() => { setCharAllowed((prev) => !prev) }}
              />
              <label for="charInput"
                class="ms-2 text-white font-medium " htmlFor='charrInput'>
                Character</label>
            </div>


          </div>
        </div>
      </div>

    </>
  )
}

export default App
