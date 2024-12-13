import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage("Username atau password salah");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password harus lebih dari 8 karakter");
      return;
    }

    // Reset error message jika tidak ada error
    setErrorMessage("");

    // Simulasi validasi user (bisa diganti dengan API call untuk autentikasi)
    const validEmail = "user@example.com";
    const validPassword = "password123";

    if (email !== validEmail || password !== validPassword) {
      setErrorMessage("Username atau password salah");
      return;
    }

    // Jika login berhasil
    navigate("/landing");
  };

  return (
    <div className="body-login min-h-screen w-full bg-white text-white flex">
      <div className="left-side bg-[#12376A] min-h-screen w-[760px]">
        <div className="container flex items-center justify-center min-h-screen">
          <div className="body-container flex flex-col items-start text-[40px] font-bold">
            <h2>Welcome Back!</h2>
            <h2 className="w-[600px] text-[20px] font-medium">You can sign in to access with your existing account</h2>
          </div>
        </div>
      </div>
      <div className="right-side min-h-screen bg-white w-[800px] text-black">
        <div className="container-right flex min-h-screen justify-center items-center flex-col">
          <div className="title">
            <h2 className="font-bold text-[40px] -ml-[175px]">Sign In</h2>
          </div>
          <div className="input flex flex-col items-center mt-[40px] gap-[20px]">
            <Input
              type="email"
              variant="faded"
              label="Email"
              placeholder="Enter your email"
              className="w-[350px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              variant="faded"
              label="Password"
              placeholder="Enter your password"
              className="w-[350px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <h2 className="text-red-700 mt-[10px]">{errorMessage}</h2>}
          <Button
            className="bg-[#12376A] text-white text-[20px] px-[30px] py-[25px] w-[350px] rounded-xl mt-[20px]"
            onClick={handleLogin}
          >
            Log In
          </Button>
          <h2 className="mt-[10px]">
            Need an account?{" "}
            <span>
              <button
                className="text-[#12376A] font-semibold underline"
                onClick={() => navigate("/register")}
              >
                Create an account
              </button>
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
