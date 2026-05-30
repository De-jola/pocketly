import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import BudgetAllocation from "../components/BudgetAllocation";
import Button from "../components/Button";
import Card from "../components/Card";
import { FaShare, FaPlus } from "react-icons/fa6";

const Dashboard = () => {
  const [income, setIncome] = useState(0);
  const [savingsPercent, setSavingsPercent] = useState(10); // Default to 10%
  const [spendingPercent, setSpendingPercent] = useState(40);
  const [bank, setBank] = useState("Kuda Bank");
  const [accountNumber] = useState("0123456789");

  const savingsAmount = (income * savingsPercent) / 100;
  const spendingAmount = (income * spendingPercent) / 100;
  const remainingAmount = income - (savingsAmount + spendingAmount);
  const percentRemaining = (remainingAmount / income) * 100;
  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  return (
    <main className="flex">
      <section className="p-6 w-1/5">
        <Sidebar />
      </section>
      <section className="px-6 py-4 w-full bg-background-secondary">
        <nav className="flex items-center justify-between mb-6">
          <div>
            <h1>Dashboard</h1>
            <p>
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
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
        <BudgetAllocation spendingAmount={spendingAmount} spendingPercent={spendingPercent} />
        {/* <IncomeForm
          setIncome={setIncome}
          setSavingsPercent={setSavingsPercent}
          income={income}
          savingsAmount={savingsAmount}
          savingsPercent={savingsPercent}
          spendingAmount={spendingAmount}
          setSpendingPercent={setSpendingPercent}
          spendingPercent={spendingPercent}
        /> */}
      </section>
    </main>
  );
};

export default Dashboard;
