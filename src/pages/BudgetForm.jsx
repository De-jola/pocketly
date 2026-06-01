import Brand from "../components/Brand";
import ProgressBar from "../components/ProgressBar";
import CategoryCard from "../components/CategoryCard";
import { FaDollarSign } from "react-icons/fa";
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
    Miscellaneous: FaEllipsisH,
    // Add a fallback icon just in case a new category doesn't have an icon yet
    default: FaQuestionCircle,
  };

  const navigate = useNavigate();
  const handleNavToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <main className="px-10 py-6 bg-[#FAF8FF] scroll-smooth">
      <nav className="flex items-center justify-between">
        <Brand color="primary" />
        <ProgressBar text="Setting up your budget..." />
      </nav>
      <header className="text-center max-w-2xl mx-auto my-12 ">
        <h1 className="text-3xl font-bold text-heading mb-2">
          Define Your Monthly Plan
        </h1>
        <p className=" text-label">
          Let's build a mindful foundation for your finances.
        </p>
      </header>
      <section
        id="budget-form"
        className="w-[800px] mx-auto bg-white p-8 rounded-lg shadow"
      >
        <h2 className="font-bold text-heading text-xl flex gap-2 items-center mb-6">
          <span className="bg-primary text-white px-4 py-2 rounded-3xl font-base">
            1
          </span>
          Step 1: Income & High-Level Split
        </h2>
        <div className="flex items-start justify-between gap-6">
          <div className="flex flex-col gap-6 mt-4 relative w-1/2">
            <label htmlFor="income">Monthly Income</label>

            <FaDollarSign className="absolute top-18 left-3 transform -translate-y-1/2 text-gray-500" />
            <input
              type="number"
              id="income"
              placeholder="5000"
              className="px-8 py-3 outline-none focus:ring-2 focus:ring-primary rounded-md"
              onChange={(e) => setIncome(Number(e.target.value))}
            />
            <small>This is the net amount you receive each month.</small>
          </div>
          <div className="flex flex-col gap-4 mt-4 w-1/2">
            <div>
              <label htmlFor="savings"> Savings Goal ({savings}%)</label>
              <input
                type="range"
                id="savings"
                min="0"
                max="100"
                value={savings}
                onChange={(e) =>
                  setSavings(Math.min(Number(e.target.value), 100 - spending))
                }
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="spending"> Spending Goal ({spending}%)</label>
              <input
                type="range"
                id="spending"
                min="0"
                max="100"
                value={spending}
                onChange={(e) =>
                  setSpending(Math.min(Number(e.target.value), 100 - savings))
                }
                className="w-full"
              />
            </div>
            <output className="block p-3 bg-purple-50 rounded text-purple-900 font-bold">
              Remaining: {remainder}%
            </output>
            <a
              href="#category-allocation"
              className="bg-primary text-white p-2 rounded-3xl cursor-pointer hover:scale-105 transition-transform mt-6 flex items-center justify-center w-full"
            >
              Continue to Step 2
            </a>
          </div>
        </div>
      </section>

      <section
        id="category-allocation"
        className="w-[800px] mx-auto bg-white p-8 rounded-lg shadow mt-10 scroll-mt-16"
      >
        <h2 className="font-bold text-heading text-xl flex gap-2 items-center mb-6">
          <span className="bg-primary text-white px-4 py-2 rounded-3xl font-base">
            2
          </span>
          Step 2: Income & High-Level Split
        </h2>
        <div className="flex items-center bg-[#915BAE]/10 justify-between p-4 rounded-lg">
          <p className="text-label">Allocating your monthly spending of </p>
          <p className="font-bold text-primary tracking-wide">
            ${spendingAmount.toLocaleString()}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-6">
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
        <div className="flex justify-between gap-4 mt-6">
          <button type="button" className="font-medium text-primary">
            back
          </button>
          <button
            type="button"
            className="bg-primary text-white p-2 rounded-3xl cursor-pointer hover:scale-105 transition-transform mt-6 flex items-center justify-center w-1/2"
            onClick={handleNavToDashboard}
          >
            Load Dashboard
          </button>
        </div>
      </section>
    </main>
  );
};
export default BudgetForm;
