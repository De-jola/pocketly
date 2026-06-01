import { useBudget } from "../context/BudgetContext";
import {
  FaUtensils,
  FaCar,
  FaGamepad,
  FaQuestionCircle,
  FaReceipt,
} from "react-icons/fa";
import { FaNairaSign } from "react-icons/fa6";

const CATEGORY_ICONS = {
  food: FaUtensils,
  transportation: FaCar,
  subscription: FaGamepad,
  miscellaneous: FaQuestionCircle,
};

const RecentTransactions = () => {
  const { expenses } = useBudget();
  const sortedExpenses = [...expenses].reverse();

  return (
    /* FIXED: Removed rigid max-w-xl limit so boundaries expand or compress natively */
    <div className="w-full bg-white p-5 sm:p-6 rounded-2xl border border-purple-50 shadow-sm flex flex-col gap-4">
      <header className="flex justify-between items-baseline border-b border-gray-100 pb-3">
        <div>
          <h2 className="text-lg font-black text-heading tracking-tight">
            Recent History
          </h2>
          <p className="text-xs text-gray-400">Your latest spending records.</p>
        </div>
        <span className="text-xs bg-purple-50 text-primary px-2.5 py-1 rounded-full font-bold">
          {expenses.length} Total
        </span>
      </header>

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
        <div className="flex flex-col gap-3 max-h-[360px] overflow-y-auto pr-1 scroll-smooth">
          {sortedExpenses.map((expense) => {
            const IconComponent =
              CATEGORY_ICONS[expense.category?.toLowerCase()] ||
              FaQuestionCircle;

            return (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-purple-50/40 border border-transparent hover:border-purple-100 transition-all duration-200 gap-2"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 bg-white rounded-lg border border-gray-100 text-gray-600 shadow-sm shrink-0">
                    <IconComponent className="size-4 text-primary" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-gray-800 capitalize truncate">
                      {expense.description || expense.category}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 tracking-wide uppercase truncate">
                      {expense.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-sm font-bold text-red-600 font-mono shrink-0">
                  <span>-</span>
                  <FaNairaSign className="size-2.5" />
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
