import { FaWallet } from "react-icons/fa";
import { GrDashboard, GrBarChart, GrSettingsOption } from "react-icons/gr";
const Sidebar = () => {
  return (
    <main>
      <nav className="flex items-center gap-2">
        <FaWallet className="text-black" />
        <p className="font-bold">Pocketly</p>
      </nav>
      <ul>
        <li>
          <GrDashboard className="text-black" />
          Dashboard
        </li>
        <li>
          <GrBarChart className="text-black" />
          Reports
        </li>
        <li>
          <GrSettingsOption className="text-black" />
          Settings
        </li>
      </ul>
    </main>
  );
};
export default Sidebar;
