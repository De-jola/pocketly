import { useNavigate } from "react-router-dom";
import { useBudget } from "../context/BudgetContext";
import { FaWallet, FaShare, FaLock } from "react-icons/fa";
import { BiPieChart, BiLogoGoogle, BiTrendingUp } from "react-icons/bi";
import { CgMail } from "react-icons/cg";

import Button from "../components/Button.jsx";
const Login = () => {
  const navigate = useNavigate();
  const { setUser, hasCompletedOnboarding } = useBudget();
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setUser({ uid: "email-user-123", email: "user@gmail.com" });

    if (hasCompletedOnboarding) {
      navigate("/dashboard");
    } else {
      navigate("/onboarding");
    }
  };
  const handleGoogleSignIn = () => {
    // 1. Mock the user response object returned from a Google OAuth popup window interaction
    const mockGoogleProfile = {
      uid: "google-uid-abc-123",
      email: "user@gmail.com",
      displayName: "Jane Doe",
    };
    setUser(mockGoogleProfile);
    if (hasCompletedOnboarding) {
      navigate("/dashboard");
    } else {
      // If it's a completely clean slate profile, throw them to the percentage allocations configuration grid
      navigate("/onboarding");
    }
  };

  return (
    <main className="flex">
      <section className="flex flex-col gap-19 bg-pocketly-gradient p-14 w-1/2 text-white">
        <nav className="flex items-center gap-2">
          <FaWallet className="text-black" />
          <p className="font-bold">Pocketly</p>
        </nav>
        <article className="w-1/2">
          <h1 className="text-4xl font-bold mb-4">Your Money, Your Rules</h1>
          <p className="text-sm mb-8 opacity-80">
            Track spending, plan budgets, and build better financial habits all
            in one calm, clear space.
          </p>
          <ul className="flex flex-col gap-4 opacity-80">
            <li className="flex items-center gap-2 text-sm">
              <BiPieChart className="text-black" /> Smart Budget Splitting
            </li>
            <li className="flex items-center gap-2 text-sm">
              <BiTrendingUp className="text-black" /> Monthly reports & insights
            </li>
            <li className="flex items-center gap-2 text-sm">
              <FaShare className="text-black" /> Share your budget plan
            </li>
          </ul>
        </article>
        <footer className="text-sm opacity-80">
          Trusted by 10,000+ users to manage their monthly budgets
        </footer>
      </section>
      <section className="flex flex-col gap-2 justify-center w-1/2 px-32 bg-background-secondary">
        <h2 className="text-3xl font-bold">Welcome Back</h2>
        <h3 className="mb-3 text-sm">Log in to your Pocketly account</h3>
        <Button
          buttonText="Google"
          buttonLogo={<BiLogoGoogle />}
          onClick={handleGoogleSignIn}
        />
        <div className="flex gap-2 items-center">
          <p className="border-t-2 w-1/3 border-[#e4ddf7]"></p>
          <p className="text-xs w-1/2 text-center">Or continue with email</p>
          <p className="border-t-2 w-1/3 border-[#e4ddf7]"></p>
        </div>
        <form onSubmit={handleLoginSubmit}>
          <label
            htmlFor="email"
            className="flex items-center gap-2 relative text-xs"
          >
            <CgMail className="absolute bottom-[-24px] left-3 text-sm" />
            Email Address
          </label>

          <input
            type="email"
            id="email"
            name="email"
            required
            className="outline-none w-full bg-[#f0ebff] py-1 rounded-lg px-8 mb-3 focus:border-purple-500"
          />
          <label
            htmlFor="password"
            className="flex items-center gap-2 relative text-xs"
          >
            <FaLock className="absolute bottom-[-24px] left-3 text-xs" />
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="outline-none w-full bg-[#f0ebff] py-1 rounded-lg px-8 mb-3 focus:border-purple-500"
          />

          <a
            href="/forgot-password"
            className="flex justify-end text-xs text-text-default mb-3 font-bold"
          >
            Forgot Password?
          </a>

          <Button buttonText="Sign In" type="submit" />
        </form>
        <footer className="text-center text-sm text-text-secondary">
          Don't have an account?{" "}
          <a href="/signup" className="text-text-default font-bold">
            Create one free
          </a>
        </footer>
      </section>
    </main>
  );
};

export default Login;
