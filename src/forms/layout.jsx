import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen flex bg-[#1f556b]">
      <div className="w-1/4 flex flex-col items-center justify-center gap-10 text-white">
        <NavItem to="/complaints/raise" label="Raise Complaint" />
        <NavItem to="/complaints/track" label="Track Complaint" />
        <NavItem to="/complaints/your" label="Your Complaint" />
        <NavItem to="/complaints/help" label="Help" />
        <NavItem to="/complaints/suggest" label="Suggestion" />
      </div>

      <div className="w-3/4 bg-white flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-sm transition ${
          isActive ? "font-semibold underline" : "opacity-80 hover:opacity-100"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export default Layout;
