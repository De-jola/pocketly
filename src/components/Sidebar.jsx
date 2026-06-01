import { NavLink } from "react-router-dom";
import { FaChartPie, FaCog, FaWallet } from "react-icons/fa";
import { BiLayout } from "react-icons/bi";

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-xl text-[10px] md:text-sm font-bold transition-all flex-1 md:flex-none ${
      isActive ? "bg-purple-50 text-primary" : "text-gray-500 hover:bg-gray-50"
    }`;

  return (
    /* Responsive Wrapper: Fixed bottom on small screens, fixed left sidebar on desktop */
    <aside className="w-full h-16 md:w-64 md:h-screen bg-white border-t md:border-t-0 md:border-r border-gray-100 flex md:flex-col p-2 md:p-6 shrink-0 fixed bottom-0 left-0 md:static z-50 shadow-lg md:shadow-none">
      <div className="font-black text-xl mb-8 tracking-wide text-primary hidden md:block lg:flex lg:items-center lg:gap-2">
        <FaWallet className="lg:text-heading" />
        Pocketly
      </div>

      <nav className="flex md:flex-col gap-1 md:gap-2 w-full justify-around md:justify-start">
        {/* 1. Dashboard */}
        <NavLink to="/dashboard" className={linkClasses}>
          <BiLayout className="size-4" />
          <span>Dashboard</span>
        </NavLink>

        {/* 2. Reports */}
        <NavLink to="/reports" className={linkClasses}>
          <FaChartPie className="size-4" />
          <span>Reports</span>
        </NavLink>

        {/* 3. Settings */}
        <NavLink to="/settings" className={linkClasses}>
          <FaCog className="size-4" />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
