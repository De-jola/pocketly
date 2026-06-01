import Sidebar from "../components/Sidebar";
import { useBudget } from "../context/BudgetContext";
import DashBoardCards from "../components/DashboardCards";
import ExpenseCard from "../components/ExpenseCard";
import CategoryBudget from "../components/CategoryBudget";
import RecentTransactions from "../components/RecentTransactions";
import { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";

const Dashboard = () => {
  const {
    income,
    spending,
    spendingAmount,
    savings,
    savingsAmount,
    remainder,
    remainderAmount,
  } = useBudget();

  // --- Copy Clipboard Local Micro State ---
  const [copied, setCopied] = useState(false);
  const bankDetailsText = "Stanbic IBTC • 0034567891";

  const handleCopyBankDetails = (e) => {
    e.stopPropagation(); // Prevents card interaction bubbling
    navigator.clipboard.writeText("Stanbic IBTC Bank 0034567891");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-screen bg-[#FAF8FF] overflow-x-hidden">
      {/* Responsive Structural Navigation Sidebar / Bottom Bar */}
      <Sidebar />

      {/* Main Content Workspace Container Pane */}
      {/* pb-24 adds safety padding so content is never hidden behind the mobile bottom bar */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 w-full max-w-5xl mx-auto pb-24 md:pb-10">
        {/* Header Title Grid Row */}
        <header className="mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-heading tracking-wide">
            Get Budgeting!
          </h1>
          <p className="text-xs text-gray-400">
            Mindful real-time tracking metrics overview.
          </p>
        </header>

        {/* 📊 Macro Dashboard Metrics Summary Cards Grid */}
        {/* 1 col on mobile, 2 cols on tablet (sm), 4 cols on desktop (lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl flex flex-col justify-between">
            <DashBoardCards title="Total Income" amount={income} />
            <span className="text-[10px] text-gray-400 font-medium tracking-wide mt-2 block">
              Base structural limit pool
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl  flex flex-col justify-between relative group">
            <DashBoardCards
              title={`Savings (${savings}%)`}
              amount={savingsAmount}
            />
            {/* Interactive copy to clipboard segment inline target */}
            <button
              onClick={handleCopyBankDetails}
              className="flex items-center gap-1.5 text-[10px] text-primary font-bold mt-2 bg-purple-50 hover:bg-purple-100 transition-colors px-2 py-1 rounded-lg self-start cursor-pointer w-full justify-between focus:outline-none"
            >
              <span>{bankDetailsText}</span>
              {copied ? (
                <FaCheck className="text-emerald-600 size-2.5 shrink-0" />
              ) : (
                <FaCopy className="text-purple-400 size-2.5 shrink-0" />
              )}
            </button>
          </div>

          <div className="bg-white p-5 rounded-2xl flex flex-col justify-between">
            <DashBoardCards
              title={`Spending (${spending}%)`}
              amount={spendingAmount}
            />
            <span className="text-[10px] text-gray-400 font-medium tracking-wide mt-2 block  px-2 py-1 rounded-lg self-start">
              Active allowance capsule
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl  flex flex-col justify-between">
            <DashBoardCards
              title={`Unallocated (${remainder}%)`}
              amount={remainderAmount}
            />
            <span className="text-[10px] text-gray-400 font-medium tracking-wide mt-2 block">
              Available baseline remaining cushion
            </span>
          </div>
        </div>

        {/* 📈 Layout Split: Stacks vertically on mobile, expands horizontally on large screens */}
        <section className="flex flex-col lg:flex-row items-start gap-6 w-full">
          {/* Left Transaction Logging Component Block */}
          <div className="w-full lg:flex-1">
            <ExpenseCard />
          </div>

          {/* Right Feed Stream Panels Stack */}
          <aside className="w-full lg:w-1/2 flex flex-col gap-6">
            <CategoryBudget />
            <RecentTransactions />
          </aside>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
