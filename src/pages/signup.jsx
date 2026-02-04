import React, { useState } from "react";

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen min-w-screen bg-black flex items-center justify-center">
      <div className="relative w-[900px] h-[520px] bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl flex">
        <div
          className={`absolute top-0 h-full w-1/2 transition-all duration-700 ease-in-out
            ${isLogin ? "left-1/2" : "left-0"}`}
        >
          <img
            src="/auth-image.jpg"
            alt="auth"
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className={`absolute top-0 h-full w-1/2 bg-zinc-900 flex items-center justify-center transition-all duration-700 ease-in-out
            ${isLogin ? "left-0" : "left-1/2"}`}
        >
          <div className="w-4/5 text-white">
            <h2 className="text-3xl font-bold text-green-400 mb-6">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>

            <form className="space-y-4">
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:border-green-400"
                />
              )}

              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:border-green-400"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:border-green-400"
              />

              {!isLogin && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-zinc-700 focus:outline-none focus:border-green-400"
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
              {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
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
  );
}

export default LoginSignup;
