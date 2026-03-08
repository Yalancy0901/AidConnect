import { NavLink, Outlet, useNavigate  } from "react-router-dom";


export default function Layout() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen min-w-screen bg-black text-white flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        <div className="px-6 py-5 text-xl font-bold text-green-400">
          AidConnect Analytical Dashboard
        </div>

        <nav className="flex-1 px-4 space-y-2 text-sm">
          <NavLink to="/crm" end className={navStyle}>
            Overview
          </NavLink>

          <NavLink to="/crm/tracker" className={navStyle}>
            Complaint Tracker
          </NavLink>

          <NavLink to="/crm/complaints" className={navStyle}>
            All Complaints
          </NavLink>

          <NavLink to="/crm/analytics" className={navStyle}>
            Demand & Supply
          </NavLink>

          <NavLink to="/crm/companies" className={navStyle}>
            Companies
          </NavLink>

          <button
  onClick={() => {
    // future: clear auth / token here
    navigate("/");
  }}
  className="w-full text-left px-4 py-3  text-black transition"
>
  Logout
</button>

        </nav>

        <div className="px-6 py-4 text-xs text-gray-500 border-t border-zinc-800">
          © AidConnect
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

const navStyle = ({ isActive }) =>
  `block px-4 py-3 rounded-lg transition ${
    isActive
      ? "bg-green-400 text-black font-semibold"
      : "text-gray-300 hover:bg-zinc-800"
  }`;
