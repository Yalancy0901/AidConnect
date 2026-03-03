import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FaPlusCircle,
  FaSearch,
  FaFileAlt,
  FaQuestionCircle,
  FaLightbulb,
} from "react-icons/fa";

function Layout() {
  const navigate = useNavigate();

  const items = [
    {
      label: "Raise Complaint",
      path: "/forms/raisecomplaint",
      icon: <FaPlusCircle size={28} />,
    },
    {
      label: "Track Complaint",
      path: "/forms/track",
      icon: <FaSearch size={28} />,
    },
    {
      label: "Your Complaint",
      path: "/forms/yourcomplaint",
      icon: <FaFileAlt size={28} />,
    },
    {
      label: "Help",
      path: "/forms/help",
      icon: <FaQuestionCircle size={28} />,
    },
    {
      label: "Suggestion",
      path: "/forms/suggestion",
      icon: <FaLightbulb size={28} />,
    },
  ];

  return (
    <div className="min-h-screen min-w-screen bg-black text-white">
      {/* Header */}
      <nav className="px-8 py-6 border-b border-zinc-800">
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold text-green-400 cursor-pointer"
        >
          AidConnect
        </h1>
      </nav>

      <div className="flex">
        {/* Left Side Icons */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-12">
            {items.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-3 cursor-pointer group"
              >
                <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center text-green-400 group-hover:bg-green-400 group-hover:text-black transition duration-300">
                  {item.icon}
                </div>
                <p className="text-sm text-gray-300 group-hover:text-green-400 transition">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Dynamic Form */}
        <div className="w-1/2 flex items-center justify-center px-12">
          <div className="w-full max-w-xl">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
