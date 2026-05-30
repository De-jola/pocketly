import React from "react";

const CategoryCard = ({ name, budget, spent }) => {
  // 1. Calculate the visual track percentage (cap it at 100 so it doesn't break out of the UI frame)
  const visualPercentage =
    budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;

  // 2. Calculate the actual raw metric text percentage to display to the user
  const truePercentage = budget > 0 ? Math.round((spent / budget) * 100) : 0;

  // 3. Determine if the user has breached their set category wallet limit
  const isOverBudget = spent > budget;

  return (
    <div className=" p-3 rounded-xl border border-[#E4DDF7]  space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-slate-800 text-base">{name}</h3>
          <p className="text-xs text-slate-400">
            Budget: ₦{budget.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          {/* True numbers keep counting up beyond 100% */}
          <span
            className={`text-sm font-bold ${isOverBudget ? "text-red-500" : "text-purple-700"}`}
          >
            {truePercentage}%
          </span>
          <p className="text-xs text-slate-500 mt-0.5">
            Spent: ₦{spent.toLocaleString()}
          </p>
        </div>
      </div>

      {/* TRACK */}
      <div className="w-full h-2.5 bg-[#e4ddf7] rounded-full overflow-hidden">
        {/* BAR */}
        <div
          className={`h-full transition-all duration-500 ease-out rounded-full ${
            isOverBudget
              ? "bg-red-500" // If over allocation, bar turns red
              : "bg-gradient-to-r from-[#7c5cbf] to-[#b39ddb]" // Standard theme
          }`}
          style={{ width: `${visualPercentage}%` }}
        />
      </div>

      {isOverBudget && (
        <p className="text-xs font-medium text-red-500 animate-pulse">
          ⚠️ Warning: Over budget by ₦{(spent - budget).toLocaleString()}!
        </p>
      )}
    </div>
  );
};

export default CategoryCard;
