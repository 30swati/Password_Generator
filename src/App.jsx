
import { useCallback, useEffect, useRef, useState } from 'react'
import github from '/github.png'
import linkedin from '/linkedin.png'
import passwordImg from '/password.png'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [charAllowed, setCharAllowed] = useState(false)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)
  const frontRef = useRef(null)
  const mainRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (charAllowed) {
      str += '!@#$%^&*/~'
    }
    if (numberAllowed) {
      str += '1234567890'
    }

    //gives one random char from str 
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
    console.log(password)
  }, [charAllowed, numberAllowed, length, setPassword])

  //here the copy code is done
  const copyPassWord = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.cuurent?.setSelectionRange(0, 100)
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  
  const handleClick = () => {
    window.open("https://github.com/30swati", "_blank");
  };
  
  const linkedClick = () => {
    window.open("https://linkedin.com/in/swati-m-96093b248", "_blank");
  };

  const displayData =() =>{
        frontRef.current.style.display = 'none';
        mainRef.current.style.display = 'flex';
  }

  return (
    <>
     <div className='front' ref={frontRef}>
         <div className='box'>
           <h1 style={{ textAlign:"center"}}> <img src={passwordImg} alt="password icon"  />Password Generator</h1>
           <p style={{marginTop:"20px", textAlign:"center"}}>A password generator app creates strong, random passwords to enhance security, 
            helping users protect their online accounts from unauthorized access.</p>
            <button className='btn'
              onClick={displayData}
            >Launch</button>
         </div>
     </div>

    <div className='main' ref={mainRef}>
      <div className='topHead'>
        <h1>Password Generator</h1>
      </div>

      <div className='container'>
        <div className='field-btn'>
          <input
            className='inputfield'
            type='text'
            value={password}
            placeholder='password'
            readOnly
            ref={passwordRef} />

          <button className="btn"
            onClick={copyPassWord}>
            Copy Password
          </button>
        </div>


        <div className='btnArea'>


          <div className='inputCheck'>
            <input
              type='range'
              className='slider'
              min={6}
              max={100}
              value={length}
              onChange={(e) => {
                setLength(e.target.value)
              }}
            />
            <label>Length : {length} </label>
          </div>

          <div className='inputCheck'>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              id='numberInp'
              onClick={() => {
                setNumberAllowed((prev) => !prev)
              }} />
            <label
              htmlFor='numberInp'
            >Number</label>
          </div>
          <div className='inputCheck'>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              id='symbolInp'
              onClick={() => {
                setCharAllowed((prev) => !prev)
              }} />
            <label
              htmlFor='symbolInp'
            >Symbol</label>
          </div>

        </div>
      </div>

      <footer>
        <p>Made with &#10084; by Swati. &#169; 2025 All Rights Reserved.</p>
        <div className='links'>
        <img
      src={github} alt="Click me" style={{ cursor: "pointer" }} onClick={handleClick} />
          <img
      src={linkedin}  alt="Click me" style={{ cursor: "pointer" }} onClick={linkedClick} />
        </div>
      </footer>
       
    </div>
    </>
  )
}

export default App
