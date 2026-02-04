import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen min-w-screen overflow-x-hidden bg-black text-white flex">
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        <div className="px-6 py-5 text-xl font-bold text-green-400">
          AidConnect CRM
        </div>

        <nav className="flex-1 px-4 space-y-2 text-sm">
          <NavLink
            to="/crm"
            end
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-green-400 text-black font-semibold"
                  : "text-gray-300 hover:bg-zinc-800"
              }`
            }
          >
            Overview
          </NavLink>

          <NavLink
            to="/crm/tracker"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-green-400 text-black font-semibold"
                  : "text-gray-300 hover:bg-zinc-800"
              }`
            }
          >
            Complaint Tracker
          </NavLink>

          <NavLink
            to="/crm/complaints"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-green-400 text-black font-semibold"
                  : "text-gray-300 hover:bg-zinc-800"
              }`
            }
          >
            All Complaints
          </NavLink>

          <NavLink
            to="/crm/analytics"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-green-400 text-black font-semibold"
                  : "text-gray-300 hover:bg-zinc-800"
              }`
            }
          >
            Demand & Supply
          </NavLink>
        </nav>

        <div className="px-6 py-4 text-xs text-gray-500 border-t border-zinc-800">
          © AidConnect
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
