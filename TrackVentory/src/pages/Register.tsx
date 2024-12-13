import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = () => {
    // Validasi form harus terisi semua
    if (!username || !email || !password || !rePassword) {
      setErrorMessage("Form masih ada yang kosong.");
      return;
    }

    // Validasi panjang password
    if (password.length < 8) {
      setErrorMessage("Password harus minimal 8 karakter.");
      return;
    }

    // Validasi password dan re-enter password
    if (password !== rePassword) {
      setErrorMessage("Password tidak sama dengan Re-enter Password.");
      return;
    }

    // Simulasi validasi email terdaftar
    const existingEmail = "test@example.com";
    if (email === existingEmail) {
      setErrorMessage("Email sudah digunakan.");
      return;
    }

    // Reset error message jika tidak ada error
    setErrorMessage("");

    // Logika pendaftaran berhasil (bisa diganti dengan API call untuk registrasi)
    navigate("/");
  };

  return (
    <div className="body-login min-h-screen w-full bg-white text-white flex">
      <div className="left-side bg-[#12376A] min-h-screen w-[760px]">
        <div className="container flex items-center justify-center min-h-screen">
          <div className="body-container flex flex-col items-start text-[60px] font-bold">
            <h2>Welcome</h2>
            <h2 className="w-[600px] text-[30px] font-medium">Create an account to join us</h2>
          </div>
        </div>
      </div>
      <div className="right-side min-h-screen bg-white w-[800px] text-black">
        <div className="container-right flex min-h-screen justify-center items-center flex-col">
          <div className="title">
            <h2 className="font-bold text-[40px] -ml-[175px]">Sign Up</h2>
          </div>
          <div className="input flex flex-col items-center mt-[40px] gap-[20px]">
            <Input
              type="text"
              variant={"faded"}
              label="Username"
              placeholder="Enter your name"
              className="w-[350px]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="email"
              variant={"faded"}
              label="Email"
              placeholder="Enter your email"
              className="w-[350px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              variant={"faded"}
              label="Password"
              placeholder="Enter your password"
              className="w-[350px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              variant={"faded"}
              label="Re-enter Password"
              placeholder="Enter your Re-enter password"
              className="w-[350px]"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
          {errorMessage && <h2 className="text-red-700 mt-[10px]">{errorMessage}</h2>}
          <Button
            className="bg-[#12376A] text-white text-[20px] px-[30px] py-[25px] w-[350px] rounded-xl mt-[20px]"
            onClick={handleRegister}
          >
            Sign Up
          </Button>
          <h2 className="mt-[10px]">
            Already have an account?{" "}
            <span>
              <button
                className="text-[#12376A] font-semibold underline"
                onClick={() => navigate("/")}
              >
                Log In
              </button>
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Register;