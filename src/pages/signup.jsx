import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signup from "../images/signup.jpg";

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    const payload = isLogin
      ? {
          email: formData.email,
          password: formData.password
        }
      : {
          name: formData.name,
          email: formData.email,
          password: formData.password
        };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
      localStorage.setItem("token", data.token);
      navigate("/");
      window.location.reload();

      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-black flex flex-col">
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-black border-b border-zinc-800">
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold text-green-400 cursor-pointer"
        >
          AidConnect
        </h1>

        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <span
            onClick={() => navigate("/forms/raisecomplaint")}
            className="hover:text-green-400 cursor-pointer"
          >
            Raise Complaint
          </span>

          <span
            onClick={() => navigate("/forms")}
            className="hover:text-green-400 cursor-pointer"
          >
            Track Complaint
          </span>

          <span
            onClick={() => navigate("/crm")}
            className="hover:text-green-400 cursor-pointer"
          >
            Dashboard
          </span>

          <button
            onClick={() => navigate("/auth")}
            className="border border-green-400 px-4 py-2 rounded-full text-green-400 hover:bg-green-400 hover:text-black transition"
          >
            Donate
          </button>
        </div>
      </nav>

      <div className="flex flex-1 items-center justify-center">
        <div className="relative w-[900px] h-[520px] bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl flex">

          {/* Image Panel */}
          <div
            className={`absolute top-0 h-full w-1/2 transition-all duration-700 ease-in-out ${
              isLogin ? "left-1/2" : "left-0"
            }`}
          >
            <img
              src={signup}
              alt="auth"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form Panel */}
          <div
            className={`absolute top-0 h-full w-1/2 bg-zinc-900 flex items-center justify-center transition-all duration-700 ease-in-out ${
              isLogin ? "left-0" : "left-1/2"
            }`}
          >
            <div className="w-4/5 text-white">
              <h2 className="text-3xl font-bold text-green-400 mb-6">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">

                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:border-green-400"
                    required
                  />
                )}

                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:border-green-400"
                  required
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:border-green-400"
                  required
                />

                {!isLogin && (
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:border-green-400"
                    required
                  />
                )}

                <button
                  type="submit"
                  className="w-full bg-green-400 text-black py-3 rounded-lg font-semibold hover:bg-green-500 transition"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </button>
              </form>

              <p className="text-sm text-gray-400 mt-6">
                {isLogin
                  ? "Don’t have an account?"
                  : "Already have an account?"}{" "}
                <span
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-green-400 cursor-pointer hover:underline"
                >
                  {isLogin ? "Sign up" : "Login"}
                </span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LoginSignup;