import Brand from "./Brand";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const handleNavToReports = () => {
    navigate("/reports");
  };
  const handleToDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <aside className="w-64 bg-[#FAF8FF] h-screen px-10 py-6 flex flex-col gap-6 shadow-lg fixed h-screen">
      <Brand color="primary" />
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              isActive
                ? "bg-purple-50 text-primary"
                : "text-gray-500 hover:bg-gray-50"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              isActive
                ? "bg-purple-50 text-primary"
                : "text-gray-500 hover:bg-gray-50"
            }`
          }
        >
          Reports
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              isActive
                ? "bg-purple-50 text-primary"
                : "text-gray-500 hover:bg-gray-50"
            }`
          }
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
};
export default Sidebar;
