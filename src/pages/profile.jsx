import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="min-h-screen min-w-screen bg-black text-white flex flex-col">

      {/* ================= TOP NAVBAR ================= */}
      <nav className="w-full flex items-center justify-between px-8 md:px-16 py-6 border-b border-zinc-800">
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

          {token && (
            <button
              onClick={handleLogout}
              className="border border-red-500 px-4 py-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* ================= PROFILE SECTION ================= */}
      <div className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md p-10 text-center border border-zinc-800">

          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              src="https://i.pravatar.cc/150"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-green-400 shadow-lg"
            />
          </div>

          {/* User Info */}
          <h2 className="mt-6 text-2xl font-bold text-green-400">
            Welcome Back 👋
          </h2>

          <p className="mt-2 text-gray-400">
            You are successfully logged in.
          </p>

          {/* Buttons */}
          <div className="mt-8 space-y-4">
            <button
              onClick={() => navigate("/forms/raisecomplaint")}
              className="w-full bg-green-400 text-black py-3 rounded-lg font-semibold hover:bg-green-500 transition"
            >
              Raise Complaint
            </button>

            <button
              onClick={() => navigate("/forms")}
              className="w-full border border-green-400 text-green-400 py-3 rounded-lg font-semibold hover:bg-green-400 hover:text-black transition"
            >
              Track Complaint
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Profile;