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

    // Log tracking submission data into Context
    addExpense({ category, amount, description });

    // Reset fields for the next transaction drop
    setAmount("");
    setDescription("");
  };

  return (
    <main className="flex flex-col gap-8 bg-white p-5 rounded-lg w-1/2">
      <header className="flex items-center gap-2">
        <FaPlusCircle className="text-primary" />
        <h1 className="font-bold text-heading">Add Expense</h1>
      </header>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={category}
          className="p-3 bg-[#FAF8FF]"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Food">Food</option>
          <option value="Subscription">Subscription</option>
          <option value="Transportation">Transportation</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          className="p-3 bg-[#FAF8FF]"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          className="p-3 bg-[#FAF8FF]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Coffee, Burger"
        />
        <button className="bg-primary text-white p-2 rounded-2xl cursor-pointer hover:scale-105 transition-transform mt-6 flex items-center justify-center w-full">
          {" "}
          Log Transaction
        </button>
      </form>
    </main>
  );
};
export default ExpenseCard;
