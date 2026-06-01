import { FaWallet } from "react-icons/fa";
const Navbar = () => {
  return (
    <nav className="bg-[#FAF8FF] flex justify-between items-center">
      <header className="flex items-center gap-2 px-10 py-6 cursor-pointer">
        <FaWallet size={30} className="text-headline" />
        <h3 className="text-xl font-bold text-primary">Pocketly</h3>
      </header>
      <ul className="flex items-center gap-8 px-10 py-4 text-label">
        <li className="hover:text-primary transition-colors duration-300 hover:font-medium hover:underline hover:underline-offset-4">
          <a href="/">Home</a>
        </li>
        <li className="hover:text-primary transition-colors duration-300 hover:font-medium hover:underline hover:underline-offset-4">
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
