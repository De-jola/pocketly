import Brand from "../components/Brand";
import ProgressBar from "../components/ProgressBar";
import CategoryCard from "../components/CategoryCard";
import { FaNairaSign } from "react-icons/fa6";
import { useBudget } from "../context/BudgetContext";
import { useNavigate } from "react-router-dom";
import {
  FaUtensils,
  FaCar,
  FaEllipsisH,
  FaQuestionCircle,
} from "react-icons/fa";
import { BiWifi } from "react-icons/bi";

const BudgetForm = () => {
  const {
    income,
    setIncome,
    savings,
    setSavings,
    spending,
    setSpending,
    remainder,
    spendingAmount,
    categoryAmounts,
    updateCategoryAmount,
  } = useBudget();

  const CATEGORY_ICONS = {
    food: FaUtensils,
    transport: FaCar,
    subscription: BiWifi,
    miscellaneous: FaEllipsisH,
    default: FaQuestionCircle,
  };

  const navigate = useNavigate();
  const handleNavToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <main className="px-4 sm:px-10 py-6 bg-[#FAF8FF] scroll-smooth min-h-screen">
      {/* Navbar Row */}
      <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-100 pb-4 sm:pb-0 sm:border-none">
        <Brand color="primary" />
        <ProgressBar text="Setting up your budget..." />
      </nav>

      {/* Hero Header */}
      <header className="text-center max-w-2xl mx-auto my-8 sm:my-12 px-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-heading mb-2">
          Define Your Monthly Plan
        </h1>
        <p className="text-sm sm:text-base text-label">
          Let's build a mindful foundation for your finances.
        </p>
      </header>

      {/* --- STEP 1: MACRO TARGET SPLIT --- */}
      <section
        id="budget-form"
        className="w-full max-w-3xl mx-auto bg-white p-5 sm:p-8 rounded-2xl border border-purple-50 shadow-sm mb-6"
      >
        <h2 className="font-bold text-heading text-lg sm:text-xl flex gap-3 items-center mb-6">
          <span className="bg-primary text-white text-sm px-3.5 py-1.5 rounded-full shrink-0">
            1
          </span>
          <span>Step 1: Income & High-Level Split</span>
        </h2>

        <div className="flex flex-col md:flex-row items-start justify-between gap-6 sm:gap-8">
          {/* Income Form Control */}
          <div className="flex flex-col gap-2 w-full md:w-1/2">
            <label
              htmlFor="income"
              className="text-sm font-semibold text-gray-700"
            >
              Monthly Income
            </label>
            {/* Context Safe Absolute Frame container */}
            <div className="relative flex items-center w-full">
              <FaNairaSign className="absolute left-3 text-gray-400 size-3.5" />
              <input
                type="number"
                id="income"
                placeholder="5000"
                value={income || ""}
                className="w-full pl-8 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 outline-none focus:ring-2 focus:ring-primary focus:bg-white rounded-xl text-sm transition-all"
                onChange={(e) => setIncome(Number(e.target.value))}
              />
            </div>
            <small className="text-xs text-gray-400">
              This is the net amount you receive each month.
            </small>
          </div>

          {/* Goals Sliders Stack */}
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="savings"
                className="text-xs font-bold text-gray-500 uppercase tracking-wide"
              >
                Savings Goal ({savings}%)
              </label>
              <input
                type="range"
                id="savings"
                min="0"
                max="100"
                value={savings}
                onChange={(e) =>
                  setSavings(Math.min(Number(e.target.value), 100 - spending))
                }
                className="w-full accent-primary cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="spending"
                className="text-xs font-bold text-gray-500 uppercase tracking-wide"
              >
                Spending Goal ({spending}%)
              </label>
              <input
                type="range"
                id="spending"
                min="0"
                max="100"
                value={spending}
                onChange={(e) =>
                  setSpending(Math.min(Number(e.target.value), 100 - savings))
                }
                className="w-full accent-primary cursor-pointer"
              />
            </div>

            <output className="block text-center p-3 bg-purple-50 rounded-xl text-purple-900 font-bold text-xs sm:text-sm">
              Remaining Balance: {remainder}%
            </output>

            <a
              href="#category-allocation"
              className="bg-primary text-white p-3 rounded-xl cursor-pointer hover:scale-[1.01] active:scale-95 transition-all mt-2 flex items-center justify-center w-full font-bold text-xs uppercase tracking-wider text-center shadow-sm"
            >
              Continue to Step 2
            </a>
          </div>
        </div>
      </section>

      {/* --- STEP 2: CATEGORY ENVELOPE ALLOCATION --- */}
      <section
        id="category-allocation"
        className="w-full max-w-3xl mx-auto bg-white p-5 sm:p-8 rounded-2xl border border-purple-50 shadow-sm mt-8 scroll-mt-6"
      >
        <h2 className="font-bold text-heading text-lg sm:text-xl flex gap-3 items-center mb-6">
          <span className="bg-primary text-white text-sm px-3.5 py-1.5 rounded-full shrink-0">
            2
          </span>
          <span>Step 2: Category Allocation</span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center sm:items-start bg-purple-50/50 border border-purple-100 justify-between p-4 rounded-xl gap-2 text-center sm:text-left">
          <p className="text-sm text-label">
            Allocating your monthly spending pool limits of{" "}
          </p>
          <p className="font-black text-primary text-base tracking-wide">
            ₦{spendingAmount.toLocaleString()}
          </p>
        </div>

        {/* Categories Matrix: Stacks down to 1 single clean column on mobile viewports */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6">
          {Object.entries(categoryAmounts).map(([category, amount]) => {
            const SelectedIcon =
              CATEGORY_ICONS[category.toLowerCase()] || CATEGORY_ICONS.default;
            return (
              <CategoryCard
                key={category}
                category={category}
                amount={amount}
                icon={SelectedIcon}
                updateCategoryAmount={updateCategoryAmount}
              />
            );
          })}
        </div>

        {/* Bottom Interactive Form Navigation Controls Container */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mt-8 pt-4 border-t border-gray-100">
          <a
            href="#budget-form"
            className="font-bold text-xs uppercase tracking-wider text-primary hover:underline cursor-pointer order-2 sm:order-1"
          >
            ← Back to Step 1
          </a>
          <button
            type="button"
            className="bg-primary text-white p-3 rounded-xl cursor-pointer hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center w-full sm:w-1/2 font-bold text-xs uppercase tracking-wider shadow-sm order-1 sm:order-2"
            onClick={handleNavToDashboard}
          >
            Load Dashboard Terminal
          </button>
        </div>
      </section>
    </main>
  );
};

export default BudgetForm;
