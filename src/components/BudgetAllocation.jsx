import SectionHeader from "./SectionHeader";
import { useState } from "react";
import CategoryCard from "./CategoryCard";

const BudgetAllocation = ({ spendingAmount, spendingPercent }) => {
  const [foodPercent, setFoodPercent] = useState(20);
  const [dataPercent, setDataPercent] = useState(20);
  const [subscriptionPercent, setSubscriptionPercent] = useState(20);
  const [miscellaneousPercent, setMiscellaneousPercent] = useState(20);
  const [transportPercent, setTransportPercent] = useState(20);
  const foodAmount = (spendingAmount * foodPercent) / 100;
  const dataAmount = (spendingAmount * dataPercent) / 100;
  const subscriptionAmount = (spendingAmount * subscriptionPercent) / 100;
  const miscellaneousAmount = (spendingAmount * miscellaneousPercent) / 100;
  const transportAmount = (spendingAmount * transportPercent) / 100;

  const categories = [
    {
      id: 1,
      name: "Food",
      amount: foodAmount,
    },
    {
      id: 2,
      name: "Data",
      amount: dataAmount,
    },
    {
      id: 3,
      name: "Subscription",
      amount: subscriptionAmount,
    },
    {
      id: 4,
      name: "Miscellaneous",
      amount: miscellaneousAmount,
    },
    { id: 5, name: "Transport", amount: transportAmount },
  ];

  return (
    <main>
      <SectionHeader title="Budget Allocation" buttonText="AI Split" />
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          name={category.name}
          amount={category.amount}
        />
      ))}
    </main>
  );
};
export default BudgetAllocation;
