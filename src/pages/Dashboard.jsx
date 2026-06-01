import Sidebar from "../components/Sidebar";
import { useBudget } from "../context/BudgetContext";
import DashBoardCards from "../components/DashboardCards";
import ExpenseCard from "../components/ExpenseCard";
import CategoryBudget from "../components/CategoryBudget";
import RecentTransactions from "../components/RecentTransactions";

const Dashboard = () => {
  const {
    income,
    spending,
    spendingAmount,
    savings,
    savingsAmount,
    remainder,
    remainderAmount,
  } = useBudget();
  return (
    <main className="flex bg-[#FAF8FF]">
      <Sidebar />
      <section className="p-10 w-full min-h-screen pl-75">
        <div className=" flex items-start gap-4 justify-between mb-10">
          <DashBoardCards title="Total Income" amount={income} />
          <DashBoardCards
            title={`Savings (${savings}%)`}
            amount={savingsAmount}
          />
          <DashBoardCards
            title={`Spending (${spending}%)`}
            amount={spendingAmount}
          />
          <DashBoardCards
            title={`Unallocated(${remainder}%)`}
            amount={remainderAmount}
          />
        </div>
        <section className="flex items-start gap-6">
          <ExpenseCard />
          <aside className="w-1/2 flex flex-col gap-6">
            <CategoryBudget />
            <RecentTransactions />
          </aside>
        </section>
      </section>
    </main>
  );
};
export default Dashboard;
