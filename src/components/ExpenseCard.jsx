import { FaPlusCircle } from "react-icons/fa";
import { useState } from "react";
import { useBudget } from "../context/BudgetContext";

const ExpenseCard = () => {
  const { addExpense } = useBudget();
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    addExpense({ category, amount, description });

    setAmount("");
    setDescription("");
  };

  return (
    /* FIXED: Swapped w-1/2 for w-full to align beautifully inside responsive grid layouts */
    <section className="w-full bg-white p-5 sm:p-6 rounded-2xl border border-purple-50 shadow-sm flex flex-col gap-6 sm:gap-8">
      <header className="flex items-center gap-2">
        <FaPlusCircle className="text-primary size-5" />
        <h2 className="font-black text-lg text-heading tracking-tight">
          Add Expense
        </h2>
      </header>

      <form className="flex flex-col gap-4 text-sm" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="category"
            className="text-xs font-bold text-gray-400 uppercase tracking-wide"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            className="p-3 bg-[#FAF8FF] border border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white text-gray-700 font-medium transition-all cursor-pointer"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Subscription">Subscription</option>
            <option value="Transportation">Transportation</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="amount"
            className="text-xs font-bold text-gray-400 uppercase tracking-wide"
          >
            Amount (₦)
          </label>
          <input
            type="number"
            id="amount"
            required
            placeholder="0.00"
            className="p-3 bg-[#FAF8FF] border border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white font-semibold text-gray-700 transition-all"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="description"
            className="text-xs font-bold text-gray-400 uppercase tracking-wide"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            className="p-3 bg-[#FAF8FF] border border-transparent rounded-xl focus:outline-none focus:border-primary focus:bg-white text-gray-700 transition-all"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Coffee, Burger, Gas..."
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white p-3 rounded-xl cursor-pointer hover:scale-[1.01] active:scale-95 font-bold text-xs uppercase tracking-wider transition-all mt-4 flex items-center justify-center w-full shadow-sm"
        >
          Log Transaction
        </button>
      </form>
    </section>
  );
};

export default ExpenseCard;
