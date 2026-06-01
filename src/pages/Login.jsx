import { FaArrowRight, FaLock, FaGoogle, FaApple } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import Brand from "../components/Brand";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const handleNavigateToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <main className="flex h-screen">
      <section className="p-10  flex-1 flex flex-col justify-between max-w-1/2 bg-gradient-to-tr from-[#774293] 0% via-[#915BAE] 50% to-[#E7B4FF] text-white">
        <Brand />
        <article className="max-w-md">
          <h1 className="text-4xl font-bold mb-4">
            Welcome back to your mindful financial journey.
          </h1>
          <p>
            Rediscover the peace that comes with clarity. Serene Ledger helps
            you navigate your finances with composure and intention.
          </p>
        </article>
        <div className="flex items-center gap-10">
          <small>
            98% <br /> User Serenity Rate
          </small>
          <small>
            12k+ <br /> Mindful Budgets
          </small>
        </div>
      </section>
      <section className="max-w-1/2 p-10 flex flex-col gap-6 justify-center mx-auto">
        <header>
          <h2 className="text-2xl font-bold text-heading mb-2">
            Login to Your Account
          </h2>
          <p className="text-label">
            Enter your credentials to access your financial sanctuary.
          </p>
        </header>
        <form className="relative flex flex-col">
          <label htmlFor="email">Email </label>
          <CiMail
            size={20}
            className="absolute left-3 top-11 -translate-y-1/2 text-gray-400"
          />
          <input
            type="email"
            id="email"
            className="bg-gray-100 px-10 py-2 focus:outline-none outline-none rounded-md "
            placeholder="name@example.com"
          />
          <label htmlFor="password">Password</label>
          <FaLock
            size={20}
            className="absolute left-3 top-27 -translate-y-1/2 text-gray-400"
          />
          <input
            type="password"
            id="password"
            className="bg-gray-100 px-10 py-2 focus:outline-none outline-none rounded-md"
            placeholder="••••••••"
          />
          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <button
            type="submit"
            className="bg-primary text-white p-2 rounded-3xl cursor-pointer hover:scale-105 transition-transform mt-6 flex items-center justify-center"
            onClick={handleNavigateToDashboard}
          >
            Login <FaArrowRight className="inline-block ml-2" />
          </button>
        </form>
        <div className="flex items-center gap-4 mt-6 w-full">
          <span className="flex-1 border-t border-gray-300"></span>

          <p className="text-label text-sm whitespace-nowrap">
            Or Continue with
          </p>

          <span className="flex-1 border-t border-gray-300"></span>
        </div>
        <div className="flex items-center gap-4 mt-6">
          <button className="border border-gray-300 text-gray-800 px-4 py-2 rounded-xl cursor-pointer hover:scale-105 transition-transform flex items-center justify-center w-full">
            <FaGoogle className="mr-2" /> Google
          </button>
          <button className="border border-gray-300 text-gray-800 px-4 py-2 rounded-xl cursor-pointer hover:scale-105 transition-transform flex items-center justify-center w-full">
            <FaApple className="mr-2" /> Apple
          </button>
        </div>
        <p className="text-label text-sm text-center">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </a>
        </p>
      </section>
    </main>
  );
};
export default Login;
