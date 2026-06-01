import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. PERSISTENT DASHBOARD PORTAL INITIALIZERS
  const [income, setIncome] = useState(() => {
    const saved = localStorage.getItem("pocketly_income");
    return saved ? Number(saved) : 5000;
  });

  const [savings, setSavings] = useState(() => {
    const saved = localStorage.getItem("pocketly_savings");
    return saved ? Number(saved) : 20;
  });

  const [spending, setSpending] = useState(() => {
    const saved = localStorage.getItem("pocketly_spending");
    return saved ? Number(saved) : 50;
  });

  const [categoryAmounts, setCategoryAmounts] = useState(() => {
    const saved = localStorage.getItem("pocketly_category_amounts");
    return saved
      ? JSON.parse(saved)
      : {
          food: 400,
          transportation: 250,
          subscription: 150,
          miscellaneous: 100,
        };
  });

  const [expenses, setExpenses] = useState([]);

  // 2. SESSION LIFECYCLE MONITOR
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Namespace the expense log specifically to the unique user account UID
        const savedExpenses = localStorage.getItem(
          `pocketly_expenses_${currentUser.uid}`,
        );
        setExpenses(savedExpenses ? JSON.parse(savedExpenses) : []);
      } else {
        setExpenses([]);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // 3. AUTOMATED REAL-TIME SYNCHRONIZATION HOOKS
  useEffect(() => {
    localStorage.setItem("pocketly_income", income);
  }, [income]);

  useEffect(() => {
    localStorage.setItem("pocketly_savings", savings);
  }, [savings]);

  useEffect(() => {
    localStorage.setItem("pocketly_spending", spending);
  }, [spending]);

  useEffect(() => {
    localStorage.setItem(
      "pocketly_category_amounts",
      JSON.stringify(categoryAmounts),
    );
  }, [categoryAmounts]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        `pocketly_expenses_${user.uid}`,
        JSON.stringify(expenses),
      );
    }
  }, [expenses, user]);

  // Math tracking matrices
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
    const targetCategory = (categoryName || "").trim().toLowerCase();
    return expenses
      .filter(
        (exp) => (exp?.category || "").trim().toLowerCase() === targetCategory,
      )
      .reduce((sum, exp) => sum + exp.amount, 0);
  };

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
        return prev; // Block limits if they exceed the calculated maximum spending boundary
      }

      return proposedAmounts;
    });
  };

  const totalExpensesSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const unallocatedSpending =
    spendingAmount -
    Object.values(categoryAmounts).reduce((sum, amt) => sum + (amt || 0), 0);
  const remainder = 100 - (savings + spending);
  const remainderAmount = income - (savingsAmount + spendingAmount);

  return (
    <BudgetContext.Provider
      value={{
        user,
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
        totalExpensesSpent,
        categoryAmounts,
        updateCategoryAmount,
        unallocatedSpending,
        expenses,
        addExpense,
        getCategorySpent,
      }}
    >
      {!loading && children}
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
