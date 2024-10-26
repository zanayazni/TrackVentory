import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
function App() {
  const [count, setCount] = useState(0)

  return (
<<<<<<< Updated upstream
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
=======
    <div className="bg-white min-h-screen">
      <div className="sec-utama min-h-screen flex justify-center items-center">
        <div className="sec-1 flex flex-col border-[1px] border-black items-center px-[120px] py-[50px] rounded-xl">
          <div className="judul flex flex-col items-center gap-3">
            <h2 className="font-bold text-[40px]">Welcome Back</h2>
            <h2 className="font-semibold text-[20px] opacity-20">Welcome Back, Please enter your details</h2>
          </div>

          <div className="email mt-[50px] flex flex-col gap-7">
            <input type="email" placeholder="Email" className="border-0 border-b-2 w-[350px] px-2 py-2" />
            <input type="password" placeholder="Password" className="border-0 border-b-2 w-[350px] px-2 py-2" />
          </div>

          <div className="button flex flex-col items-center">
            <button className="bg-black text-white w-[350px] py-[10px] rounded-xl mt-[30px]">Login</button>
          </div>

          <div className="need flex flex-row items-center gap-2 mt-[20px]">
            <h2 className="text-black opacity-50">Need an account?</h2>
            <button>Create an account</button>
          </div>
        </div>
>>>>>>> Stashed changes
      </div>
      <h1>HAPIS ganteng</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
