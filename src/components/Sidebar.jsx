import { FaWallet } from "react-icons/fa";
import { GrDashboard, GrBarChart, GrSettingsOption } from "react-icons/gr";
const Sidebar = () => {
  return (
    <main className="min-h-screen px-4 flex flex-col items-start gap-4">
      <nav className="flex items-center gap-2 px-2">
        <FaWallet className="text-black" />
        <p className="font-bold">Pocketly</p>
      </nav>
      <ul className="flex flex-col gap-4 mt-6 w-full">
        <li className="flex items-center gap-2 text-[#7c5cbf] font-semibold hover:bg-background-secondary transition-colors p-2 rounded-lg cursor-pointer">
          <GrDashboard className="text-black" />
          Dashboard
        </li>
        <li className="flex items-center gap-2 text-[#7c5cbf] font-semibold hover:bg-background-secondary transition-colors p-2 rounded-lg cursor-pointer">
          <GrBarChart className="text-black" />
          Reports
        </li>
        <li className="flex items-center gap-2 text-[#7c5cbf] font-semibold hover:bg-background-secondary transition-colors p-2 rounded-lg cursor-pointer ">
          <GrSettingsOption className="text-black" />
          Settings
        </li>
      </ul>
    </main>
  );
};
export default Sidebar;
