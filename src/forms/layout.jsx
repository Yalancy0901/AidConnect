import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();

  const items = [
    { label: "Raise complaint", path: "/forms/raisecomplaint", icon: "/icons/raise.png" },
    { label: "Track complaint", icon: "/icons/track.png" },
    { label: "Your complaint", icon: "/icons/file.png" },
    { label: "Help", icon: "/icons/help.png" },
    { label: "Suggestion", icon: "/icons/idea.png" },
  ];

  return (
    <div className="min-h-screen min-w-screen bg-black text-white">
      <nav className="px-8 py-6">
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold text-green-400 cursor-pointer"
        >
          AidConnect
        </h1>
      </nav>

      <div className="flex">
        <div className="w-1/2 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-16">
            {items.map((item, index) => (
              <div
                key={index}
                onClick={() => item.path && navigate(item.path)}
                className="flex flex-col items-center gap-3 cursor-pointer"
              >
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <img src={item.icon} alt={item.label} className="w-12 h-12" />
                </div>
                <p className="text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-center px-12">
          <div className="bg-green-400 w-160 rounded-2xl p-8 shadow-xl text-black">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
