// src/context/BudgetContext.jsx
import React, { createContext, useState, useContext } from "react";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [income, setIncome] = useState(0);
  const [savingsPercent, setSavingsPercent] = useState(10); // Defaults
  const [spendingPercent, setSpendingPercent] = useState(40);
  const [bank] = useState("Kuda Bank");
  const [accountNumber] = useState("0123456789");
  const [expenses, setExpenses] = useState([]);

  // Make sure to add 'expenses' and 'setExpenses' to the Provider's value object!

  return (
    <BudgetContext.Provider
      value={{
        income,
        setIncome,
        savingsPercent,
        setSavingsPercent,
        spendingPercent,
        setSpendingPercent,
        bank,
        accountNumber,
        expenses,
        setExpenses,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

// Custom hook to make importing effortless across pages
export const useBudget = () => useContext(BudgetContext);
