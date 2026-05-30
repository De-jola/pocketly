import React from "react";

const ProgressBar = ({ value = 0, max = 100 }) => {
  // 1. Calculate the percentage percentage safely to ensure it stays between 0 and 100%
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="w-full max-w-md">
      {/* Label and Percentage Text */}
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-slate-700">
          Savings Target Progress
        </span>
        <span className="text-sm font-semibold text-purple-700">
          {Math.round(percentage)}%
        </span>
      </div>

      {/* THE TRACK */}
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
        {/* THE BAR */}
        <div
          className="h-full bg-gradient-to-r from-[#7c5cbf] to-[#b39ddb] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
