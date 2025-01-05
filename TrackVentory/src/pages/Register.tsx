import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const payload = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const { message } = await response.json();
        setError(message || "Failed to register. Try again.");
        return;
      }

      navigate("/");
    } catch (err) {
      console.error("Error during registration:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="body-login min-h-screen w-full bg-white text-white flex">
      <div className="left-side bg-[#12376A] min-h-screen w-[760px]">
        <div className="container flex items-center justify-center min-h-screen">
          <div className="body-container flex flex-col items-start text-[60px] font-bold">
            <h2>Welcome</h2>
            <h2 className="w-[600px] text-[30px] font-medium">
              Create an account to join us
            </h2>
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
              isRequired
              type="text"
              variant="faded"
              label="Username"
              placeholder="Enter your name"
              className="w-[350px]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              isRequired
              type="email"
              variant="faded"
              label="Email"
              placeholder="Enter your email"
              className="w-[350px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              isRequired
              type="password"
              variant="faded"
              label="Password"
              placeholder="Enter your password"
              className="w-[350px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              isRequired
              type="password"
              variant="faded"
              label="Re-enter Password"
              placeholder="Re-enter your password"
              className="w-[350px]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <h2 className="text-red-700 mt-[10px]">{error}</h2>}
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
