import { createContext, useContext, useState } from "react";
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
  const [expenses, setExpenses] = useState([]);

  const spendingAmount = (spending / 100) * income;
  const savingsAmount = (savings / 100) * income;
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
    return expenses
      .filter(
        (exp) => exp.category.toLowerCase() === categoryName.toLowerCase(),
      )
      .reduce((sum, exp) => sum + exp.amount, 0);
  };

  // 2. Update function with strict cash verification
  const updateCategoryAmount = (category, inputValue) => {
    // If the input is empty (user backspaced everything), let them type
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
        return prev;
      }

      return proposedAmounts;
    });
  };

  // Calculate remaining unallocated cash inside the spending pool
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
        spendingAmount,
        categoryAmounts,
        updateCategoryAmount,
        unallocatedSpending,
        expenses,
        addExpense,
        getCategorySpent,
      }}
    >
      {children}
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
