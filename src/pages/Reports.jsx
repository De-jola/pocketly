import { useBudget } from "../context/BudgetContext";
import Sidebar from "../components/Sidebar";
import {
  FaDownload,
  FaLightbulb,
  FaArrowUp,
  FaCalendarAlt,
  FaFire,
  FaShieldAlt,
} from "react-icons/fa";
import { BiTrendingUp } from "react-icons/bi";
import InsightCard from "../components/InsightCard";

const Reports = () => {
  const { income, savingsAmount, spendingAmount, expenses } = useBudget();

  const totalOutflow = savingsAmount + spendingAmount;
  const flowPercentage =
    income > 0 ? Math.min((totalOutflow / income) * 100, 100) : 0;
  const dailyAverage = totalOutflow > 0 ? Math.round(totalOutflow / 30) : 0;

  const highestSpendCategory = "Transportation";
  const highestSavingDay = "May 24, 2026";

  const handlePrintPDF = () => {
    window.print();
  };

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (flowPercentage / 100) * circumference;

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-screen bg-gray-50 overflow-x-hidden">
      <Sidebar />

      {/* Main Container Core */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10 w-full max-w-5xl mx-auto pb-24 md:pb-10">
        {/* Top Header Row */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-4 mb-6 no-print">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-800 tracking-tight">
              Financial Intelligence
            </h1>
            <p className="text-xs text-gray-400">
              Export audited cash performance breakdowns.
            </p>
          </div>
          <button
            onClick={handlePrintPDF}
            className="flex items-center gap-2 bg-primary text-white w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm hover:scale-[1.02] transition-all cursor-pointer"
          >
            <FaDownload /> Save PDF Report
          </button>
        </header>

        {/* --- REPORT PAYLOAD TARGET AREA --- */}
        <div
          id="report-content"
          className="bg-white p-4 sm:p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-6 sm:gap-8 w-full print-area"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-2 border-gray-50 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                Pocketly Summary
              </span>
              <h2 className="text-lg font-bold text-gray-900">
                Monthly Cash Audit
              </h2>
            </div>
            <div className="text-left sm:text-right text-[11px] text-gray-400 font-mono">
              <p>Generated: June 2026</p>
              <p>Cycle: 30-Day Variant</p>
            </div>
          </div>

          {/* Section A: Flow Ring Chart & Metrics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center border-b border-gray-100 pb-6 sm:pb-8">
            <div className="flex flex-col items-center justify-center bg-gray-50/50 p-4 sm:p-6 rounded-2xl border border-gray-50">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                Capital Outflow Spectrum
              </span>
              <div className="relative flex items-center justify-center">
                <svg className="w-36 h-36 sm:w-44 h-44 transform -rotate-90">
                  <circle
                    cx="88"
                    cy="88"
                    r={radius}
                    className="stroke-purple-50 fill-none"
                    strokeWidth="12"
                  />
                  <circle
                    cx="88"
                    cy="88"
                    r={radius}
                    className="stroke-primary fill-none"
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-[9px] font-bold text-gray-400 uppercase">
                    Total Outflow
                  </span>
                  <div className="flex items-center text-base sm:text-lg font-black text-gray-900 font-mono mt-0.5">
                    <span className="mr-0.5 font-sans font-normal text-gray-500">
                      ₦
                    </span>
                    <span>{totalOutflow.toLocaleString()}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-primary mt-0.5">
                    {flowPercentage.toFixed(0)}% used
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 shadow-sm">
                <div className="p-3 bg-white rounded-lg text-primary shadow-sm">
                  <FaArrowUp className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Daily Average Burn
                  </span>
                  <div className="flex items-center font-mono text-base font-black text-gray-800">
                    ₦{dailyAverage.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 shadow-sm">
                <div className="p-3 bg-white rounded-lg text-emerald-500 shadow-sm">
                  <FaCalendarAlt className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Highest Saving Day
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    {highestSavingDay}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section B: Peak Allocations */}
          <div className="border-b border-gray-100 pb-6">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">
              Strain Allocation Peak
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-amber-50/50 border border-amber-100 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500 text-white rounded-lg">
                  <FaFire className="size-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">
                    Highest Spend Focus Group
                  </h4>
                  <p className="text-xs text-gray-500">
                    This tier drew maximum resource density allocation
                    footprint.
                  </p>
                </div>
              </div>
              <span className="bg-amber-100 text-amber-800 font-bold px-4 py-1.5 rounded-lg text-xs uppercase tracking-wide w-full sm:w-auto text-center">
                {highestSpendCategory}
              </span>
            </div>
          </div>

          {/* Section C: Insight Grid Array */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InsightCard
              icon={BiTrendingUp}
              title="Velocity Review"
              description="Pacing rules remain steady across operations."
            />
            <InsightCard
              icon={FaLightbulb}
              title="Leak Containment"
              description={`Aggregates logged in ${highestSpendCategory} are drifting upward.`}
            />
            <InsightCard
              icon={FaShieldAlt}
              title="Liquidity Cushion"
              description="Unallocated safety reserves reside inside high margins."
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
