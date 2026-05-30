// src/pages/BudgetFormPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBudget } from "../context/BudgetContext";
import { FaWallet } from "react-icons/fa6";

const BudgetFormPage = () => {
  const {
    income,
    setIncome,
    savingsPercent,
    setSavingsPercent,
    spendingPercent,
    setSpendingPercent,
    categoryPercents,
    setCategoryPercents,
    setHasCompletedOnboarding,
  } = useBudget();

  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Live Math Calculations to display context to the user as they type
  const spendingAmount = (income * spendingPercent) / 100;

  // Calculate total category percentage allocation sum
  const totalCategoryAllocated = Object.values(categoryPercents).reduce(
    (a, b) => a + b,
    0,
  );

  // Helper handler function to update individual keys inside our state object
  const handleCategoryChange = (category, value) => {
    setCategoryPercents((prev) => ({
      ...prev,
      [category]: Number(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (savingsPercent + spendingPercent > 100) {
      setError("Total allocation (Savings + Spending) cannot exceed 100%!");
      return;
    }

    // Critical Validation Guard: Must hit exactly 100% of the spending limit box
    if (totalCategoryAllocated !== 100) {
      setError(
        `Your category allocations must add up to exactly 100%. Currently at ${totalCategoryAllocated}%.`,
      );
      return;
    }

    setError("");
    setHasCompletedOnboarding(true);
    navigate("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#7c5cbf] py-12 px-4 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl space-y-6">
        <div className="flex items-center gap-2 text-[#7c5cbf]">
          <FaWallet size={24} />
          <span className="text-lg font-bold">Pocketly</span>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Configure Your Budget Plan
          </h2>
          <p className="text-sm text-slate-500">
            Set income goals and partition your spending limits.
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Top Level Income Config Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Monthly Income (₦)
              </label>
              <input
                type="number"
                required
                min="1"
                value={income || ""}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg outline-none focus:border-purple-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Savings Target (%)
              </label>
              <input
                type="number"
                required
                max="100"
                value={savingsPercent || ""}
                onChange={(e) => setSavingsPercent(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg outline-none focus:border-purple-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                Total Spending (%)
              </label>
              <input
                type="number"
                required
                max="100"
                value={spendingPercent || ""}
                onChange={(e) => setSpendingPercent(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg outline-none focus:border-purple-600"
              />
            </div>
          </div>

          {/* DYNAMIC CATEGORY SLICER PANEL */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
              <h3 className="font-bold text-sm text-slate-800">
                Distribute Spending Bucket
              </h3>
              <span className="text-xs font-semibold text-slate-500">
                Total Pool:{" "}
                <span className="text-purple-700 font-bold">
                  ₦{spendingAmount.toLocaleString()}
                </span>
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.keys(categoryPercents).map((cat) => {
                // Calculate the real currency value for each category on the fly
                const absoluteAmount =
                  (spendingAmount * categoryPercents[cat]) / 100;
                return (
                  <div
                    key={cat}
                    className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-sm flex flex-col justify-between"
                  >
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {cat}
                    </label>
                    <div className="relative mt-auto">
                      <input
                        type="number"
                        required
                        min="0"
                        max="100"
                        value={categoryPercents[cat] || ""}
                        onChange={(e) =>
                          handleCategoryChange(cat, e.target.value)
                        }
                        className="w-full pr-5 pl-2 py-1.5 text-sm border rounded outline-none focus:border-purple-600 font-semibold"
                      />
                      <span className="absolute right-1.5 top-2 text-xs text-slate-400">
                        %
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium mt-1.5 block truncate">
                      ₦{absoluteAmount.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Live Indicator Progress Tracker */}
            <div className="flex justify-between items-center text-xs font-semibold mt-2">
              <span
                className={
                  totalCategoryAllocated === 100
                    ? "text-green-600"
                    : "text-amber-600"
                }
              >
                Allocation Progress: {totalCategoryAllocated}% / 100%
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#7c5cbf] text-white font-semibold rounded-lg hover:bg-[#694ca3] transition-colors shadow-md"
          >
            Save and Launch Dashboard
          </button>
        </form>
      </div>
    </main>
  );
};

export default BudgetFormPage;
