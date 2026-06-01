import {
  FaWallet,
  FaArrowRight,
  FaLock,
  FaGoogle,
  FaApple,
  FaUser,
} from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import Brand from "../components/Brand";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const handleNavToBudgetForm = () => {
    navigate("/setup-budget");
  };
  return (
    <main className="flex h-full overflow-hidden w-full bg-white">
      {/* Left Feature Banner */}
      <section className="p-10 flex-1 flex flex-col justify-between max-w-1/2  bg-gradient-to-tr from-[#774293] via-[#915BAE] to-[#E7B4FF] text-white">
        <Brand />
        <article className="max-w-md">
          <h1 className="text-4xl font-bold mb-4">
            Begin your journey to financial peace.
          </h1>
          <p>
            Join thousands of mindful individuals who have transformed their
            relationship with money through clarity and composure.
          </p>
        </article>
        <div className="flex justify-start items-center gap-2">
          <span className="w-8 border-t border-gray-300"></span>
          <small>EST. 2024</small>
        </div>
      </section>

      {/* Right Form Section */}
      {/* REMOVED: justify-center | ADDED: w-full max-w-md my-auto */}
      <section className="w-full max-w-md py-12 px-6 flex flex-col  gap-6 my-auto mx-auto">
        <header>
          <h2 className="text-2xl font-bold text-heading mb-2">
            Create an account
          </h2>
          <p className="text-label">Step into a world of mindful budgeting.</p>
        </header>

        {/* Cleaned up Form Groups */}
        <form className="flex flex-col gap-4">
          {/* Full Name Group */}
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="relative mt-1">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="name"
                className="w-full bg-gray-100 pl-10 pr-4 py-2 focus:outline-none rounded-md"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email Group */}
          <div className="flex flex-col gap-1 relative">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative mt-1">
              <CiMail
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                id="email"
                className="w-full bg-gray-100 pl-10 pr-4 py-2 focus:outline-none rounded-md"
                placeholder="name@example.com"
              />
            </div>
          </div>

          {/* Password Group */}
          <div className="flex flex-col gap-1 relative">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative mt-1">
              <FaLock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="password"
                id="password"
                className="w-full bg-gray-100 pl-10 pr-4 py-2 focus:outline-none rounded-md"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" id="remember" className="rounded" />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Remember Me
            </label>
          </div>

          <button
            type="submit"
            className="bg-primary text-white p-2.5 rounded-3xl cursor-pointer hover:scale-[1.02] transition-transform mt-4 flex items-center justify-center font-medium"
            onClick={handleNavToBudgetForm}
          >
            Create Account <FaArrowRight className="inline-block ml-2" />
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full">
          <span className="flex-1 border-t border-gray-300"></span>
          <p className="text-label text-sm whitespace-nowrap">
            Or Continue with
          </p>
          <span className="flex-1 border-t border-gray-300"></span>
        </div>

        {/* Social Buttons */}
        <div className="flex items-center gap-4">
          <button className="border border-gray-300 text-gray-800 px-4 py-2 rounded-xl cursor-pointer hover:scale-[1.02] transition-transform flex items-center justify-center w-full bg-white">
            <FaGoogle className="mr-2" /> Google
          </button>
          <button className="border border-gray-300 text-gray-800 px-4 py-2 rounded-xl cursor-pointer hover:scale-[1.02] transition-transform flex items-center justify-center w-full bg-white">
            <FaApple className="mr-2" /> Apple
          </button>
        </div>

        <p className="text-label text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline font-medium">
            Log in
          </a>
        </p>
      </section>
    </main>
  );
};

export default SignUp;
