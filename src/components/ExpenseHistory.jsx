// src/components/ExpenseHistory.jsx
import React, { useState } from "react";
import { useBudget } from "../context/BudgetContext";
import TransactionLogItem from "./TransactionLogItem";

const ExpenseHistory = () => {
  const { expenses } = useBudget();
  const [showAll, setShowAll] = useState(false);

  // 1. Isolate the absolute top 3 latest items for the quick snapshot view
  const recentLogs = expenses.slice(0, 3);

  if (expenses.length === 0) {
    return (
      <div className="p-8 rounded-2xl text-center">
        <p className="text-sm text-slate-400 font-medium">
          No spending logs recorded yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* SECTION A: RECENT SNAPSHOT FEED */}
      {!showAll && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900">Recent Logs</h3>
            {expenses.length > 3 && (
              <button
                onClick={() => setShowAll(true)}
                className="text-xs font-semibold text-[#7c5cbf] hover:underline"
              >
                View Past Logs ({expenses.length})
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {recentLogs.map((log) => (
              <TransactionLogItem key={log.id} {...log} />
            ))}
          </div>
        </div>
      )}

      {/* SECTION B: COMPLETE HISTORICAL TIMELINE FEED */}
      {showAll && (
        <div className="space-y-3 ">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900">
              Full Archive History
            </h3>
            <button
              onClick={() => setShowAll(false)}
              className="text-xs font-semibold text-[#7c5cbf] hover:underline"
            >
              Collapse Feed
            </button>
          </div>

          <div
            className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 
  scrollbar-thin 
  [&::-webkit-scrollbar]:w-1.5 
  [&::-webkit-scrollbar-track]:bg-transparent 
  [&::-webkit-scrollbar-thumb]:bg-slate-200 
  [&::-webkit-scrollbar-thumb]:rounded-full 
  hover:[&::-webkit-scrollbar-thumb]:bg-purple-300"
          >
            {expenses.map((log) => (
              <TransactionLogItem key={log.id} {...log} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseHistory;
