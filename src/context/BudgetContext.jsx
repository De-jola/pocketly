import React, { createContext, useState, useContext, useEffect } from "react";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  // 1. Initial State Helpers: Attempt to read saved data from browser storage, otherwise use defaults
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("pocketly_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [income, setIncome] = useState(() => {
    return Number(localStorage.getItem("pocketly_income")) || 0;
  });

  const [savingsPercent, setSavingsPercent] = useState(() => {
    return Number(localStorage.getItem("pocketly_savings_percent")) || 10;
  });

  const [spendingPercent, setSpendingPercent] = useState(() => {
    return Number(localStorage.getItem("pocketly_spending_percent")) || 40;
  });

  const [categoryPercents, setCategoryPercents] = useState(() => {
    const savedCats = localStorage.getItem("pocketly_category_percents");
    return savedCats
      ? JSON.parse(savedCats)
      : {
          Food: 20,
          Data: 20,
          Subscription: 20,
          Miscellaneous: 20,
          Transport: 20,
        };
  });

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("pocketly_expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem("pocketly_onboarding") === "true";
  });

  // 2. Synchronize States with LocalStorage whenever they change
  useEffect(() => {
    if (user) localStorage.setItem("pocketly_user", JSON.stringify(user));
    else localStorage.removeItem("pocketly_user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("pocketly_income", income);
    localStorage.setItem("pocketly_savings_percent", savingsPercent);
    localStorage.setItem("pocketly_spending_percent", spendingPercent);
    localStorage.setItem(
      "pocketly_category_percents",
      JSON.stringify(categoryPercents),
    );
    localStorage.setItem("pocketly_expenses", JSON.stringify(expenses));
    localStorage.setItem("pocketly_onboarding", hasCompletedOnboarding);
  }, [
    income,
    savingsPercent,
    spendingPercent,
    categoryPercents,
    expenses,
    hasCompletedOnboarding,
  ]);

  // Logout utility function to clear state easily later if needed
  const logout = () => {
    setUser(null);
    setIncome(0);
    setExpenses([]);
    setHasCompletedOnboarding(false);
    localStorage.clear();
  };

  return (
    <BudgetContext.Provider
      value={{
        user,
        setUser,
        income,
        setIncome,
        savingsPercent,
        setSavingsPercent,
        spendingPercent,
        setSpendingPercent,
        categoryPercents,
        setCategoryPercents,
        expenses,
        setExpenses,
        hasCompletedOnboarding,
        setHasCompletedOnboarding,
        logout,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
