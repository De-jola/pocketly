import { useState, useEffect } from "react";
import { FaArrowRight, FaLock, FaGoogle, FaApple } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import Brand from "../components/Brand";
import { useNavigate } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  googleProvider,
  signInWithPopup,
} from "../firebase";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [email, setEmail] = useState(
    () => sessionStorage.getItem("pocketly_login_email") || "",
  );
  const [password, setPassword] = useState(
    () => sessionStorage.getItem("pocketly_login_password") || "",
  );

  useEffect(() => {
    sessionStorage.setItem("pocketly_login_email", email);
  }, [email]);
  useEffect(() => {
    sessionStorage.setItem("pocketly_login_password", password);
  }, [password]);

  const clearInputCache = () => {
    sessionStorage.removeItem("pocketly_login_email");
    sessionStorage.removeItem("pocketly_login_password");
  };

  const handleAuthAction = async (e) => {
    e.preventDefault();
    setError("");
    setAuthLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        clearInputCache();
        navigate("/setup-budget");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        clearInputCache();
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Authentication failure encountered. Check credentials.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setAuthLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      clearInputCache();
      navigate("/dashboard");
    } catch (err) {
      setError("Google authentication encountered an issue.");
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <main className="flex h-screen w-screen bg-white overflow-hidden">
      {/* Visual Banner Panel — hidden on mobile screens, visible from medium screens up */}
      <section className="p-10 flex-1 hidden md:flex flex-col justify-between max-w-[50%] bg-gradient-to-tr from-[#774293] via-[#915BAE] to-[#E7B4FF] text-white">
        <Brand />
        <article className="max-w-md">
          <h1 className="text-4xl font-bold mb-4 leading-snug">
            {isSignUp
              ? "Create your sanctuary for a peaceful financial life."
              : "Welcome back to your mindful financial journey."}
          </h1>
          <p className="text-purple-100 text-sm leading-relaxed">
            Rediscover the peace that comes with clarity. Pocketly helps you
            navigate your finances with composure and intention.
          </p>
        </article>
        <div className="flex items-center gap-10">
          <small className="text-xs text-purple-100 font-medium">
            <span className="text-lg font-bold block text-white">98%</span>{" "}
            Serenity Rate
          </small>
          <small className="text-xs text-purple-100 font-medium">
            <span className="text-lg font-bold block text-white">12k+</span>{" "}
            Budgets Loaded
          </small>
        </div>
      </section>

      {/* Interactive Form Panel — full-width on mobile, 50% max width on desktop viewports */}
      <section className="w-full md:max-w-[50%] p-6 sm:p-12 md:p-16 flex flex-col gap-6 justify-center mx-auto overflow-y-auto h-full">
        <header>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight mb-1">
            {isSignUp ? "Create Your Account" : "Login to Your Account"}
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm">
            Enter your credentials to access your financial sanctuary.
          </p>
        </header>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-100 p-3 rounded-xl text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleAuthAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 relative">
            <label
              htmlFor="email"
              className="text-xs font-bold text-gray-400 uppercase tracking-wide"
            >
              Email Address
            </label>
            <div className="relative flex items-center">
              <CiMail size={20} className="absolute left-3 text-gray-400" />
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 px-10 py-2.5 focus:outline-none focus:border-primary focus:bg-white rounded-xl text-sm text-gray-700"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 relative">
            <label
              htmlFor="password"
              className="text-xs font-bold text-gray-400 uppercase tracking-wide"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <FaLock size={14} className="absolute left-3.5 text-gray-400" />
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 px-10 py-2.5 focus:outline-none focus:border-primary focus:bg-white rounded-xl text-sm text-gray-700"
                placeholder="••••••••"
              />
            </div>
          </div>

          {!isSignUp && (
            <div className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                id="remember"
                className="accent-primary size-4 cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="text-xs font-medium text-gray-500 cursor-pointer select-none"
              >
                Remember Me
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={authLoading}
            className="bg-primary text-white p-3 rounded-xl cursor-pointer hover:scale-[1.01] active:scale-95 transition-all mt-2 flex items-center justify-center font-bold text-xs uppercase tracking-wider disabled:opacity-50 shadow-sm"
          >
            {authLoading
              ? "Verifying..."
              : isSignUp
                ? "Create Account"
                : "Login"}
            {!authLoading && <FaArrowRight className="size-3 ml-2" />}
          </button>
        </form>

        <div className="flex items-center gap-4 mt-1 w-full">
          <span className="flex-1 border-t border-gray-200"></span>
          <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap">
            Or Continue with
          </p>
          <span className="flex-1 border-t border-gray-200"></span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={authLoading}
            className="border border-gray-200 text-gray-700 px-2 py-2.5 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-center text-xs font-bold shadow-sm disabled:opacity-50"
          >
            <FaGoogle className="mr-2 text-red-500 shrink-0" /> Google
          </button>
          <button
            type="button"
            className="border border-gray-200 text-gray-700 px-2 py-2.5 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-center text-xs font-bold shadow-sm"
          >
            <FaApple className="mr-2 text-sm text-black shrink-0" /> Apple
          </button>
        </div>

        <p className="text-gray-400 text-xs text-center mt-2 font-medium">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            className="text-primary hover:underline font-bold bg-transparent border-none cursor-pointer"
          >
            {isSignUp ? "Sign In" : "Sign up"}
          </button>
        </p>
      </section>
    </main>
  );
};

export default Login;
