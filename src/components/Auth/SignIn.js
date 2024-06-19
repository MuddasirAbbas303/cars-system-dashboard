import React, { useState } from "react";
import { signIn } from "../../services/authService";
import { useNavigate } from "react-router-dom";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const data = await signIn(email, password);
      localStorage.setItem("token", data.token);
      navigate('/cars')
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSignIn}
        className="w-1/3 bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl mb-6">Sign In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Sign In
        </button>
        <div className="w-full p-2">
            Don't have an account? <a className="text-blue-500" href="/signup"> SignUp</a>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
