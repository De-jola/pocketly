import React from "react";
import { useBudget } from "../context/BudgetContext";
import SectionHeader from "./SectionHeader";
import CategoryCard from "./CategoryCard";

const BudgetAllocation = ({ spendingAmount, spendingPercent }) => {
  const { expenses } = useBudget(); // Grab the logs globally

  // Your category allocation percentages
  const foodPercent = 20;
  const dataPercent = 20;
  const subscriptionPercent = 20;
  const miscellaneousPercent = 20;
  const transportPercent = 20;

  // Total absolute pocket caps allowed per category
  const categoryBudgets = {
    Food: (spendingAmount * foodPercent) / 100,
    Data: (spendingAmount * dataPercent) / 100,
    Subscription: (spendingAmount * subscriptionPercent) / 100,
    Miscellaneous: (spendingAmount * miscellaneousPercent) / 100,
    Transport: (spendingAmount * transportPercent) / 100,
  };

  // Helper calculation function: Sums up expenses matching a specific category name string
  const getAmountSpentForCategory = (categoryName) => {
    return expenses
      .filter((expense) => expense.category === categoryName)
      .reduce((sum, currentExpense) => sum + currentExpense.amount, 0);
  };

  const categories = [
    {
      id: 1,
      name: "Food",
      budget: categoryBudgets.Food,
      spent: getAmountSpentForCategory("Food"),
    },
    {
      id: 2,
      name: "Data",
      budget: categoryBudgets.Data,
      spent: getAmountSpentForCategory("Data"),
    },
    {
      id: 3,
      name: "Subscription",
      budget: categoryBudgets.Subscription,
      spent: getAmountSpentForCategory("Subscription"),
    },
    {
      id: 4,
      name: "Miscellaneous",
      budget: categoryBudgets.Miscellaneous,
      spent: getAmountSpentForCategory("Miscellaneous"),
    },
    {
      id: 5,
      name: "Transport",
      budget: categoryBudgets.Transport,
      spent: getAmountSpentForCategory("Transport"),
    },
  ];

  return (
    <main className="space-y-4 w-2/3 bg-white p-6 rounded-xl border border-slate-100">
      <SectionHeader title="Budget Allocation" buttonText="AI Split" />
      <div className="space-y-4 bg-background-secondary p-4 rounded-lg">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            budget={category.budget} // The spending cap limit (e.g., 40,000)
            spent={category.spent} // The calculated progress sum (e.g., 5,000)
          />
        ))}
      </div>
    </main>
  );
};

export default BudgetAllocation;
