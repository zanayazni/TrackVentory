<<<<<<< Updated upstream
function App() {
  return (
    <div className="bg-white min-h-screen">
      <div className="sec-utama min-h-screen flex justify-center items-center">
        <div className="sec-1 flex flex-col border-[1px] border-black items-center px-[120px] py-[50px] rounded-xl">
          <div className="judul flex flex-col items-center gap-3">
            <h2 className="font-bold text-[40px]">Welcome Back</h2>
            <h2 className="font-semibold text-[20px] opacity-20">Welcome Back, Please enter Your details</h2>
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
      </div>
    </div>
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Edit from "./pages/Edit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/edit" element={<Edit />}/>
      </Routes>
    </Router>
>>>>>>> Stashed changes
  );
}

export default App;
