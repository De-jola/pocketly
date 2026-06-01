import { useRef, useState } from "react";
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
import { FaNairaSign } from "react-icons/fa6";
import html2pdf from "html2pdf.js/dist/html2pdf.bundle.js";
import InsightCard from "../components/InsightCard";

const Reports = () => {
  const { income, savingsAmount, spendingAmount } = useBudget();
  const [isDownloading, setIsDownloading] = useState(false);
  const reportRef = useRef(null);

  // --- 1. Statistical Math Processing Calculations ---
  const totalOutflow = savingsAmount + spendingAmount;
  const flowPercentage =
    income > 0 ? Math.min((totalOutflow / income) * 100, 100) : 0;

  // Static mockup data targets for calculation values (Replace with context tracking arrays if built)
  const dailyAverage = totalOutflow > 0 ? Math.round(totalOutflow / 30) : 0;
  const highestSavingDay = "May 24, 2026";
  const highestSpendCategory = "Transportation";

  // --- 2. HTML to PDF Compilation Handler ---
  const handleDownloadPDF = () => {
    const element = reportRef.current;
    if (!element) return;

    setIsDownloading(true);

    const options = {
      margin: [10, 10, 10, 10],
      filename: "Pocketly_Monthly_Financial_Report.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Run the conversion pipeline
    html2pdf()
      .from(element)
      .set(options)
      .save()
      .then(() => setIsDownloading(false))
      .catch(() => setIsDownloading(false));
  };

  // SVG Ring Geometric Dimensions
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (flowPercentage / 100) * circumference;

  return (
    <main className="flex min-h-screen w-screen bg-gray-50 overflow-x-hidden ">
      {/* Structural Sidebar Navigation */}
      <Sidebar />

      {/* Main Panel Content Wrapper */}
      <section className="flex-1 pl-75 p-6  flex flex-col gap-6  ">
        {/* Top Control Toolbar Row */}
        <header className="flex justify-between items-center border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-gray-800 tracking-wide">
              Financial Intelligence
            </h1>
            <p className="text-xs text-gray-400">
              Export audited cash performance breakdowns.
            </p>
          </div>
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:scale-[1.02] active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            <FaDownload className={isDownloading ? "animate-bounce" : ""} />
            {isDownloading ? "Generating PDF..." : "Export PDF Report"}
          </button>
        </header>

        {/* --- REPORT CONTAINER (TARGETED BY THE PDF GENERATOR) --- */}
        <div
          ref={reportRef}
          id="report-content"
          className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-8 max-w-4xl"
        >
          {/* PDF Document Header Block */}
          <div className="flex justify-between items-start border-b-2 border-gray-50 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                Pocketly Executive Summary
              </span>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                Monthly Cash Audit
              </h2>
            </div>
            <div className="text-right text-xs text-gray-400 font-mono">
              <p>Generated: June 2026</p>
              <p>Cycle: 30-Day Variant</p>
            </div>
          </div>

          {/* Section A: Flow Ring Chart & Quick Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-gray-100 pb-8">
            {/* The Cash Flow Ring Vector Graphic Container */}
            <div className="flex flex-col items-center justify-center bg-gray-50/50 p-6 rounded-2xl border border-gray-50 relative">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                Capital Outflow Spectrum
              </span>

              <div className="relative flex items-center justify-center">
                <svg className="w-44 h-44 transform -rotate-90">
                  {/* Track Background Ring */}
                  <circle
                    cx="88"
                    cy="88"
                    r={radius}
                    className="stroke-purple-50 fill-none"
                    strokeWidth="12"
                  />
                  {/* Living Progress Line */}
                  <circle
                    cx="88"
                    cy="88"
                    r={radius}
                    className="stroke-primary fill-none transition-all duration-1000 ease-out"
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                {/* Embedded Inner Flow Metrics Box */}
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                    Total Outflow
                  </span>
                  <div className="flex items-center text-lg font-black text-gray-900 font-mono mt-0.5">
                    <FaNairaSign className="size-3.5" />
                    <span>{totalOutflow.toLocaleString()}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-primary mt-0.5">
                    {flowPercentage.toFixed(0)}% of Income
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Summary Cards Stack */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 shadow-sm">
                <div className="p-3 bg-white rounded-lg text-primary shadow-sm">
                  <FaArrowUp className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Daily Average Burn
                  </span>
                  <div className="flex items-center font-mono text-base font-black text-gray-800">
                    <FaNairaSign className="size-3" />
                    {dailyAverage.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 shadow-sm">
                <div className="p-3 bg-white rounded-lg text-emerald-500 shadow-sm">
                  <FaCalendarAlt className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Highest Saving Day
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    {highestSavingDay}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section B: Category Heavyweight Tracking */}
          <div className="border-b border-gray-100 pb-8 flex flex-col gap-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">
              Strain Allocation Peak
            </h3>
            <div className="flex items-center justify-between p-4 bg-amber-50/50 border border-amber-100 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500 text-white rounded-lg">
                  <FaFire className="size-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800">
                    Highest Spend Focus Group
                  </h4>
                  <p className="text-xs text-gray-500">
                    This category has drawn the maximum capital weight this
                    sequence block.
                  </p>
                </div>
              </div>
              <span className="bg-amber-100 text-amber-800 font-bold px-4 py-1.5 rounded-lg text-xs tracking-wide uppercase">
                {highestSpendCategory}
              </span>
            </div>
          </div>

          {/* Section C: Mindful Insights (Grid View) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InsightCard
              icon={BiTrendingUp}
              title="Velocity Review"
              description="Your velocity pacing structure is balanced. The current allocation tracks safely inside your target boundary threshold parameters."
            />

            <InsightCard
              icon={FaLightbulb}
              title="Leak Containment"
              description={`Spikes inside ${highestSpendCategory} are accelerating. Re-anchor your limits early next cycle to optimize unallocated margins.`}
            />

            <InsightCard
              icon={FaShieldAlt}
              title="Liquidity Cushion"
              description="Unallocated structural liquidity is sitting at a healthy point. Consider pushing excess margins directly to your Savings Sanctuary block."
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Reports;
