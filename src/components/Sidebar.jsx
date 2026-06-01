import Brand from "./Brand";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const handleNavToReports = () => {
    navigate("/reports");
  };
  return (
    <aside className="w-64 bg-[#FAF8FF] h-screen px-10 py-6 flex flex-col gap-6 shadow-lg fixed h-screen">
      <Brand color="primary" />
      <nav className="flex flex-col gap-4">
        <a href="#" className="text-label hover:text-gray-900">
          Dashboard
        </a>

        <a
          href="#"
          className="text-label hover:text-gray-900"
          onClick={handleNavToReports}
        >
          Reports
        </a>
        <a href="#" className="text-label hover:text-gray-900">
          Settings
        </a>
      </nav>
    </aside>
  );
};
export default Sidebar;
