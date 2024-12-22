import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // Import axios untuk melakukan request ke backend

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // Gunakan 'username' alih-alih 'email'
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    // Validasi form harus terisi semua
    if (!username || !password) {
      setErrorMessage("Username atau password salah");
      return;
    }

    // Reset error message jika tidak ada error
    setErrorMessage("");

    try {
      // Mengirim permintaan POST ke backend untuk validasi login
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username: username,
          password: password,
        }
      );

      if (response.data.success) {
        // Menyimpan token ke localStorage
        localStorage.setItem("authToken", response.data.token);
        // Arahkan pengguna ke halaman landing setelah login
        navigate("/landing");
      } else {
        // Jika login gagal, tampilkan pesan error
        setErrorMessage(
          response.data.message || "Username atau password salah"
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Terjadi kesalahan saat login");
    }
  };

  return (
    <div className="body-login min-h-screen w-full bg-white text-white flex">
      <div className="left-side bg-[#12376A] min-h-screen w-[760px]">
        <div className="container flex items-center justify-center min-h-screen">
          <div className="body-container flex flex-col items-start text-[40px] font-bold">
            <h2>Welcome Back!</h2>
            <h2 className="w-[600px] text-[20px] font-medium">
              You can sign in to access with your existing account
            </h2>
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
              type="text"
              variant="faded"
              label="Username"
              placeholder="Enter your username"
              className="w-[350px]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          {errorMessage && (
            <h2 className="text-red-700 mt-[10px]">{errorMessage}</h2>
          )}
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
