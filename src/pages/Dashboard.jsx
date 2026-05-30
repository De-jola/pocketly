import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useBudget } from "../context/BudgetContext";
import BudgetAllocation from "../components/BudgetAllocation";
import LogSpendingForm from "../components/LogSpending";
import Button from "../components/Button";
import Card from "../components/Card";
import { FaShare, FaPlus } from "react-icons/fa6";

const Dashboard = () => {
  const { income, savingsPercent, spendingPercent, bank, accountNumber } =
    useBudget();
  // Math Calculations
  const savingsAmount = (income * savingsPercent) / 100;
  const spendingAmount = (income * spendingPercent) / 100;
  const remainingAmount = income - (savingsAmount + spendingAmount);

  // Safe calculation guard against division-by-zero
  const percentRemaining =
    income > 0 ? Math.round((remainingAmount / income) * 100) : 0;

  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  return (
    <main className="flex min-h-screen">
      <section className="p-6 w-1/5">
        <Sidebar />
      </section>

      <section className="px-6 py-4 flex-1 bg-background-secondary">
        <nav className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500">
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}{" "}
              · Budget Overview
            </p>
          </div>
          <div className="flex gap-4">
            <Button buttonText="Share Plan" buttonLogo={<FaShare />} />
            <Button buttonText="Log Spending" buttonLogo={<FaPlus />} />
          </div>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card
            title="Monthly Earning"
            description={`Set for ${currentMonth}`}
            amount={income}
          />
          <Card
            title={`Savings ${savingsPercent}%`}
            description={`${bank} - ${accountNumber}`}
            amount={savingsAmount}
          />
          <Card
            title={`Spending Amount ${spendingPercent}%`}
            description="Across 4 Categories"
            amount={spendingAmount}
          />
          <Card
            title="Remaining Balance"
            description={`${percentRemaining}% unallocated`}
            amount={remainingAmount}
          />
        </div>
        <section className="flex justify-between  gap-6">
          <BudgetAllocation
            spendingAmount={spendingAmount}
            spendingPercent={spendingPercent}
          />

          <LogSpendingForm />
        </section>
      </section>
    </main>
  );
};

export default Dashboard;
