import React, { useState } from "react";
import { signUp } from "../../services/authService";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleSignUp = async (e) => {
    setDisabled(true);
    e.preventDefault();
    try {
      await signUp(email);
      alert("Sign up successful. Check your email for login details.");
      window.location.href = "/signin";
    } catch (error) {
      alert(error.response.data.error);
      setDisabled(false);

    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSignUp}
        className="w-1/3 bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl mb-6">Sign Up</h2>
        <h1 className="mb-3">We will send you random password to your email</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-blue-300 disabled:cursor-progress"
          disabled={disabled}
        >
          Sign Up
        </button>
        <div className="w-full p-2">
          Already have an account? <a className="text-blue-500" href="/signin"> SignIn</a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
