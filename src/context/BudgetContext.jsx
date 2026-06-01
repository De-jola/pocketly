import { createContext, useContext, useState, useEffect } from "react";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [income, setIncome] = useState(5000);
  const [savings, setSavings] = useState(20);
  const [spending, setSpending] = useState(50);

  const [categoryAmounts, setCategoryAmounts] = useState({
    food: 400,
    transportation: 250,
    subscription: 150,
    miscellaneous: 100,
  });

  // Load initial data from Local Storage fallback window, else start empty
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("pocketly_expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  // Calculate allocated structural pools based on percentages
  const spendingAmount = (spending / 100) * income;
  const savingsAmount = (savings / 100) * income;

  // Sync expenses array to local storage automatically when it mutates
  useEffect(() => {
    localStorage.setItem("pocketly_expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (newExpense) => {
    setExpenses((prev) => [
      ...prev,
      {
        ...newExpense,
        id: Date.now(),
        amount: Number(newExpense.amount),
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        time: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const getCategorySpent = (categoryName) => {
    const targetCategory = (categoryName || "").trim().toLowerCase();
    return expenses
      .filter(
        (exp) => (exp?.category || "").trim().toLowerCase() === targetCategory,
      )
      .reduce((sum, exp) => sum + exp.amount, 0);
  };

  // Update budget category ceilings with strict allocation guardrails
  const updateCategoryAmount = (category, inputValue) => {
    if (inputValue === "") {
      setCategoryAmounts((prev) => ({ ...prev, [category]: "" }));
      return;
    }

    const numericValue = Number(inputValue);
    if (isNaN(numericValue) || numericValue < 0) return;

    setCategoryAmounts((prev) => {
      const proposedAmounts = { ...prev, [category]: numericValue };

      const totalAllocated = Object.values(proposedAmounts).reduce(
        (sum, amt) => sum + (amt || 0),
        0,
      );

      if (totalAllocated > spendingAmount) {
        return prev; // Block updates if it exceeds the maximum spending limit cap
      }

      return proposedAmounts;
    });
  };

  // Calculate actual total spent from transactions dynamically without setting states
  const totalExpensesSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Calculate remaining unallocated cash inside the spending limit pool
  const unallocatedSpending =
    spendingAmount -
    Object.values(categoryAmounts).reduce((sum, amt) => sum + (amt || 0), 0);

  const remainder = 100 - (savings + spending);
  const remainderAmount = income - (savingsAmount + spendingAmount);

  return (
    <BudgetContext.Provider
      value={{
        income,
        setIncome,
        savings,
        setSavings,
        savingsAmount,
        spending,
        setSpending,
        remainder,
        remainderAmount,
        spendingAmount, // Total allocated budget pool limit (e.g. 2500)
        totalExpensesSpent, // 👈 New: Actual living sum of logged items (e.g. 2150)
        categoryAmounts,
        updateCategoryAmount,
        unallocatedSpending,
        expenses,
        addExpense,
        getCategorySpent,
      }}
    >
      {BudgetContext.Provider && children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
};
