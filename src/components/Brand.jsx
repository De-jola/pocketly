import { FaWallet } from "react-icons/fa";
const Brand = ({ color }) => {
  return (
    <header className="flex items-center gap-2  cursor-pointer">
      <FaWallet size={30} className={`text-${color || "white"}`} />
      <p className="text-xl font-bold ">Pocketly</p>
    </header>
  );
};
export default Brand;
