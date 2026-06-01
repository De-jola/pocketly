import { useBudget } from "../context/BudgetContext";
import { FaNairaSign } from "react-icons/fa6";

const CategoryBar = ({ category }) => {
  const { categoryAmounts, getCategorySpent } = useBudget();
  const limit = categoryAmounts[category.toLowerCase()] || 0;
  const spent = getCategorySpent(category);

  // 2. Math Processing & Boundary Guardrails
  const percentage = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;
  const isOverBudget = spent > limit;
  const isGettingClose = percentage >= 85;

  // 3. Conditional Layout Tinting
  let barColor = "bg-primary";
  let trackColor = "bg-purple-50";

  if (isOverBudget) {
    barColor = "bg-red-500 animate-pulse";
    trackColor = "bg-red-50";
  } else if (isGettingClose) {
    barColor = "bg-amber-500";
    trackColor = "bg-amber-50";
  }
  return (
    <article className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2">
      {/* Label and Info Stats Row */}
      <div className="flex justify-between items-center text-sm">
        <span className="capitalize font-bold text-gray-700 tracking-wide">
          {category}
        </span>
        <div className="font-mono text-xs text-gray-500 flex items-center">
          <FaNairaSign className="size-2.5" />
          <span className="font-bold text-gray-800">
            {spent.toLocaleString()}
          </span>
          <span className="mx-1">/</span>
          <FaNairaSign className="size-2.5" />
          <span>{limit.toLocaleString()}</span>
        </div>
      </div>

      {/* Progress Track Bar Window */}
      <div
        className={`h-2.5 w-full ${trackColor} rounded-full overflow-hidden relative`}
      >
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Visual Indicator Messages */}
      {isOverBudget && (
        <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">
          Over Budget!
        </span>
      )}
      {!isOverBudget && isGettingClose && (
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
          Approaching Budget Limit ({percentage.toFixed(0)}%)
        </span>
      )}
    </article>
  );
};
export default CategoryBar;
