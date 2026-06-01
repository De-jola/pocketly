import { useBudget } from "../context/BudgetContext";
import {
  FaUtensils,
  FaCar,
  FaGamepad,
  FaQuestionCircle,
  FaReceipt,
} from "react-icons/fa";
import { FaNairaSign } from "react-icons/fa6";

// Optional: Dynamic icon dictionary to match the transaction's category context
const CATEGORY_ICONS = {
  food: FaUtensils,
  transportation: FaCar,
  subscription: FaGamepad,
  miscellaneous: FaQuestionCircle,
};

const RecentTransactions = () => {
  const { expenses } = useBudget();

  // Reverse the array copy so newly logged items float directly to the top
  const sortedExpenses = [...expenses].reverse();

  return (
    <div className="w-full bg-white p-6 rounded-xl max-w-xl flex flex-col gap-4">
      <header className="flex justify-between items-baseline border-b border-gray-100 pb-3">
        <div>
          <h2 className="text-lg font-bold text-heading tracking-wide">
            Recent History
          </h2>
          <p className="text-xs text-gray-400">Your latest spending records.</p>
        </div>
        <span className="text-xs bg-purple-50 text-primary px-2.5 py-1 rounded-full font-semibold">
          {expenses.length} Total
        </span>
      </header>

      {/* Fallback Empty State Window */}
      {sortedExpenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
          <FaReceipt className="text-gray-300 size-8 animate-pulse" />
          <p className="text-sm font-medium text-gray-500">
            No transactions recorded yet.
          </p>
          <p className="text-xs text-gray-400 max-w-[240px]">
            Use the Add Expense panel to log your metrics.
          </p>
        </div>
      ) : (
        /* The Transaction Feed List */
        <div className="flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-1 scroll-smooth">
          {sortedExpenses.map((expense) => {
            // Determine dynamic matching icon metadata
            const IconComponent =
              CATEGORY_ICONS[expense.category?.toLowerCase()] ||
              FaQuestionCircle;

            return (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-purple-50/40 border border-transparent hover:border-purple-100 transition-all duration-200"
              >
                {/* Left Meta Group: Icon + Context Data */}
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 bg-white rounded-lg border border-gray-100 text-gray-600 shadow-sm">
                    <IconComponent className="size-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-800 capitalize">
                      {expense.description || expense.category}
                    </span>
                    <span className="text-[11px] font-medium text-gray-400 tracking-wide uppercase">
                      {expense.category}
                    </span>
                  </div>
                </div>

                {/* Right Meta Group: Price Metric */}
                <div className="flex items-center gap-0.5 text-sm font-bold text-red-600 font-mono">
                  <span>-</span>
                  <FaNairaSign className="size-3" />
                  <span>{expense.amount.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
