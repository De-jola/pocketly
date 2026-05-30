import React, { useState } from "react";
import { useBudget } from "../context/BudgetContext"; // Import context hook

const LogSpendingForm = () => {
  // 1. Pull the global state setter from Context
  const { setExpenses } = useBudget();

  // 2. Setup local component states to track what the user types
  const [selectedCategory, setSelectedCategory] = useState("Food");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");

  // 3. Paste the function right here!
  const handleAddExpense = (e) => {
    e.preventDefault();

    const newExpense = {
      id: Date.now(),
      category: selectedCategory,
      amount: Number(enteredAmount),
      description: enteredDescription,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    };

    // Prepend the new transaction to the global array stack
    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);

    // 4. Clear the form input fields back to empty so they can type a new log
    setEnteredAmount("");
    setEnteredDescription("");
  };

  return (
    <form
      onSubmit={handleAddExpense}
      className="bg-white p-6 rounded-xl border border-slate-100 space-y-4 max-w-sm w-1/2"
    >
      <h3 className="font-bold text-slate-900 text-lg">Log New Expense</h3>

      {/* Category Dropdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2.5 border rounded-lg bg-white outline-none focus:border-purple-600"
        >
          <option value="Food">Food</option>
          <option value="Data">Data</option>
          <option value="Subscription">Subscription</option>
          <option value="Miscellaneous">Miscellaneous</option>
          <option value="Transport">Transport</option>
        </select>
      </div>

      {/* Amount Input */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          Amount (₦)
        </label>
        <input
          type="number"
          required
          placeholder="e.g. 3500"
          value={enteredAmount}
          onChange={(e) => setEnteredAmount(e.target.value)}
          className="w-full p-2.5 border rounded-lg outline-none focus:border-purple-600"
        />
      </div>

      {/* Description Input */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-slate-600 mb-1">
          Description
        </label>
        <input
          type="text"
          required
          placeholder="What did you buy?"
          value={enteredDescription}
          onChange={(e) => setEnteredDescription(e.target.value)}
          className="w-full p-2.5 border rounded-lg outline-none focus:border-purple-600"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2.5 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
      >
        Add Transaction
      </button>
      </div>
    </form>
  );
};

export default LogSpendingForm;
