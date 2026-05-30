// src/pages/BudgetFormPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBudget } from "../context/BudgetContext";
import { FaWallet } from "react-icons/fa6";

const BudgetFormPage = () => {
  const {
    setIncome,
    setSavingsPercent,
    setSpendingPercent,
    income,
    savingsPercent,
    spendingPercent,
  } = useBudget();

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Safety Validation: Ensure they don't allocate more than 100%
    if (Number(savingsPercent) + Number(spendingPercent) > 100) {
      setError("Total allocation (Savings + Spending) cannot exceed 100%!");
      return;
    }

    setError("");
    // Redirect cleanly to the dashboard now that Context has saved the state globally
    navigate("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(145deg,#7c5cbf_0%,#b39ddb_60%,#d9cffa_100%)] flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center gap-2 text-[#7c5cbf] mb-6">
          <FaWallet size={28} />
          <span className="text-xl font-bold tracking-tight">Pocketly</span>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-1">
          Set Your Budget
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Configure your financial limits for the month.
        </p>

        {error && (
          <p className="text-sm text-red-500 mb-4 bg-red-50 p-2.5 rounded-lg">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Income Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Monthly Income (₦)
            </label>
            <input
              type="number"
              required
              min="1"
              value={income || ""}
              onChange={(e) => setIncome(Number(e.target.value))}
              placeholder="e.g. 150000"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-purple-600"
            />
          </div>

          {/* Savings Percent */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Savings Target (%)
            </label>
            <input
              type="number"
              required
              max="100"
              value={savingsPercent || ""}
              onChange={(e) => setSavingsPercent(Number(e.target.value))}
              placeholder="e.g. 20"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-purple-600"
            />
          </div>

          {/* Spending Percent */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Spending Target (%)
            </label>
            <input
              type="number"
              required
              max="100"
              value={spendingPercent || ""}
              onChange={(e) => setSpendingPercent(Number(e.target.value))}
              placeholder="e.g. 50"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg outline-none focus:border-purple-600"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#7c5cbf] text-white font-semibold rounded-lg hover:bg-[#694ca3] transition-colors shadow-md shadow-purple-200 mt-2"
          >
            Generate Dashboard
          </button>
        </form>
      </div>
    </main>
  );
};

export default BudgetFormPage;
